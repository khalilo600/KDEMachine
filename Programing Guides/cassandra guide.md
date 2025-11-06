# Cassandra Guide: Comprehensive Learning Outline

This guide provides a structured overview of Apache Cassandra, a free and open-source, distributed, wide-column store, NoSQL database management system. It covers core concepts, CQL (Cassandra Query Language) fundamentals, advanced CQL features, data modeling principles, architecture, administration, and high availability/scalability features.

---

## I. Getting Started and Core Concepts

### A. What is Apache Cassandra?

Apache Cassandra is a highly scalable, distributed, NoSQL database designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure. It is a wide-column store, meaning it organizes data into rows and columns, but columns can vary from row to row within the same table.

*   **Distributed:** Data is spread across multiple nodes (servers).
*   **Decentralized:** No single point of failure; all nodes are equal.
*   **NoSQL:** Not a relational database; uses CQL (Cassandra Query Language).
*   **High Availability:** Designed to be always on, even with node failures.
*   **Scalable:** Linear scalability; add more nodes to increase capacity.

### B. Why Use Cassandra?

*   **Massive Scalability:** Handles petabytes of data and thousands of concurrent operations per second.
*   **High Availability:** Always-on architecture with automatic data replication and fault tolerance.
*   **Performance:** Fast writes and reads, especially for time-series data and large datasets.
*   **Flexible Schema:** Allows for dynamic schema changes without downtime.
*   **Cross-Datacenter Replication:** Ideal for geographically distributed applications.
*   **Open-Source:** Free to use and widely adopted by companies like Apple, Netflix, and eBay.

### C. Installation and Setup (Cassandra, cqlsh)

1.  **JDK (Java Development Kit):** Cassandra requires Java 8 or 11.
2.  **Download:** Visit the Apache Cassandra website ([cassandra.apache.org/download/](https://cassandra.apache.org/download/)) and download the latest stable version.
3.  **Installation:** Extract the downloaded archive.

    ```bash
    # Example on Linux
    tar -xzf apache-cassandra-x.x.x-bin.tar.gz
    cd apache-cassandra-x.x.x
    ```

4.  **Start Cassandra:**

    ```bash
    bin/cassandra -f # Run in foreground
    # Or bin/cassandra # Run in background
    ```

5.  **`cqlsh` (Cassandra Query Language Shell):** The command-line interface for Cassandra.

    ```bash
    bin/cqlsh # Connects to localhost:9042 by default
    ```

### D. Basic Terminology (Node, Cluster, Keyspace, Table, Row, Column)

*   **Node:** A single instance of Cassandra running on a machine.
*   **Cluster:** A collection of nodes that collectively store your data.
*   **Keyspace:** The outermost container for data in Cassandra, similar to a database in a relational system. It defines replication strategy and factor.
*   **Table (Column Family):** A collection of ordered columns identified by a primary key.
*   **Row:** A single record in a table, identified by its primary key.
*   **Column:** A key-value pair within a row.

### E. Cassandra vs. Relational Databases (CAP Theorem)

| Feature           | Cassandra (NoSQL)                               | Relational Databases (SQL)                          |
| :---------------- | :---------------------------------------------- | :-------------------------------------------------- |
| **Data Model**    | Wide-column store                               | Table-oriented (rows and columns)                   |
| **Schema**        | Flexible, schema-less (schema-on-write)         | Rigid, predefined schema (schema-on-read)           |
| **Scalability**   | Horizontal (add more nodes)                     | Vertical (more powerful server), some horizontal    |
| **Joins**         | No native joins (handled in application logic)  | Strong, explicit joins                              |
| **Transactions**  | Atomic at row level, Lightweight Transactions (LWT) | ACID transactions across multiple tables            |
| **Query Language**| CQL (Cassandra Query Language)                  | SQL (Structured Query Language)                     |
| **CAP Theorem**   | AP (Availability & Partition Tolerance)         | CA (Consistency & Availability) or CP (Consistency & Partition Tolerance) |

*   **CAP Theorem:** A distributed system can only guarantee two out of three properties: Consistency, Availability, and Partition Tolerance. Cassandra prioritizes Availability and Partition Tolerance (AP).

---

## II. CQL (Cassandra Query Language) Fundamentals

### A. Connecting to Cassandra (cqlsh)

```bash
bin/cqlsh <ip_address> <port> -u <username> -p <password>
# Example: bin/cqlsh 127.0.0.1 9042
```

### B. Creating Keyspaces (`CREATE KEYSPACE`)

A keyspace defines the replication strategy and replication factor for its tables.

```cql
CREATE KEYSPACE myapp_keyspace
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
-- SimpleStrategy for single-datacenter deployments
-- NetworkTopologyStrategy for multi-datacenter deployments

USE myapp_keyspace; -- Select the keyspace to work with
```

### C. Creating Tables (`CREATE TABLE`)

```cql
CREATE TABLE users (
    user_id UUID PRIMARY KEY, -- Partition Key
    username TEXT,
    email TEXT,
    created_at TIMESTAMP
);

CREATE TABLE user_posts (
    user_id UUID, -- Partition Key
    post_id TIMEUUID, -- Clustering Column
    title TEXT,
    content TEXT,
    posted_at TIMESTAMP,
    PRIMARY KEY ((user_id), post_id) -- Composite Primary Key
) WITH CLUSTERING ORDER BY (post_id DESC); -- Order posts by time descending
```

*   **Primary Key (Partition Key, Clustering Columns):**
    *   **Partition Key:** Determines which node(s) the data resides on. All rows with the same partition key are stored together on the same node.
    *   **Clustering Columns:** Define the order of rows within a partition.
    *   **Composite Primary Key:** `PRIMARY KEY ((partition_key1, partition_key2), clustering_column1, clustering_column2)`.

*   **Data Types (Text, UUID, Timestamp, Int, Bigint, Boolean, List, Map, Set):
    *   `TEXT`: UTF-8 encoded string.
    *   `UUID`, `TIMEUUID`: Universally Unique Identifiers.
    *   `TIMESTAMP`: Date and time.
    *   `INT`, `BIGINT`: Integer types.
    *   `BOOLEAN`: True/False.
    *   `LIST<type>`, `MAP<key_type, value_type>`, `SET<type>`: Collection types.

### D. Inserting Data (`INSERT INTO`)

```cql
INSERT INTO users (user_id, username, email, created_at)
VALUES (uuid(), 'alice', 'alice@example.com', toTimestamp(now()));

INSERT INTO user_posts (user_id, post_id, title, content, posted_at)
VALUES (a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11, now(), 'My First Post', 'Content here.', toTimestamp(now()));
```

### E. Selecting Data (`SELECT`)

```cql
-- Select all columns from the users table
SELECT * FROM users;

-- Select specific columns
SELECT username, email FROM users;
```

*   **`WHERE` Clause (Partition Key, Clustering Columns):**
    *   You must provide the full partition key in the `WHERE` clause for most queries.
    *   You can query on clustering columns if the partition key is provided.

    ```cql
    SELECT * FROM users WHERE user_id = a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11;
    SELECT * FROM user_posts WHERE user_id = a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11 AND post_id > 1678886400000000;
    ```

*   **`ORDER BY` Clause:** Can only order by clustering columns.

    ```cql
    SELECT * FROM user_posts WHERE user_id = a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11 ORDER BY posted_at DESC;
    ```

*   **`LIMIT`:** Restricts the number of rows returned.

    ```cql
    SELECT * FROM user_posts WHERE user_id = a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11 LIMIT 10;
    ```

### F. Updating Data (`UPDATE`)

```cql
UPDATE users
SET email = 'alice.smith@example.com'
WHERE user_id = a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11;
```

### G. Deleting Data (`DELETE FROM`)

```cql
DELETE FROM user_posts
WHERE user_id = a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11 AND post_id = 1678886400000000;

DELETE FROM users WHERE user_id = a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11;
```

### H. Dropping Tables (`DROP TABLE`)

```cql
DROP TABLE IF EXISTS old_users;
```

---

## III. Advanced CQL Features

### A. Secondary Indexes (`CREATE INDEX`)

Used to query on non-primary key columns. Use sparingly as they can impact write performance in large clusters.

```cql
CREATE INDEX ON users (email);
SELECT * FROM users WHERE email = 'alice@example.com';
```

### B. User-Defined Types (UDTs)

Allows you to create custom composite data types.

```cql
CREATE TYPE address (
    street TEXT,
    city TEXT,
    zip_code TEXT
);

CREATE TABLE customers (
    customer_id UUID PRIMARY KEY,
    name TEXT,
    billing_address FROZEN<address> -- FROZEN means the UDT is immutable
);
```

### C. Collections (List, Map, Set)

(See Section II.C for data types)

### D. Lightweight Transactions (IF EXISTS, IF NOT EXISTS)

Provide ACID-like guarantees for single-row operations. Use `IF EXISTS` for updates/deletes and `IF NOT EXISTS` for inserts. These are slower than normal operations.

```cql
INSERT INTO users (user_id, username, email)
VALUES (uuid(), 'bob', 'bob@example.com')
IF NOT EXISTS;

UPDATE users
SET email = 'new_bob@example.com'
WHERE user_id = a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
IF email = 'bob@example.com';
```

### E. Batch Statements (`BEGIN BATCH`, `APPLY BATCH`)

Group multiple DML (Data Manipulation Language) statements into a single request. Can be logged or unlogged.

```cql
BEGIN BATCH
    INSERT INTO users (user_id, username, email) VALUES (uuid(), 'charlie', 'charlie@example.com');
    UPDATE user_posts SET title = 'Updated Title' WHERE user_id = a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11 AND post_id = 1678886400000000;
APPLY BATCH;
```

---

## IV. Data Modeling in Cassandra

Cassandra's data model is query-driven, meaning you design your tables around the queries you need to perform, not around the relationships between entities.

### A. Understanding Cassandra's Data Model (Query-Driven)

*   **Prioritize Reads:** Optimize for fast reads by denormalizing data.
*   **Avoid Joins:** Cassandra does not support joins.
*   **Avoid Aggregations:** Aggregations are expensive; pre-aggregate data if possible.

### B. Denormalization

Data is often duplicated across multiple tables to satisfy different query patterns efficiently.

### C. Partition Key and Clustering Columns

(See Section II.C)

### D. Common Data Modeling Patterns (Time Series, Wide Rows)

*   **Time Series Data:** Use a partition key that groups data by time (e.g., `(sensor_id, date)`) and a clustering column for the exact timestamp.
*   **Wide Rows:** A single partition can contain a very large number of clustering columns.

---

## V. Architecture and Operations

### A. Distributed Nature (Ring Architecture)

Cassandra nodes form a ring, and data is distributed around this ring based on the hash of the partition key.

### B. Replication Factor and Consistency Levels

*   **Replication Factor (RF):** The number of nodes that will receive copies of each row. Defined at the keyspace level.
*   **Consistency Level (CL):** Determines how many replicas must respond to a read or write request for it to be considered successful.
    *   `ONE`: One replica must respond.
    *   `QUORUM`: A majority of replicas must respond.
    *   `ALL`: All replicas must respond.
    *   `LOCAL_QUORUM`, `EACH_QUORUM`: For multi-datacenter deployments.

### C. Gossip Protocol

Nodes communicate with each other to discover information about the cluster's state.

### D. Read and Write Paths

*   **Write Path:** Data is written to a commit log and then to a memtable (in-memory). When the memtable is full, it's flushed to an SSTable (Sorted String Table) on disk.
*   **Read Path:** Data is retrieved from memtables, row caches, and SSTables.

### E. Compaction

The process of merging SSTables to improve read performance and reclaim disk space.

### F. Hinted Handoff

If a replica node is down during a write operation, the coordinator node stores a "hint" for the down node and delivers it when the node comes back online.

---

## VI. Administration and Monitoring

### A. Configuration (`cassandra.yaml`)

The main configuration file for Cassandra.

```yaml
# Example cassandra.yaml settings
cluster_name: 'MyCassandraCluster'
num_tokens: 256
listen_address: 192.168.1.10 # IP address of the node
rpc_address: 0.0.0.0 # Listen on all interfaces for client connections
seed_provider:
    - class_name: org.apache.cassandra.locator.SimpleSeedProvider
      parameters:
          - seeds: "192.168.1.10,192.168.1.11" # Seed nodes for cluster discovery
```

### B. Node Tool (`nodetool`)

A command-line utility for managing and monitoring Cassandra clusters.

```bash
nodetool status # View cluster status
nodetool repair # Repair data inconsistencies
nodetool cfstats # View column family (table) statistics
```

### C. Monitoring Tools (Prometheus, Grafana)

Integrate with monitoring solutions to track Cassandra's performance and health.

### D. Backup and Restore (`nodetool snapshot`, `sstableloader`)

*   **`nodetool snapshot`:** Creates a snapshot of a keyspace or table.
*   **`sstableloader`:** Used to load SSTables (data files) into a cluster.

---

## VII. High Availability and Scalability

### A. Replication (Replication Factor, Strategy)

(See Section V.B)

### B. Adding/Removing Nodes

Cassandra is designed for easy horizontal scaling by adding or removing nodes without downtime.

### C. Data Centers

Cassandra supports deploying clusters across multiple data centers for disaster recovery and reduced latency for geographically dispersed users.

---

## VIII. Client Libraries

Cassandra has client libraries for many programming languages.

### A. Connecting from Python (DataStax Python Driver)

```python
from cassandra.cluster import Cluster

# Connect to Cassandra cluster
cluster = Cluster(['127.0.0.1']) # Replace with your Cassandra node IPs
session = cluster.connect('myapp_keyspace')

# Insert data
session.execute(
    """
    INSERT INTO users (user_id, username, email, created_at)
    VALUES (uuid(), 'diana', 'diana@example.com', toTimestamp(now()))
    """
)

# Select data
rows = session.execute("SELECT user_id, username, email FROM users WHERE username = 'diana' ALLOW FILTERING")
for row in rows:
    print(f"User ID: {row.user_id}, Username: {row.username}, Email: {row.email}")

cluster.shutdown()
```

### B. Connecting from Java (DataStax Java Driver)

```java
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.uuid.Uuids;

import java.net.InetSocketAddress;
import java.time.Instant;

public class CassandraExample {
    public static void main(String[] args) {
        try (CqlSession session = CqlSession.builder()
                .addContactPoint(new InetSocketAddress("127.0.0.1", 9042)) // Replace with your Cassandra node IPs
                .withKeyspace("myapp_keyspace")
                .build()) {

            // Insert data
            session.execute(
                    "INSERT INTO users (user_id, username, email, created_at) VALUES (?, ?, ?, ?)",
                    Uuids.timeBased(), "eve", "eve@example.com", Instant.now());

            // Select data
            session.execute("SELECT user_id, username, email FROM users WHERE username = 'eve' ALLOW FILTERING")
                    .forEach(row -> System.out.printf("User ID: %s, Username: %s, Email: %s%n",
                            row.getUuid("user_id"), row.getString("username"), row.getString("email")));
        }
    }
}
```
