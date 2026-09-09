NodeJS Monitoring & Observability Project

Overview
This project demonstrates a complete monitoring and observability solution for a Node.js application using modern DevOps practices.
The application exposes runtime metrics that are collected by Prometheus and visualized through Grafana dashboards. The entire environment is containerized using Docker and orchestrated using Docker Compose.

Objectives
The project was designed to demonstrate:
Application health monitoring
Runtime observability
Infrastructure monitoring
Containerization
Monitoring dashboard creation
Performance testing
DevOps best practices

Architecture
┌──────────────────┐
│      User        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    Node.js API   │
│                  │
│ /                │
│ /health          │
│ /uptime          │
│ /metrics         │
│ /slow            │
│ /stress-memory   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Prometheus     │
│  Metrics Scrape  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     Grafana      │
│   Dashboards     │
└──────────────────┘

## Azure Deployment

This application is deployed to Azure App Service for Linux using a Docker container stored in Azure Container Registry.

Azure Services Used:
- Azure App Service
- Azure Container Registry
- Azure Monitor
- Application Insights

Features
Application Monitoring
Health endpoint
Uptime endpoint
Request metrics
Request duration tracking
Memory monitoring
CPU monitoring
Event loop monitoring
Observability
Prometheus metrics export
Real-time Grafana dashboards
Latency monitoring
Throughput monitoring
Availability tracking
Containerization
Docker image
Docker Compose deployment
Multi-container architecture
Technology Stack
Node.js
Express.js
Prometheus
Grafana
Docker
Docker Compose

Project Structure
nodejs-monitoring-project
│
├── app.js
├── Dockerfile
├── docker-compose.yml
├── prometheus.yml
├── package.json
├── package-lock.json
├── grafana-dashboard.json
├── .gitignore
└── README.md

API Endpoints
Home
GET /
Returns application status.

Health Check
GET /health
Used for service availability monitoring.

Uptime
GET /uptime
Returns service uptime information.

Metrics
GET /metrics
Prometheus scrape endpoint.

Slow Endpoint
GET /slow
Simulates a slow application response for latency monitoring.

Memory Stress Endpoint
GET /stress-memory
Simulates increasing memory usage.

Running Locally
Install dependencies:
npm install
Start application:
node app.js
Application:
http://localhost:3000
Running with Docker
Build image:
docker build -t node-monitor .
Run container:
docker run -d --name node-monitor-app -p 3000:3000 node-monitor
Running with Docker Compose
Start services:
docker compose up -d
Stop services:
docker compose down
Grafana Dashboard
The Grafana dashboard includes:
Service Availability
Application Uptime
CPU Usage
Memory Usage
Request Throughput
HTTP Latency
Performance Testing
Generate traffic:
autocannon http://localhost:3000
Observe application behavior in Grafana dashboards.
Future Enhancements
GitHub Actions CI/CD
Azure App Service Deployment
Azure Monitor Integration
Application Insights Integration
Kubernetes Deployment
Alerting Rules
Terraform Infrastructure Deployment
Skills Demonstrated
DevOps Engineering
Application Monitoring
Observability
Docker
Docker Compose
Node.js
Prometheus
Grafana
Microservice Monitoring
SRE Fundamentals


Author
Anthonia Ozemhoya
Azure Support Engineer | DevOps Engineer | Cloud Engineer
