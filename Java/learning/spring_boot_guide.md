# Spring Boot Guide

This guide provides a comprehensive introduction to Spring Boot, a powerful framework that simplifies the development of production-ready Spring applications. It covers project setup, core concepts, web development, data persistence, testing, and deployment.

## 1. Introduction to Spring Boot

### What is Spring Boot?

Spring Boot is an opinionated framework that simplifies the creation of stand-alone, production-grade Spring-based applications. It aims to get you up and running as quickly as possible, with minimum fuss.

### Why Spring Boot?

*   **Opinionated Defaults:** Provides sensible defaults for configuration, reducing boilerplate code.
*   **Auto-Configuration:** Automatically configures your Spring application based on the dependencies present in your classpath.
*   **Embedded Servers:** Includes embedded Tomcat, Jetty, or Undertow, meaning you can just run your application as a JAR.
*   **No XML Configuration:** Largely eliminates the need for XML configuration, favoring annotations and convention over configuration.
*   **Production-Ready Features:** Provides features like metrics, health checks, and externalized configuration out-of-the-box.

### Spring vs. Spring Boot

*   **Spring Framework:** A comprehensive framework for building enterprise-level applications in Java. It provides core functionalities like Dependency Injection, Aspect-Oriented Programming, and data access.
*   **Spring Boot:** Built on top of the Spring Framework, it aims to simplify the development and deployment of Spring applications by taking an opinionated approach and providing auto-configuration, embedded servers, and starter dependencies.

## 2. Project Setup

### Spring Initializr

The easiest way to start a new Spring Boot project is by using the [Spring Initializr](https://start.spring.io/).

*   **Web Interface:** Go to `start.spring.io`, select your project metadata (Maven/Gradle, Java version, Spring Boot version), and add dependencies (e.g., Spring Web, Spring Data JPA, H2 Database).
*   **CLI:** Use Spring Boot CLI (`spring init`) or cURL commands.

```bash
# Example using cURL to generate a Maven project with Web and H2 dependencies
curl https://start.spring.io/starter.zip -d type=maven-project -d dependencies=web,data-jpa,h2 -d baseDir=mySpringBootApp -o mySpringBootApp.zip
unzip mySpringBootApp.zip
cd mySpringBootApp
```

### Maven vs. Gradle

*   **Maven:** XML-based build automation tool. `pom.xml` defines dependencies and build process.
*   **Gradle:** Groovy-based (or Kotlin DSL) build automation tool. `build.gradle` defines dependencies and build process.

Both are widely supported. Spring Initializr allows you to choose your preferred build tool.

### Project Structure

A typical Spring Boot application will have a structure like this:

```
mySpringBootApp/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── mySpringBootApp/
│   │   │               ├── MySpringBootAppApplication.java # Main application class
│   │   │               ├── controller/
│   │   │               │   └── MyController.java
│   │   │               ├── service/
│   │   │               │   └── MyService.java
│   │   │               └── repository/
│   │   │                   └── MyRepository.java
│   │   └── resources/
│   │       ├── application.properties  # Configuration file
│   │       ├── static/              # Static web content (CSS, JS, images)
│   │       └── templates/           # Thymeleaf/JSP templates
│   └── test/
│       └── java/
│           └── com/
│               └── example/
│                   └── mySpringBootApp/
│                       └── MySpringBootAppApplicationTests.java
├── pom.xml (or build.gradle)
└── README.md
```

## 3. Core Concepts

### `@SpringBootApplication`

This annotation is a convenience annotation that adds three critical annotations:

*   **`@Configuration`**: Tags the class as a source of bean definitions for the application context.
*   **`@EnableAutoConfiguration`**: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings.
*   **`@ComponentScan`**: Tells Spring to look for other components, configurations, and services in the `com.example.mySpringBootApp` package, allowing it to find your controllers, services, etc.

```java
package com.example.mySpringBootApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MySpringBootAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(MySpringBootAppApplication.class, args);
    }
}
```

### Auto-configuration

Spring Boot automatically configures many aspects of your application based on the dependencies you include. For example, if `spring-boot-starter-web` is on the classpath, Spring Boot automatically configures a web server (Tomcat by default).

### Starters

Spring Boot starters are a set of convenient dependency descriptors that you can include in your application. They contain all the transitive dependencies needed for a particular feature.

*   `spring-boot-starter-web`: For building web applications, includes Tomcat and Spring MVC.
*   `spring-boot-starter-data-jpa`: For using Spring Data JPA with Hibernate.
*   `spring-boot-starter-test`: For testing Spring Boot applications.

### Embedded Servers

Spring Boot can embed web servers directly into an executable JAR. This means you don't need to deploy WAR files to a separate application server.

*   **Tomcat:** Default embedded server. (`spring-boot-starter-web` includes it).
*   **Jetty:** Can be used by excluding Tomcat and adding Jetty starter.
*   **Undertow:** Another option for embedded servers.

## 4. Configuration

Spring Boot provides powerful and flexible externalized configuration options.

### `application.properties` / `application.yml`

These files are located in `src/main/resources` and are the primary way to configure your Spring Boot application.

```properties
# application.properties
server.port=8081
spring.datasource.url=jdbc:h2:mem:testdb
spring.jpa.hibernate.ddl-auto=update
myapp.greeting=Hello from Properties!
```

```yaml
# application.yml
server:
  port: 8081
spring:
  datasource:
    url: jdbc:h2:mem:testdb
  jpa:
    hibernate:
      ddl-auto: update
myapp:
  greeting: Hello from YAML!
```

### Profiles

Profiles allow you to have different configurations for different environments (e.g., `development`, `production`, `test`).

*   `application-dev.properties`
*   `application-prod.properties`

You activate a profile using `spring.profiles.active=dev` in `application.properties` or as a command-line argument (`--spring.profiles.active=dev`).

### Externalized Configuration (Order of Precedence)

Spring Boot pulls configuration from various sources in a specific order, allowing you to override values easily (e.g., command-line arguments override environment variables, which override `application.properties`).

### `@Value` annotation

Used to inject properties directly into fields in your Spring components.

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MyConfigProperties {
    @Value("${myapp.greeting}")
    private String greetingMessage;

    public String getGreetingMessage() {
        return greetingMessage;
    }
}
```

## 5. Developing Web Applications

Spring Boot with `spring-boot-starter-web` uses Spring MVC for building web applications and RESTful services.

### Controller

Handle incoming HTTP requests and return responses.

*   **`@RestController`**: A convenience annotation that combines `@Controller` and `@ResponseBody`. Used for building RESTful APIs, where the return value of methods is directly bound to the web response body.
*   **`@Controller`**: Used for traditional Spring MVC applications that typically render views.
*   **`@RequestMapping`**: Maps HTTP requests to handler methods. Can be used at class or method level.
*   **`@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`, `@PatchMapping`**: Convenience annotations for specific HTTP methods.

### Annotations for Request Handling

*   **`@PathVariable`**: Binds a URI template variable to a method parameter.
*   **`@RequestParam`**: Binds web request parameters (from query string or form data) to a method parameter.
*   **`@RequestBody`**: Binds the HTTP request body (e.g., JSON) to a method parameter.

#### Example Controller

```java
package com.example.mySpringBootApp.controller;

import com.example.mySpringBootApp.model.User;
import com.example.mySpringBootApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Combines @Controller and @ResponseBody
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findUserById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
```

### Service Layer (`@Service`)

Contains the business logic of the application. Controllers rely on services to perform operations.

```java
package com.example.mySpringBootApp.service;

import com.example.mySpringBootApp.model.User;
import com.example.mySpringBootApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // Indicates this is a service component
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User findUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Other business logic methods
}
```

### Repository Layer (`@Repository`)

Handles data access logic, abstracting the details of interacting with the database. Often used with Spring Data JPA.

```java
package com.example.mySpringBootApp.repository;

import com.example.mySpringBootApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Indicates this is a repository component
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Data JPA automatically provides CRUD methods
    // You can also define custom query methods here
    User findByEmail(String email);
}
```

## 6. Dependency Injection (DI) & Inversion of Control (IoC)

### Spring IoC Container

At the heart of Spring is the Inversion of Control (IoC) container, which is responsible for managing the lifecycle of your application's objects (beans) and their dependencies.

### `@Autowired`

Automatically injects dependencies into your components. Spring scans for components (`@Component`, `@Service`, `@Repository`, `@Controller`, `@RestController`) and wires them together.

### Constructor Injection vs. Field Injection

*   **Field Injection (`@Autowired` on a field):** Simpler syntax, but can make testing harder and hide dependencies.
*   **Constructor Injection (preferred):** Dependencies are provided via the constructor. Makes dependencies explicit and facilitates unit testing.

```java
// Field Injection
@Autowired
private UserService userService;

// Constructor Injection (preferred for easier testing and explicit dependencies)
private final UserService userService;

public UserController(UserService userService) {
    this.userService = userService;
}
```

### Scopes

Defines the lifecycle and visibility of beans within the Spring container.

*   **`singleton` (default):** A single instance of the bean exists per Spring IoC container.
*   **`prototype`:** A new bean instance is created each time it is requested.
*   **`request`:** A new bean is created for each HTTP request.
*   **`session`:** A new bean is created for each HTTP session.

## 7. Data Persistence (Brief Mention)

Spring Boot makes integrating with various data stores easy. For relational databases, Spring Data JPA is a common choice.

*   **Connecting to a database:** Configure database properties in `application.properties` (e.g., `spring.datasource.url`, `username`, `password`).
*   **Setting up JPA:** Include `spring-boot-starter-data-jpa` and define your JPA entities (models) using `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@Column` (refer to `spring_data_jpa.md` for details).

## 8. Testing

Spring Boot provides a powerful testing framework to ensure the quality of your application.

### `@SpringBootTest`

Loads the full Spring application context. Useful for integration tests.

```java
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;

@SpringBootTest
public class MySpringBootAppApplicationTests {
    @Test
    void contextLoads() {
        // Verifies that the application context loads successfully
    }
}
```

### `@WebMvcTest`

Used for testing Spring MVC controllers. It loads only the web layer and mocks other parts of the application.

### `TestRestTemplate`

Used in integration tests to send HTTP requests to your application and assert responses.

### `MockMvc`

Used to test controllers without actually starting an HTTP server. It allows you to perform requests and assert on the response using a fluent API.

## 9. Actuator (Basic)

Spring Boot Actuator provides production-ready features to help you monitor and manage your application. It exposes operation information using HTTP endpoints.

### Monitoring and Managing Applications in Production

### Endpoints

*   `/actuator/health`: Provides basic application health information.
*   `/actuator/info`: Displays arbitrary application info.
*   `/actuator/metrics`: Shows metrics information for the current application.
*   `/actuator/beans`: Displays a complete list of all the Spring beans in your application.

To enable Actuator, add the `spring-boot-starter-actuator` dependency.

## 10. Deployment

Spring Boot applications can be easily deployed as executable JARs.

### Executable JAR

Build your application (e.g., `mvn clean package` or `gradle build`), and a single executable JAR file will be created in your `target/` or `build/libs/` directory. You can then run it using `java -jar your-app.jar`.

### Containerization (Docker - conceptual)

Spring Boot applications are excellent candidates for containerization using Docker. You can create a Dockerfile to package your application and run it in a Docker container.
