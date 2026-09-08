const express = require("express");

const client = require("prom-client");

const os = require("os");


const app = express();

const PORT = process.env.PORT || 3000;


// Create one Prometheus registry

const register = new client.Registry();


// Add a standard label to every metric in this registry

register.setDefaultLabels({

    application: "nodejs_monitoring_project"

});


// Collect default Node.js runtime metrics in the same registry

client.collectDefaultMetrics({

    register: register,

    prefix: "nodejs_app_"

});


// Custom counter for completed HTTP requests

const httpRequestCounter = new client.Counter({

    name: "nodejs_app_http_requests_total",

    help: "Total number of HTTP requests received",

    labelNames: ["method", "route", "status_code"],

    registers: [register]

});


// Custom histogram for HTTP request duration

const httpRequestDuration = new client.Histogram({

    name: "nodejs_app_http_request_duration_seconds",

    help: "Duration of HTTP requests in seconds",

    labelNames: ["method", "route", "status_code"],

    buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],

    registers: [register]

});

const memoryLeak = [];

app.get("/stress-memory", (req, res) => {
    memoryLeak.push(new Array(100000).fill("memory"));
    res.send(`Memory blocks: ${memoryLeak.length}`);
});


// Middleware for monitoring HTTP requests

app.use((req, res, next) => {

    const endTimer = httpRequestDuration.startTimer();


    res.on("finish", () => {

        const route = req.route?.path || req.path || "unknown";


        const labels = {

            method: req.method,

            route: route,

            status_code: res.statusCode.toString()

        };


        httpRequestCounter.inc(labels);

        endTimer(labels);

    });


    next();

});


// Home endpoint

app.get("/", (req, res) => {

    res.status(200).send("Node Monitoring Project Running");

});


// Health endpoint

app.get("/health", (req, res) => {

    res.status(200).json({

        status: "UP",

        timestamp: new Date().toISOString()

    });

});


// Uptime endpoint

app.get("/uptime", (req, res) => {

    const uptimeSeconds = process.uptime();


    res.status(200).json({

        status: "UP",

        uptime_seconds: Number(uptimeSeconds.toFixed(2)),

        uptime_minutes: Number((uptimeSeconds / 60).toFixed(2)),

        hostname: os.hostname(),

        timestamp: new Date().toISOString()

    });

});


// Prometheus metrics endpoint

app.get("/metrics", async (req, res) => {

    try {

        res.set("Content-Type", register.contentType);

        res.end(await register.metrics());

    } catch (error) {

        console.error("Metrics collection failed:", error);


        res.status(500).json({

            status: "DOWN",

            message: "Unable to collect metrics"

        });

    }

});

app.get("/slow", async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    res.send("Delayed response");
});


// Start the server

app.listen(PORT, "0.0.0.0", () => {

    console.log(`Server running on port ${PORT}`);

    console.log(`Home: http://localhost:${PORT}`);

    console.log(`Health: http://localhost:${PORT}/health`);

    console.log(`Uptime: http://localhost:${PORT}/uptime`);

    console.log(`Metrics: http://localhost:${PORT}/metrics`);

});