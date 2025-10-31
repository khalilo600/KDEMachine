# Java Concurrency and Multithreading

This guide explores the concepts of concurrency and multithreading in Java, covering how to create and manage threads, synchronize access to shared resources, and utilize Java's powerful concurrency utilities to build efficient and responsive applications.

## 1. Introduction to Concurrency and Multithreading

### What is Concurrency?

Concurrency refers to the ability of different parts of a program or system to execute independently and out of order. It's about dealing with many things at once, not necessarily doing many things at once. Concurrency can be achieved through multithreading, multiprocessing, or asynchronous programming.

### What is Multithreading?

Multithreading is a form of concurrency where a single program is divided into multiple, independent execution paths called threads. Each thread runs concurrently within the same process, sharing the process's resources (memory, files, etc.).

### Benefits and Challenges of Multithreading

#### Benefits:

*   **Improved Responsiveness:** A long-running task can run in a separate thread, keeping the main application responsive.
*   **Better Resource Utilization:** Threads can utilize multiple CPU cores, leading to faster execution for CPU-bound tasks.
*   **Simplified Program Design:** Complex tasks can be broken down into smaller, independent threads.

#### Challenges:

*   **Complexity:** Writing correct concurrent code is difficult due to issues like race conditions, deadlocks, and starvation.
*   **Debugging:** Debugging multithreaded applications can be challenging.
*   **Overhead:** Creating and managing threads incurs some overhead.

### Processes vs. Threads

*   **Process:** An independent execution unit that has its own memory space, resources, and execution context. Processes are isolated from each other.
*   **Thread:** A lightweight execution unit within a process. Threads within the same process share the same memory space and resources, making inter-thread communication easier but also requiring careful synchronization.

## 2. Creating Threads

In Java, there are two primary ways to create a thread:

### Extending the `Thread` class

```java
class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
            try {
                Thread.sleep(500); // Pause for 500 milliseconds
            } catch (InterruptedException e) {
                System.out.println(Thread.currentThread().getName() + " interrupted.");
            }
        }
    }
}

public class ThreadExample1 {
    public static void main(String[] args) {
        MyThread thread1 = new MyThread();
        thread1.setName("Thread-A");
        MyThread thread2 = new MyThread();
        thread2.setName("Thread-B");

        thread1.start(); // Starts the execution of the thread
        thread2.start();
    }
}
```

### Implementing the `Runnable` interface

This is generally preferred as it allows your class to extend another class if needed (Java does not support multiple inheritance of classes).

```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                System.out.println(Thread.currentThread().getName() + " interrupted.");
            }
        }
    }
}

public class ThreadExample2 {
    public static void main(String[] args) {
        Thread thread1 = new Thread(new MyRunnable(), "Runnable-A");
        Thread thread2 = new Thread(new MyRunnable(), "Runnable-B");

        thread1.start();
        thread2.start();
    }
}
```

### Thread Lifecycle

A thread goes through several states during its lifetime:

1.  **New:** The thread has been created but not yet started.
2.  **Runnable:** The thread is ready to run and is waiting for the CPU.
3.  **Running:** The thread is currently executing.
4.  **Blocked/Waiting:** The thread is temporarily inactive (e.g., waiting for I/O, a lock, or another thread to finish).
5.  **Terminated:** The thread has completed its execution.

## 3. Thread Synchronization

When multiple threads access shared resources, it can lead to data inconsistency. Synchronization mechanisms ensure that only one thread accesses a critical section of code at a time.

### The `synchronized` keyword

*   **`synchronized` methods:** Locks the object instance (or the class for static methods) when a thread enters the method.

    ```java
    class Counter {
        private int count = 0;

        public synchronized void increment() {
            count++;
        }

        public synchronized int getCount() {
            return count;
        }
    }
    ```

*   **`synchronized` blocks:** Provides finer-grained control by locking only a specific block of code, using an object as a monitor.

    ```java
    class Counter {
        private int count = 0;
        private final Object lock = new Object(); // A dedicated lock object

        public void increment() {
            synchronized (lock) {
                count++;
            }
        }

        public int getCount() {
            synchronized (lock) {
                return count;
            }
        }
    }
    ```

### `wait()`, `notify()`, `notifyAll()`

These methods (from `Object` class) are used for inter-thread communication. They must be called from within a `synchronized` block or method.

*   `wait()`: Causes the current thread to wait until another thread invokes the `notify()` method or the `notifyAll()` method for this object.
*   `notify()`: Wakes up a single thread that is waiting on this object's monitor.
*   `notifyAll()`: Wakes up all threads that are waiting on this object's monitor.

```java
class ProducerConsumer {
    private LinkedList<Integer> list = new LinkedList<>();
    private final int CAPACITY = 2;

    public void produce() throws InterruptedException {
        int value = 0;
        while (true) {
            synchronized (this) {
                while (list.size() == CAPACITY) {
                    wait(); // Wait if buffer is full
                }
                System.out.println("Producer produced-" + value);
                list.add(value++);
                notify(); // Notify consumer that item is available
                Thread.sleep(1000);
            }
        }
    }

    public void consume() throws InterruptedException {
        while (true) {
            synchronized (this) {
                while (list.size() == 0) {
                    wait(); // Wait if buffer is empty
                }
                int val = list.removeFirst();
                System.out.println("Consumer consumed-" + val);
                notify(); // Notify producer that space is available
                Thread.sleep(1000);
            }
        }
    }
}
```

### `volatile` keyword

Ensures that a variable's value is always read from main memory and not from a thread's local cache. It guarantees visibility of changes across threads but does not provide atomicity.

```java
class SharedResource {
    public volatile boolean flag = false;

    public void setFlag() {
        flag = true;
    }

    public void checkFlag() {
        while (!flag) {
            // busy-wait until flag is true
        }
        System.out.println("Flag is now true.");
    }
}
```

### `join()` method

Causes the current thread to wait until the thread it is joining with terminates.

```java
Thread t1 = new Thread(() -> { /* ... */ });
Thread t2 = new Thread(() -> { /* ... */ });

t1.start();
t2.start();

t1.join(); // Main thread waits for t1 to finish
t2.join(); // Main thread waits for t2 to finish

System.out.println("Both threads have finished.");
```

## 4. Concurrency Utilities (`java.util.concurrent`)

Introduced in Java 5, this package provides a powerful set of tools for building concurrent applications, offering higher-level abstractions than basic `Thread` and `synchronized`.

### Executors Framework

Manages thread creation and reuse, separating task submission from task execution.

*   **`Executor`**: An interface for executing submitted `Runnable` tasks.
*   **`ExecutorService`**: An extension of `Executor` that provides methods to manage termination and methods that can produce a `Future` for tracking progress of asynchronous tasks.
*   **`Executors`**: A utility class that provides factory methods for creating various types of `ExecutorService` (e.g., `newFixedThreadPool`, `newCachedThreadPool`, `newSingleThreadExecutor`).

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.Callable;

public class ExecutorExample {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(2); // Pool of 2 threads

        // Submitting a Runnable task
        executor.execute(() -> System.out.println("Runnable task executed by " + Thread.currentThread().getName()));

        // Submitting a Callable task (returns a result)
        Future<Integer> future = executor.submit(new Callable<Integer>() {
            @Override
            public Integer call() throws Exception {
                System.out.println("Callable task executed by " + Thread.currentThread().getName());
                Thread.sleep(1000);
                return 123;
            }
        });

        System.out.println("Result from Callable: " + future.get()); // Blocks until result is available

        executor.shutdown(); // Initiates an orderly shutdown
    }
}
```

### Locks

More flexible and powerful than `synchronized` blocks/methods.

*   **`ReentrantLock`**: A mutual exclusion lock that has the same basic behavior as `synchronized` but with extended capabilities (e.g., `tryLock()`, `lockInterruptibly()`).

    ```java
    import java.util.concurrent.locks.ReentrantLock;

    class SharedResource {
        private int count = 0;
        private final ReentrantLock lock = new ReentrantLock();

        public void increment() {
            lock.lock(); // Acquire the lock
            try {
                count++;
            } finally {
                lock.unlock(); // Release the lock in a finally block
            }
        }
    }
    ```

*   **`ReadWriteLock`**: Allows multiple readers to acquire the lock simultaneously, but only one writer at a time. Improves performance for read-heavy operations.

### Semaphores

Controls access to a common resource by maintaining a count of available permits. Threads acquire a permit to access the resource and release it when done.

```java
import java.util.concurrent.Semaphore;

class PrinterQueue {
    private final Semaphore semaphore = new Semaphore(1); // Only 1 printer available

    public void printJob(String document) {
        try {
            semaphore.acquire(); // Acquire a permit
            System.out.println(Thread.currentThread().getName() + " printing " + document);
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            semaphore.release(); // Release the permit
        }
    }
}
```

### Atomic Variables

Classes that provide atomic operations on single variables, guaranteeing that operations like incrementing a counter are performed as a single, indivisible unit, even in multithreaded environments.

*   `AtomicInteger`, `AtomicLong`, `AtomicBoolean`, `AtomicReference`.

```java
import java.util.concurrent.atomic.AtomicInteger;

class AtomicCounter {
    private AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet(); // Atomic increment
    }

    public int getCount() {
        return count.get();
    }
}
```

### Concurrent Collections

(Brief mention, refer to `collections_generics.md` for more detail)

Thread-safe implementations of standard collection interfaces, designed for concurrent access.

*   `ConcurrentHashMap`
*   `CopyOnWriteArrayList`
*   `BlockingQueue` (e.g., `ArrayBlockingQueue`, `LinkedBlockingQueue`)

## 5. Thread Pools

Thread pools manage a collection of worker threads, reducing the overhead of creating and destroying threads for each task. They are typically created using the `Executors` factory methods.

### Benefits of Thread Pools

*   **Reduced Overhead:** Threads are reused.
*   **Improved Performance:** Tasks are executed more efficiently.
*   **Resource Management:** Limits the number of concurrent threads.

### Creating Thread Pools with `Executors`

```java
// Example from Executors Framework section
ExecutorService executor = Executors.newFixedThreadPool(5); // Creates a pool of 5 threads
```

## 6. Deadlock, Livelock, Starvation

Common issues in concurrent programming:

*   **Deadlock:** Two or more threads are blocked indefinitely, waiting for each other to release resources.
*   **Livelock:** Threads are not blocked but are continuously changing their state in response to other threads, without making any progress.
*   **Starvation:** A thread is perpetually denied access to a shared resource or CPU time.

### Strategies to Avoid Them

*   **Deadlock:** Avoid nested locks, acquire locks in a consistent order, use timeouts for acquiring locks.
*   **Livelock:** Introduce randomness or back-off strategies.
*   **Starvation:** Ensure fair access to resources (e.g., using `ReentrantLock` with fairness policy).

## 7. Fork/Join Framework

Introduced in Java 7, the Fork/Join Framework is designed for tasks that can be broken into smaller subtasks recursively. It uses a `ForkJoinPool` to efficiently manage worker threads.

*   **`ForkJoinPool`**: An `ExecutorService` for running `ForkJoinTask`s.
*   **`RecursiveTask`**: A `ForkJoinTask` that returns a result.
*   **`RecursiveAction`**: A `ForkJoinTask` that does not return a result.

```java
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveTask;

class SumArrayTask extends RecursiveTask<Long> {
    private final long[] array;
    private final int start;
    private final int end;
    private static final int THRESHOLD = 10000; // Threshold for direct computation

    public SumArrayTask(long[] array, int start, int end) {
        this.array = array;
        this.start = start;
        this.end = end;
    }

    @Override
    protected Long compute() {
        if (end - start <= THRESHOLD) {
            // Base case: compute directly
            long sum = 0;
            for (int i = start; i < end; i++) {
                sum += array[i];
            }
            return sum;
        } else {
            // Recursive case: split task
            int mid = start + (end - start) / 2;
            SumArrayTask leftTask = new SumArrayTask(array, start, mid);
            SumArrayTask rightTask = new SumArrayTask(array, mid, end);

            leftTask.fork(); // Asynchronously execute left task
            long rightResult = rightTask.compute(); // Compute right task synchronously
            long leftResult = leftTask.join(); // Wait for left task to complete and get result

            return leftResult + rightResult;
        }
    }
}

public class ForkJoinExample {
    public static void main(String[] args) {
        long[] array = new long[100000];
        for (int i = 0; i < array.length; i++) {
            array[i] = i + 1;
        }

        ForkJoinPool pool = new ForkJoinPool();
        long sum = pool.invoke(new SumArrayTask(array, 0, array.length));
        System.out.println("Total sum: " + sum);
    }
}
```

## 8. CompletableFuture (Java 8+)

`CompletableFuture` provides a powerful way to write asynchronous, non-blocking code in Java, making it easier to compose and combine asynchronous tasks and handle their results or errors.

### Asynchronous Programming

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class CompletableFutureExample {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        // Run a task asynchronously and get a Future
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return "Hello from CompletableFuture!";
        });

        // Do something else while the task is running
        System.out.println("Main thread doing other work...");

        // Get the result (blocks until complete)
        String result = future.get();
        System.out.println(result);

        // Chaining asynchronous tasks
        CompletableFuture.supplyAsync(() -> "Hello")
            .thenApply(s -> s + " World")
            .thenApply(s -> s + "!")
            .thenAccept(System.out::println) // Prints "Hello World!"
            .join(); // Wait for the final result

        // Error handling
        CompletableFuture.supplyAsync(() -> {
            if (true) throw new RuntimeException("Oops!");
            return "Result";
        }).exceptionally(ex -> {
            System.out.println("Caught exception: " + ex.getMessage());
            return "Fallback Result";
        }).thenAccept(System.out::println)
        .join(); // Prints "Fallback Result"
    }
}
```
