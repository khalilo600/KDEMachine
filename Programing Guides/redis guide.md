# Redis Guide: Comprehensive Learning Outline

This guide provides a structured overview of Redis, an open-source, in-memory data structure store. It covers core concepts, various Redis data structures, essential commands, persistence options, high availability and scalability features, administration, and common use cases.

---

## I. Getting Started and Core Concepts

### A. What is Redis?

Redis (Remote Dictionary Server) is an open-source, in-memory data structure store, used as a database, cache, and message broker. It supports various data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, HyperLogLogs, and geospatial indexes with radius queries.

*   **In-Memory:** Primarily stores data in RAM for high performance.
*   **Key-Value Store:** Data is stored as key-value pairs.
*   **Data Structures:** Supports a rich set of data structures beyond simple key-value.
*   **Persistence:** Can optionally persist data to disk.
*   **Open-Source:** Free to use and widely adopted.

### B. Why Use Redis?

*   **Extremely Fast:** In-memory nature and optimized C code provide sub-millisecond response times.
*   **Versatile Data Structures:** Offers more than just simple key-value storage, enabling complex use cases.
*   **High Availability:** Supports replication and automatic failover with Redis Sentinel.
*   **Scalability:** Can scale horizontally with Redis Cluster.
*   **Simplicity:** Simple API and easy to integrate with applications.
*   **Wide Adoption:** Used by many large companies for caching, session management, real-time analytics, etc.

### C. Installation and Setup

1.  **Download:** Visit the official Redis website ([redis.io/download/](https://redis.io/download/)) or use your system's package manager.

    ```bash
    # On Ubuntu/Debian
    sudo apt update
    sudo apt install redis-server

    # On macOS (using Homebrew)
    brew install redis

    # On Windows (unofficial port or Docker recommended)
    # Docker: docker run --name my-redis -p 6379:6379 -d redis
    ```

2.  **Start Server:**

    ```bash
    # If installed via package manager, it usually starts automatically
    sudo systemctl start redis-server # Linux

    # Or manually
    redis-server
    ```

### D. Basic Terminology (Key-Value Store, In-Memory, Persistence)

*   **Key-Value Store:** The fundamental way Redis stores data. Each piece of data has a unique key.
*   **In-Memory:** Data is primarily stored in the computer's RAM, which is why Redis is so fast.
*   **Persistence:** The ability to save data to disk so it's not lost when the Redis server restarts. Redis offers RDB (snapshots) and AOF (Append Only File) persistence options.

### E. Connecting to Redis (redis-cli)

`redis-cli` is the command-line interface for Redis.

```bash
# Connect to local Redis server (default port 6379)
redis-cli

# Ping the server
PING # Output: PONG

# Set a key-value pair
SET mykey "Hello Redis"

# Get the value of a key
GET mykey # Output: "Hello Redis"

# Quit redis-cli
QUIT
```

---

## II. Redis Data Structures

Redis is often called a data structure server because it doesn't just store strings, but also supports various complex data types.

### A. Strings (`SET`, `GET`, `INCR`, `DECR`, `APPEND`)

The most basic type. Can hold any kind of data (binary safe).

*   `SET key value`: Sets the string value of a key.
*   `GET key`: Gets the string value of a key.
*   `INCR key`: Increments the integer value of a key by one.
*   `DECR key`: Decrements the integer value of a key by one.
*   `APPEND key value`: Appends a value to a key.

    ```redis
    SET user:1:name "Alice"
    GET user:1:name # "Alice"
    INCR page_views # 1
    INCR page_views # 2
    APPEND mykey " World" # "Hello World"
    ```

### B. Hashes (`HSET`, `HGET`, `HGETALL`, `HDEL`)

Maps string fields to string values. Ideal for representing objects.

*   `HSET key field value [field value ...]`: Sets the string value of a hash field.
*   `HGET key field`: Gets the value of a hash field.
*   `HGETALL key`: Gets all fields and values in a hash.
*   `HDEL key field [field ...]`: Deletes one or more hash fields.

    ```redis
    HSET user:1 name "Alice" email "alice@example.com" age 30
    HGET user:1 name # "Alice"
    HGETALL user:1 # 1) "name" 2) "Alice" 3) "email" 4) "alice@example.com" 5) "age" 6) "30"
    ```

### C. Lists (`LPUSH`, `RPUSH`, `LPOP`, `RPOP`, `LRANGE`)

Ordered collections of strings. Elements are added to the head (left) or tail (right).

*   `LPUSH key value [value ...]`: Inserts all specified values at the head of the list.
*   `RPUSH key value [value ...]`: Inserts all specified values at the tail of the list.
*   `LPOP key`: Removes and returns the first element of the list.
*   `RPOP key`: Removes and returns the last element of the list.
*   `LRANGE key start stop`: Gets a range of elements from a list.

    ```redis
    RPUSH tasks "task1" "task2" "task3"
    LRANGE tasks 0 -1 # 1) "task1" 2) "task2" 3) "task3"
    LPOP tasks # "task1"
    ```

### D. Sets (`SADD`, `SMEMBERS`, `SREM`, `SINTER`, `SUNION`)

Unordered collections of unique strings.

*   `SADD key member [member ...]`: Adds one or more members to a set.
*   `SMEMBERS key`: Gets all the members in a set.
*   `SREM key member [member ...]`: Removes one or more members from a set.
*   `SINTER key [key ...]`: Returns the members of the set resulting from the intersection of all the given sets.
*   `SUNION key [key ...]`: Returns the members of the set resulting from the union of all the given sets.

    ```redis
    SADD users:online "Alice" "Bob" "Charlie"
    SMEMBERS users:online # 1) "Alice" 2) "Bob" 3) "Charlie"
    SADD users:online "Bob" # (No effect, Bob is already in set)
    ```

### E. Sorted Sets (`ZADD`, `ZRANGE`, `ZSCORE`, `ZREM`)

Collections of unique strings, where each member is associated with a score. Members are ordered by score.

*   `ZADD key score member [score member ...]`: Adds one or more members to a sorted set, or updates its score if it already exists.
*   `ZRANGE key start stop [WITHSCORES]`: Returns a range of members in a sorted set, by index.
*   `ZSCORE key member`: Gets the score of a member in a sorted set.
*   `ZREM key member [member ...]`: Removes one or more members from a sorted set.

    ```redis
    ZADD leaderboard 100 "Alice" 80 "Bob" 120 "Charlie"
    ZRANGE leaderboard 0 -1 WITHSCORES # 1) "Bob" 2) "80" 3) "Alice" 4) "100" 5) "Charlie" 6) "120"
    ZSCORE leaderboard "Alice" # "100"
    ```

### F. Bitmaps (`SETBIT`, `GETBIT`, `BITCOUNT`)

Treats a string as a sequence of bits.

*   `SETBIT key offset value`: Sets or clears the bit at offset in the string value stored at key.
*   `GETBIT key offset`: Returns the bit value at offset in the string value stored at key.
*   `BITCOUNT key [start end]`: Counts the number of set bits (1s) in a string.

    ```redis
    SETBIT user:1:active_days 0 1 # User 1 active on day 0
    SETBIT user:1:active_days 2 1 # User 1 active on day 2
    GETBIT user:1:active_days 0 # 1
    BITCOUNT user:1:active_days # 2
    ```

### G. HyperLogLogs (`PFADD`, `PFCOUNT`)

Probabilistic data structure used to estimate the cardinality (number of unique elements) of a set.

*   `PFADD key element [element ...]`: Adds all the element arguments to the HyperLogLog data structure.
*   `PFCOUNT key [key ...]`: Returns the approximated cardinality of the set(s) observed by the HyperLogLog(s) at key(s).

    ```redis
    PFADD unique_visitors "user1" "user2" "user1"
    PFCOUNT unique_visitors # 2 (approximate)
    ```

---

## III. Redis Commands and Operations

### A. Key Management (`KEYS`, `EXPIRE`, `TTL`, `DEL`, `TYPE`)

*   `KEYS pattern`: Finds all keys matching the given pattern (use with caution in production).
*   `EXPIRE key seconds`: Sets a key's time to live in seconds.
*   `TTL key`: Gets the time to live for a key.
*   `DEL key [key ...]`: Deletes one or more keys.
*   `TYPE key`: Returns the type of value stored at key.

    ```redis
    SET mykey "value" EX 60 # Set with expiration of 60 seconds
    TTL mykey # 55 (example)
    DEL mykey
    TYPE mykey # none
    ```

### B. Transactions (`MULTI`, `EXEC`, `DISCARD`)

Execute a group of commands as a single, atomic operation.

*   `MULTI`: Starts a transaction.
*   `EXEC`: Executes all commands in the transaction.
*   `DISCARD`: Flushes all previously queued commands in a transaction.

    ```redis
    MULTI
    INCR user:1:balance
    DECR user:2:balance
    EXEC # Executes both INCR and DECR atomically
    ```

### C. Publish/Subscribe (`PUBLISH`, `SUBSCRIBE`, `PSUBSCRIBE`)

Allows clients to subscribe to channels and receive messages published to those channels.

*   `PUBLISH channel message`: Publishes a message to a channel.
*   `SUBSCRIBE channel [channel ...]`: Subscribes the client to the specified channels.
*   `PSUBSCRIBE pattern [pattern ...]`: Subscribes the client to the given patterns.

    ```redis
    # Client 1
    SUBSCRIBE chat_room

    # Client 2
    PUBLISH chat_room "Hello everyone!"
    ```

### D. Scripting (Lua, `EVAL`)

Execute Lua scripts directly on the Redis server, enabling complex atomic operations.

```redis
EVAL "return redis.call('set', KEYS[1], ARGV[1])" 1 mykey "myvalue"
```

### E. Pipelining

Send multiple commands to the server without waiting for the replies to each command, improving performance.

```redis
# In redis-cli
(printf "SET key1 value1\r\nSET key2 value2\r\nGET key1\r\n"; sleep 1) | redis-cli --pipe
```

---

## IV. Persistence

Redis can persist data to disk to ensure data is not lost on server restart.

### A. RDB (Redis Database) Snapshots

*   Point-in-time snapshots of your dataset.
*   Very compact single-file point-in-time representation of your Redis data.
*   Good for backups and disaster recovery.
*   Can lead to data loss if Redis crashes between snapshots.

### B. AOF (Append Only File)

*   Logs every write operation received by the server.
*   More durable than RDB as it logs every change.
*   Can be larger than RDB files.
*   Offers different fsync policies (e.g., `always`, `everysec`, `no`).

### C. Choosing a Persistence Strategy

*   **No persistence:** For caching where data loss is acceptable.
*   **RDB only:** Good for disaster recovery, but some data loss is possible.
*   **AOF only:** More durable, but potentially larger files and slower recovery.
*   **RDB + AOF:** The most robust option, combining the benefits of both.

---

## V. High Availability and Scalability

### A. Replication (Master-Replica)

Allows replica Redis instances to be exact copies of master instances.

*   **Master:** Handles all write operations.
*   **Replicas:** Receive a copy of the data from the master and can serve read requests.
*   Provides data redundancy and read scalability.

    ```redis
    # On replica instance's redis.conf or via command
    REPLICAOF <master_ip> <master_port>
    ```

### B. Sentinel (Automatic Failover)

Redis Sentinel provides high availability for Redis. It monitors master and replica instances, and if a master fails, Sentinel can promote a replica to master and reconfigure other replicas.

### C. Cluster (Sharding)

Redis Cluster provides a way to run a Redis installation where data is automatically sharded across multiple Redis nodes.

*   **Sharding:** Distributes data across multiple nodes.
*   **High Availability:** Each shard is a master-replica setup.
*   Provides horizontal scalability for both reads and writes.

---

## VI. Administration and Monitoring

### A. Configuration (`redis.conf`)

The main configuration file for Redis.

```
# Example redis.conf settings
port 6379
daemonize yes
logfile "/var/log/redis/redis-server.log"
dbfilename dump.rdb
dir "/var/lib/redis"
```

### B. Monitoring (`INFO`, `MONITOR`, `CLIENT LIST`)

*   `INFO`: Provides information and statistics about the Redis server.
*   `MONITOR`: Streams all commands processed by the Redis server.
*   `CLIENT LIST`: Returns information about all connected clients.

### C. Benchmarking (`redis-benchmark`)

A utility to check the performance of your Redis server.

```bash
redis-benchmark -t set,get -n 100000 -q # 100,000 SET/GET requests
```

---

## VII. Best Practices and Use Cases

### A. Caching

One of the most common uses. Store frequently accessed data in Redis to reduce database load and improve response times.

### B. Session Management

Store user session data in Redis for scalable and highly available web applications.

### C. Real-time Analytics

Use Redis data structures (e.g., sorted sets, HyperLogLogs) for real-time dashboards and analytics.

### D. Leaderboards

Sorted sets are perfect for implementing real-time leaderboards.

### E. Message Queues

Redis Lists can be used to implement simple message queues. Redis Streams (introduced in 5.0) offer more robust message queue capabilities.

### F. Rate Limiting

Use `INCR` and `EXPIRE` commands to implement rate limiting for APIs.

### G. Distributed Locks

Use `SETNX` (SET if Not eXists) or Redlock algorithm for distributed locking.

---

## VIII. Client Libraries

Redis has client libraries for almost every programming language.

### A. Connecting from Python (redis-py)

```python
import redis

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0)

# Set a key
r.set('mykey', 'Hello from Python!')

# Get a key
value = r.get('mykey')
print(value.decode()) # Output: Hello from Python!
```

### B. Connecting from Node.js (ioredis)

```javascript
const Redis = require('ioredis');
const redis = new Redis(); // Connects to 127.0.0.1:6379 by default

async function run() {
  await redis.set('mykey', 'Hello from Node.js!');
  const value = await redis.get('mykey');
  console.log(value); // Output: Hello from Node.js!
  redis.quit();
}

run();
```

### C. Connecting from Java (Jedis)

```java
import redis.clients.jedis.Jedis;

public class JedisExample {
    public static void main(String[] args) {
        // Connecting to Redis on localhost
        Jedis jedis = new Jedis("localhost");

        // Set a key
        jedis.set("mykey", "Hello from Java!");

        // Get a key
        String value = jedis.get("mykey");
        System.out.println(value); // Output: Hello from Java!

        jedis.close();
    }
}
```
