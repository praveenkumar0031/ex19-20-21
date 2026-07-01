# 🚀 Amazon EKS Production Lab Series

A hands-on Kubernetes learning project built on **Amazon EKS** that covers deploying applications using **Helm**, exposing them through an **AWS Application Load Balancer (ALB)**, and implementing **Horizontal Pod Autoscaling (HPA)**.

This repository documents the complete setup process, configuration, and concepts learned while building a production-style Kubernetes environment.

---

# 📌 Project Overview

This lab demonstrates how to:

- Provision an Amazon EKS cluster
- Deploy applications using Helm
- Use ConfigMaps and Secrets
- Expose applications through AWS ALB Ingress Controller
- Configure Horizontal Pod Autoscaler (HPA)
- Generate load using k6
- Observe Kubernetes scaling decisions

---

# 🛠 Tech Stack

- Amazon EKS
- Kubernetes
- Helm
- AWS Load Balancer Controller
- AWS IAM Roles for Service Accounts (IRSA)
- Application Load Balancer (ALB)
- Metrics Server
- Horizontal Pod Autoscaler
- k6 Load Testing
- PHP Apache Container
- ConfigMap
- Secret
- Ingress

---

# 📂 Repository Structure

```
.
├── aws
│   ├── alb-controller
│   └── helm-values
│
├── helm
│   └── webapp
│       ├── Chart.yaml
│       ├── values.yaml
│       ├── values-dev.yaml
│       └── templates
│           ├── deployment.yaml
│           ├── service.yaml
│           ├── ingress.yaml
│           ├── configmap.yaml
│           ├── secret.yaml
│           ├── hpa.yaml
│           ├── index-configmap.yaml
│           └── _helpers.tpl
```

---

# Exercise 19 – Helm Basics

## Objectives

- Create a Helm chart
- Learn Helm templating
- Deploy Kubernetes resources using Helm

## Resources Created

- Deployment
- Service
- ConfigMap
- Secret

## Concepts Learned

- Helm Chart structure
- values.yaml
- Helm template functions
- Variables
- Named templates
- Helper templates

---

# Exercise 20 – Helm Advanced Templates

## Objectives

- Environment specific deployments
- Template loops
- Conditional rendering

## Implemented

- values-dev.yaml
- range
- if conditions
- ConfigMap templating
- Secret templating

Example:

```yaml
{{- range .Values.ingress.hosts }}
```

---

# Exercise 21 – AWS Load Balancer Controller

## Objectives

Expose Kubernetes application using AWS Application Load Balancer.

## Completed

- Enabled IAM OIDC Provider
- Created IAM Policy
- Created IAM Service Account
- Installed AWS Load Balancer Controller
- Installed through Helm
- Created ALB Ingress

---

## Ingress Configuration

Features:

- Internet Facing ALB
- IP Target Type
- Health Checks
- Multiple Routes

Routes:

```
/
```

```
/api
```

```
/admin
```

```
/dashboard
```

---

# Application

Initially deployed:

```
php:8.2-apache
```

Issue:

```
403 Forbidden
```

Reason:

Apache document root was empty.

---

## Fix

Created ConfigMap

Mounted

```
/var/www/html/index.php
```

using

```
volumeMounts
```

and

```
ConfigMap
```

Application became accessible through ALB.

---

# Exercise 22 – Horizontal Pod Autoscaler

## Installed

Metrics Server

Verified

```
kubectl top pods
```

Created

Horizontal Pod Autoscaler

Configuration

```
Min Replicas : 2
Max Replicas : 5
Target CPU   : 50%
```

Verified

```
kubectl get hpa
```

---

# Load Testing

Tool Used

```
k6
```

Generated

- 100 Virtual Users
- Thousands of HTTP Requests

Observed

```
HTTP Success Rate : 100%
```

CPU Utilization

```
35%
40%
39%
```

Since CPU never crossed

```
50%
```

HPA correctly kept

```
2 Replicas
```

---

# AWS Components Used

- Amazon EKS
- EC2 Worker Nodes
- IAM
- IAM Policy
- IAM Role
- IAM Service Account
- OIDC Provider
- AWS Load Balancer Controller
- Application Load Balancer
- Security Groups

---

# Kubernetes Components

- Namespace
- Deployment
- ReplicaSet
- Pod
- Service
- Ingress
- ConfigMap
- Secret
- Metrics Server
- Horizontal Pod Autoscaler

---

# Helm Concepts Learned

- Chart.yaml
- values.yaml
- Multiple values files
- Helpers
- Variables
- include
- range
- if
- toYaml
- nindent
- Template rendering

---

# Commands Frequently Used

## Deploy

```bash
helm upgrade --install demo-webapp . \
-f values.yaml \
-f values-dev.yaml
```

---

## Render Templates

```bash
helm template demo-webapp .
```

---

## Validate Chart

```bash
helm lint .
```

---

## View Pods

```bash
kubectl get pods
```

---

## View HPA

```bash
kubectl get hpa -w
```

---

## View Metrics

```bash
kubectl top pods
```

---

## View Deployment

```bash
kubectl describe deployment demo-webapp-webapp
```

---

## View Ingress

```bash
kubectl get ingress
```

---

## Generate Load

```bash
k6 run load-test.js
```

---

# Challenges Faced

### Metrics Server

Issue

```
MissingEndpoints
```

Solution

Corrected Service selector mismatch.

---

### Helm

Issue

```
nil pointer evaluating interface
```

Solution

Added missing values inside

```
values.yaml
```

---

### Apache

Issue

```
403 Forbidden
```

Solution

Mounted

```
index.php
```

through ConfigMap.

---

### HPA

Issue

Pods were not scaling.

Reason

Application CPU utilization remained below target.

This demonstrated that HPA scales based on resource utilization rather than request count.

---

# Key Learnings

- Helm greatly simplifies Kubernetes deployments.
- ConfigMaps and Secrets separate configuration from application code.
- AWS Load Balancer Controller automatically provisions an ALB.
- Ingress manages external traffic routing.
- HPA scales based on metrics, not HTTP request count.
- Metrics Server is required for HPA.
- k6 is useful for Kubernetes load testing.
- Resource requests directly influence HPA calculations.

---

# Future Enhancements

- Cluster Autoscaler
- Prometheus
- Grafana
- Loki
- Promtail
- External Secrets Operator
- AWS Secrets Manager
- ArgoCD
- GitOps
- Terraform
- CI/CD Pipeline
- Production Monitoring
- Logging Stack

---

# Skills Demonstrated

- Kubernetes Administration
- Amazon EKS
- Helm Packaging
- Kubernetes Networking
- Kubernetes Autoscaling
- AWS IAM
- AWS ALB
- Infrastructure Debugging
- Load Testing
- YAML Templating
- DevOps Best Practices

---

# Outcome

Successfully built a production-style Kubernetes environment capable of:

- Deploying applications using Helm
- Managing configuration with ConfigMaps and Secrets
- Exposing applications through AWS ALB
- Monitoring resource utilization
- Performing load testing
- Implementing Horizontal Pod Autoscaling

This repository serves as a practical DevOps learning project demonstrating modern Kubernetes deployment patterns on Amazon EKS.