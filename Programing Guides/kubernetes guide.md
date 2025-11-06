# Kubernetes Guide: Comprehensive Learning Outline

This guide provides a structured overview of Kubernetes, an open-source container orchestration platform. It covers core concepts, essential Kubernetes objects, `kubectl` CLI usage, networking, storage, advanced topics, security, monitoring, and deployment best practices for managing containerized applications at scale.

---

## I. Getting Started and Core Concepts

### A. What is Kubernetes?

Kubernetes (K8s) is an open-source system for automating deployment, scaling, and management of containerized applications. It groups containers that make up an application into logical units for easy management and discovery.

*   **Container Orchestration:** Automates the deployment, scaling, and operational management of application containers.
*   **Portable:** Runs on public cloud, private cloud, hybrid cloud, and on-premises.
*   **Extensible:** Highly customizable and pluggable.
*   **Self-Healing:** Automatically restarts failed containers, replaces unresponsive ones, and reschedules containers on healthy nodes.

### B. Why Use Kubernetes?

*   **Automated Deployment & Scaling:** Automates the process of deploying, scaling, and managing containerized workloads.
*   **Self-Healing Capabilities:** Improves application reliability and uptime.
*   **Resource Utilization:** Efficiently manages and allocates resources across a cluster.
*   **Service Discovery & Load Balancing:** Automatically discovers and exposes services, and distributes traffic.
*   **Rollouts & Rollbacks:** Manages application updates and reverts to previous versions if needed.
*   **Portability:** Run your applications consistently across different environments.
*   **Large Ecosystem:** Backed by Google and a massive open-source community, with extensive tools and integrations.

### C. Installation and Setup (Minikube, Docker Desktop, Cloud Providers)

1.  **Minikube:** A tool that runs a single-node Kubernetes cluster locally for development and testing.

    ```bash
    # Install Minikube (example for macOS with Homebrew)
    brew install minikube

    # Start Minikube
    minikube start
    ```

2.  **Docker Desktop:** Includes a standalone Kubernetes server for local development (enable in settings).
3.  **Cloud Providers:** Managed Kubernetes services (e.g., GKE, AKS, EKS) for production environments.

    ```bash
    # Verify kubectl installation (installed with Minikube or cloud SDKs)
    kubectl version --client
    ```

### D. Basic Terminology (Cluster, Node, Pod, Deployment, Service, Namespace)

*   **Cluster:** A set of machines (nodes) that run containerized applications managed by Kubernetes.
*   **Node:** A worker machine in Kubernetes, which can be a VM or a physical machine.
*   **Pod:** The smallest deployable unit in Kubernetes. It represents a single instance of a running process in your cluster, typically containing one or more containers.
*   **Deployment:** An object that manages a replicated set of Pods. It ensures that a specified number of Pod replicas are running at any given time.
*   **Service:** An abstract way to expose an application running on a set of Pods as a network service.
*   **Namespace:** A mechanism to divide cluster resources among multiple users or teams.

### E. Kubernetes Architecture (Control Plane, Worker Nodes)

*   **Control Plane (Master Node):** The brain of the cluster. It manages the worker nodes and the Pods in the cluster.
    *   **Kube-API Server:** Exposes the Kubernetes API.
    *   **etcd:** A distributed key-value store for all cluster data.
    *   **Kube-Scheduler:** Watches for newly created Pods and assigns them to nodes.
    *   **Kube-Controller-Manager:** Runs controller processes (e.g., Node Controller, Replication Controller).
*   **Worker Nodes:** Run the actual containerized applications.
    *   **Kubelet:** An agent that runs on each node and ensures containers are running in a Pod.
    *   **Kube-Proxy:** Maintains network rules on nodes, allowing network communication to your Pods.
    *   **Container Runtime:** Software that runs containers (e.g., Docker, containerd).

---

## II. Kubernetes Objects

Kubernetes objects are persistent entities in the Kubernetes system. They represent the state of your cluster.

### A. Pods (YAML Definition, Multi-Container Pods)

The smallest deployable unit. A Pod encapsulates application containers, storage resources, a unique network IP, and options that govern how the containers should run.

```yaml
# pod-definition.yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
  - name: myapp-container
    image: nginx:latest
    ports:
    - containerPort: 80
```

*   **Multi-Container Pods:** Pods can contain multiple containers that share the same network namespace and storage.

### B. Deployments (Managing Pods, Rolling Updates, Rollbacks)

Manages a replicated set of Pods. It describes the desired state for your application.

```yaml
# deployment-definition.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    app: myapp
spec:
  replicas: 3 # Desired number of Pod replicas
  selector:
    matchLabels:
      app: myapp
  template: # Pod template
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp-container
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

*   **Rolling Updates:** Deployments allow you to update your application with zero downtime.
*   **Rollbacks:** Easily revert to a previous version of your application.

### C. Services (Exposing Applications, ClusterIP, NodePort, LoadBalancer)

An abstract way to expose an application running on a set of Pods as a network service.

```yaml
# service-definition.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp # Selects Pods with this label
  ports:
    - protocol: TCP
      port: 80 # Service port
      targetPort: 80 # Container port
  type: LoadBalancer # Exposes the service externally using a cloud provider's load balancer
  # type: NodePort # Exposes the service on each Node's IP at a static port
  # type: ClusterIP # Default, exposes the service on an internal IP
```

### D. Namespaces (Resource Isolation)

Provide a mechanism for isolating groups of resources within a single cluster.

```yaml
# namespace-definition.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: development
```

### E. ConfigMaps and Secrets (Configuration Management)

*   **ConfigMaps:** Store non-confidential data in key-value pairs.
*   **Secrets:** Store sensitive data (passwords, API keys) securely.

```yaml
# configmap-definition.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config
data:
  database_url: "jdbc:mysql://mysql-service:3306/mydb"
  app_mode: "production"
```

### F. Volumes (Persistent Storage)

A directory accessible to the containers in a Pod.

---

## III. `kubectl` CLI

The command-line tool for running commands against Kubernetes clusters.

### A. Basic Commands (`kubectl get`, `describe`, `apply`, `delete`)

*   `kubectl get <resource_type>`: Lists resources (e.g., `kubectl get pods`, `kubectl get deployments`).
*   `kubectl describe <resource_type> <resource_name>`: Shows detailed information about a resource.
*   `kubectl apply -f <file.yaml>`: Applies a configuration defined in a YAML file.
*   `kubectl delete -f <file.yaml>`: Deletes resources defined in a YAML file.

### B. Deploying Applications (`kubectl apply -f`)

```bash
kubectl apply -f deployment-definition.yaml
kubectl apply -f service-definition.yaml
```

### C. Managing Deployments (`kubectl rollout`)

*   `kubectl rollout status deployment/myapp-deployment`: Check status of a rollout.
*   `kubectl rollout history deployment/myapp-deployment`: View rollout history.
*   `kubectl rollout undo deployment/myapp-deployment`: Rollback to a previous revision.

### D. Viewing Logs (`kubectl logs`)

```bash
kubectl logs <pod_name>
kubectl logs -f <pod_name> # Follow logs
```

### E. Executing Commands in Pods (`kubectl exec`)

```bash
kubectl exec -it <pod_name> -- bash # Open a shell in a pod
```

---

## IV. Networking

### A. Pod Networking

Each Pod gets its own IP address, and all containers within a Pod share the same network namespace.

### B. Service Networking

Services provide stable IP addresses and DNS names for a set of Pods.

### C. Ingress (External Access)

Manages external access to services in a cluster, typically HTTP/HTTPS. Ingress provides load balancing, SSL termination, and name-based virtual hosting.

```yaml
# ingress-definition.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80
```

### D. Network Policies

Specify how groups of Pods are allowed to communicate with each other and other network endpoints.

---

## V. Storage

### A. Persistent Volumes (PV)

A piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using Storage Classes.

### B. Persistent Volume Claims (PVC)

A request for storage by a user. It consumes PV resources.

```yaml
# pvc-definition.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myapp-pvc
spec:
  accessModes:
    - ReadWriteOnce # Can be mounted as read-write by a single node
  resources:
    requests:
      storage: 1Gi
```

### C. Storage Classes

Provide a way for administrators to describe the "classes" of storage they offer.

---

## VI. Advanced Topics

### A. StatefulSets (Stateful Applications)

Used for stateful applications (e.g., databases) that require stable, unique network identifiers, stable persistent storage, and ordered, graceful deployment and scaling.

### B. DaemonSets (Node-Specific Pods)

Ensures that all (or some) nodes run a copy of a Pod. Useful for cluster-level operations like logging agents or monitoring agents.

### C. Jobs and CronJobs (Batch Processing)

*   **Jobs:** Create one or more Pods and ensure that a specified number of them successfully terminate.
*   **CronJobs:** Create Jobs on a repeating schedule.

### D. Horizontal Pod Autoscaler (HPA)

Automatically scales the number of Pod replicas in a Deployment or StatefulSet based on observed CPU utilization or other select metrics.

### E. Vertical Pod Autoscaler (VPA)

Automatically adjusts the CPU and memory requests and limits for containers in a Pod.

### F. Helm (Package Manager for Kubernetes)

Helps you define, install, and upgrade even the most complex Kubernetes applications.

### G. Custom Resource Definitions (CRDs)

Extend Kubernetes API with your own custom resources.

---

## VII. Security

### A. RBAC (Role-Based Access Control)

Manages who can do what in your Kubernetes cluster.

*   **Roles:** Define permissions within a namespace.
*   **ClusterRoles:** Define permissions across the entire cluster.
*   **RoleBindings:** Grant permissions defined in a Role to a user or group within a namespace.
*   **ClusterRoleBindings:** Grant permissions defined in a ClusterRole to a user or group across the entire cluster.

### B. Pod Security Policies (PSP)

Control security-sensitive aspects of the Pod specification. (Deprecated in Kubernetes 1.25, replaced by Pod Security Admission).

### C. Network Policies

(See Section IV.D)

### D. Secrets Management

(See Section II.E)

---

## VIII. Monitoring and Logging

### A. Prometheus and Grafana

*   **Prometheus:** An open-source monitoring system with a time-series database.
*   **Grafana:** An open-source platform for monitoring and observability, often used with Prometheus.

### B. ELK Stack (Elasticsearch, Logstash, Kibana)

*   **Elasticsearch:** A distributed search and analytics engine.
*   **Logstash:** A server-side data processing pipeline that ingests data from multiple sources.
*   **Kibana:** A data visualization dashboard for Elasticsearch.

### C. Kubernetes Dashboard

A web-based Kubernetes user interface.

---

## IX. Deployment and Operations

### A. CI/CD with Kubernetes

Integrate Kubernetes into your Continuous Integration/Continuous Deployment pipelines using tools like Jenkins, GitLab CI, Argo CD, or Flux CD.

### B. Rolling Updates and Rollbacks

(See Section II.B)

### C. Health Checks (Liveness, Readiness Probes)

*   **Liveness Probes:** Determine when to restart a container.
*   **Readiness Probes:** Determine when a container is ready to serve traffic.

```yaml
# In Pod definition
spec:
  containers:
  - name: myapp-container
    image: myapp:latest
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 3
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 3
```

### D. Resource Limits and Requests

Define CPU and memory `requests` (guaranteed resources) and `limits` (maximum resources) for containers.

```yaml
# In Pod definition
spec:
  containers:
  - name: myapp-container
    image: myapp:latest
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m" # 0.25 CPU core
      limits:
        memory: "128Mi"
        cpu: "500m" # 0.5 CPU core
```

### E. Troubleshooting

Use `kubectl describe`, `kubectl logs`, `kubectl exec`, and `kubectl events` for troubleshooting.
