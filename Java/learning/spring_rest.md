# Building REST APIs with Spring

This guide provides a comprehensive overview of building RESTful APIs using Spring Boot, covering the core principles of REST, request/response handling, validation, error management, and best practices for creating robust and scalable web services.

## 1. Introduction to REST and RESTful APIs

### What is REST?

REST (Representational State Transfer) is an architectural style for distributed hypermedia systems. It's not a protocol or a standard, but a set of constraints that, when applied, yield a system with desirable properties like performance, scalability, and modifiability.

### Key Principles of REST

1.  **Client-Server:** Separation of concerns between the client and the server. The client handles the user interface and user experience, while the server manages data and business logic.
2.  **Stateless:** Each request from client to server must contain all the information necessary to understand the request. The server should not store any client context between requests.
3.  **Cacheable:** Responses must explicitly or implicitly define themselves as cacheable or non-cacheable to prevent clients from reusing stale or inappropriate data.
4.  **Layered System:** A client cannot ordinarily tell whether it is connected directly to the end server, or to an intermediary along the way.
5.  **Uniform Interface:** Simplifies the overall system architecture by having a uniform way of interacting with resources. This includes:
    *   **Resource Identification:** Resources are identified by URIs.
    *   **Resource Manipulation through Representations:** Clients interact with resources by exchanging representations (e.g., JSON, XML).
    *   **Self-descriptive Messages:** Each message includes enough information to describe how to process the message.
    *   **Hypermedia as the Engine of Application State (HATEOAS):** Clients interact with a REST server entirely through hypermedia provided dynamically by the server.

### Resources, URIs, HTTP Methods, Representations

*   **Resource:** Any information that can be named. In a RESTful API, everything is a resource (e.g., a user, a product, an order).
*   **URI (Uniform Resource Identifier):** A unique address that identifies a resource (e.g., `/users`, `/products/123`).
*   **HTTP Methods:** Standard verbs used to perform actions on resources:
    *   `GET`: Retrieve a resource or a collection of resources.
    *   `POST`: Create a new resource.
    *   `PUT`: Update an existing resource (replaces the entire resource).
    *   `PATCH`: Partially update an existing resource.
    *   `DELETE`: Remove a resource.
*   **Representation:** The format in which a resource's data is transferred (e.g., JSON, XML, HTML).

## 2. Building REST APIs with Spring Boot

Spring Boot, combined with Spring Web (Spring MVC), provides excellent support for building RESTful APIs.

### `@RestController`

A convenience annotation that combines `@Controller` and `@ResponseBody`. It indicates that the class is a controller and that the return value of its methods should be directly bound to the web response body (e.g., converted to JSON or XML).

### `@RequestMapping`

Maps HTTP requests to handler methods. Can be used at the class level to define a base path for all methods in the controller, and at the method level to define specific endpoints.

### Specific HTTP Method Annotations

These are convenience annotations that are specializations of `@RequestMapping` for specific HTTP methods:

*   **`@GetMapping`**: For `GET` requests.
*   **`@PostMapping`**: For `POST` requests.
*   **`@PutMapping`**: For `PUT` requests.
*   **`@DeleteMapping`**: For `DELETE` requests.
*   **`@PatchMapping`**: For `PATCH` requests.

#### Example `UserController`

```java
package com.example.restdemo.controller;

import com.example.restdemo.model.User;
import com.example.restdemo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users") // Base path for all methods in this controller
public class UserController {

    private final UserService userService;

    @Autowired // Constructor injection is preferred
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET /api/users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    // GET /api/users/{id}
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.findUserById(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    // POST /api/users
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.saveUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    // PUT /api/users/{id}
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        if (updatedUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    // DELETE /api/users/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUser(id);
        if (!deleted) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
```

## 3. Request Handling

Spring provides various annotations to extract data from incoming HTTP requests.

### `@PathVariable`

Used to extract values from the URI path.

```java
@GetMapping("/{id}")
public User getUserById(@PathVariable Long id) { /* ... */ }
```

### `@RequestParam`

Used to extract values from the query string or form data.

```java
@GetMapping("/search")
public List<User> searchUsers(@RequestParam(name = "name", required = false) String name) {
    // Example: /api/users/search?name=Alice
    return userService.findUsersByName(name);
}
```

### `@RequestBody`

Used to bind the HTTP request body (e.g., JSON or XML payload) to a method parameter. Requires a message converter (e.g., Jackson for JSON).

```java
@PostMapping
public ResponseEntity<User> createUser(@RequestBody User user) { /* ... */ }
```

### `@RequestHeader`

Used to bind an HTTP request header to a method parameter.

```java
@GetMapping("/header-info")
public String getHeaderInfo(@RequestHeader("User-Agent") String userAgent) {
    return "User-Agent: " + userAgent;
}
```

### `@CookieValue`

Used to bind an HTTP cookie to a method parameter.

```java
@GetMapping("/cookie-info")
public String getCookieInfo(@CookieValue(name = "myCookie", defaultValue = "N/A") String myCookie) {
    return "My Cookie: " + myCookie;
}
```

## 4. Response Handling

### Returning POJOs (Plain Old Java Objects)

When using `@RestController`, returning a POJO automatically converts it to JSON (or XML, if configured) and sets the `Content-Type` header appropriately.

```java
@GetMapping("/{id}")
public User getUserById(@PathVariable Long id) {
    return userService.findUserById(id);
}
```

### `ResponseEntity<T>`

Allows you to fully control the HTTP response, including status code, headers, and body.

```java
@GetMapping("/{id}")
public ResponseEntity<User> getUserById(@PathVariable Long id) {
    User user = userService.findUserById(id);
    if (user == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
    }
    return new ResponseEntity<>(user, HttpStatus.OK); // 200 OK with user object
}
```

### HTTP Status Codes

Always return appropriate HTTP status codes to indicate the outcome of an API operation.

*   `200 OK`: General success.
*   `201 Created`: Resource successfully created (for `POST`).
*   `204 No Content`: Action successful, but no content to return (for `DELETE`).
*   `400 Bad Request`: Client-side error (e.g., invalid input).
*   `401 Unauthorized`: Authentication required.
*   `403 Forbidden`: Authenticated but not authorized.
*   `404 Not Found`: Resource not found.
*   `409 Conflict`: Request conflicts with current state of the server (e.g., duplicate entry).
*   `500 Internal Server Error`: Server-side error.

## 5. Data Transfer Objects (DTOs)

### Why use DTOs?

DTOs are simple POJO classes used to transfer data between different layers of an application (e.g., between the controller and the service layer, or between the API and the client). They help to:

*   **Decouple:** Separate the API contract from the internal entity model.
*   **Hide internal details:** Prevent exposing sensitive or unnecessary entity fields to the client.
*   **Simplify data transfer:** Provide a tailored view of data for specific use cases.
*   **Facilitate validation:** Apply validation rules specific to the API request.

### Mapping between Entity and DTO

Tools like ModelMapper or MapStruct can automate the mapping process.

```java
// User Entity
public class User { /* ... id, username, email, password, roles ... */ }

// UserDTO for API response
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    // No password or roles

    // Getters, Setters, Constructors
}

// In Service or Controller:
// User user = userService.findUserById(id);
// UserDTO userDTO = convertToDto(user);
// return userDTO;
```

## 6. Validation

Spring provides robust validation capabilities for incoming request data.

### `@Valid` annotation

Triggers validation on a method argument (e.g., a DTO or entity in `@RequestBody`). Requires `spring-boot-starter-validation` dependency.

### `@Validated` annotation

Similar to `@Valid`, but can be used at the class level and supports validation groups.

### Validation annotations

Standard JSR-380 (Bean Validation) annotations:

*   `@NotNull`, `@NotEmpty`, `@NotBlank`
*   `@Size(min=x, max=y)`
*   `@Min(value)`, `@Max(value)`
*   `@Email`
*   `@Pattern(regexp="...")`

```java
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserCreateDTO {
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    // Getters and Setters
}

// In Controller:
@PostMapping
public ResponseEntity<User> createUser(@Valid @RequestBody UserCreateDTO userDto) {
    // If validation fails, a MethodArgumentNotValidException is thrown
    User user = userService.createUserFromDto(userDto);
    return new ResponseEntity<>(user, HttpStatus.CREATED);
}
```

### Custom validation

You can create custom validation annotations and logic.

### Handling validation errors (`@ControllerAdvice`, `MethodArgumentNotValidException`)

Use `@ControllerAdvice` to create a global exception handler that catches `MethodArgumentNotValidException` and returns a structured error response.

## 7. Error Handling in REST APIs

Consistent and informative error handling is crucial for a good API experience.

### `@ControllerAdvice` and `@ExceptionHandler`

`@ControllerAdvice` allows you to centralize exception handling across multiple controllers. `@ExceptionHandler` methods within a `@ControllerAdvice` class handle specific exceptions.

```java
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage()));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class) // Custom exception
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<String> handleAllUncaughtException(Exception ex) {
        return new ResponseEntity<>("An unexpected error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

### Custom error responses

Define custom error response structures (e.g., JSON objects with `code`, `message`, `details`).

### HTTP Status Codes for errors

Use appropriate HTTP status codes (e.g., 400, 401, 403, 404, 409, 500) to convey the nature of the error.

## 8. HATEOAS (Hypermedia as the Engine of Application State)

### Brief introduction

HATEOAS is a constraint of the REST architectural style that allows clients to interact with a REST server entirely through hypermedia provided dynamically by the server. Instead of hardcoding URIs, clients discover available actions and resources through links embedded in the API responses.

### Spring HATEOAS (conceptual)

Spring HATEOAS is a library that helps you implement HATEOAS principles in your Spring REST APIs by providing abstractions for adding links to your resources.

## 9. API Versioning

As your API evolves, you may need to introduce new versions without breaking existing clients.

### URI Versioning

Include the version number in the URI (e.g., `/api/v1/users`, `/api/v2/users`). Simple but can lead to URI proliferation.

### Header Versioning

Include the version number in a custom HTTP header (e.g., `X-API-Version: 1`).

### Content Negotiation Versioning

Use the `Accept` header to specify the desired version (e.g., `Accept: application/vnd.mycompany.app-v1+json`).

## 10. Security (Conceptual)

Securing your REST APIs is paramount.

### Spring Security (brief mention)

Spring Security is a powerful and highly customizable authentication and access-control framework. It's the de-facto standard for securing Spring-based applications.

### Authentication

Verifying the identity of a user.

*   **Basic Auth:** Simple username/password over HTTP (not recommended without HTTPS).
*   **JWT (JSON Web Tokens):** A popular token-based authentication mechanism for stateless APIs.
*   **OAuth2:** For delegated authorization.

### Authorization

Determining if an authenticated user has permission to perform a given action.

## 11. Testing REST APIs

Thorough testing is essential for REST APIs.

### `@WebMvcTest`

Used for testing Spring MVC controllers. It loads only the web layer and mocks other parts of the application, making tests fast and focused.

### `MockMvc`

Provided by Spring Test, `MockMvc` allows you to perform requests against your controllers without starting a full HTTP server. It's ideal for unit and integration testing of the controller layer.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService; // Mock the service layer

    @Test
    void testGetUserById() throws Exception {
        User user = new User(1L, "testuser", "test@example.com", "password");
        when(userService.findUserById(1L)).thenReturn(user);

        mockMvc.perform(get("/api/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testuser"));
    }

    @Test
    void testCreateUser() throws Exception {
        User newUser = new User(null, "newuser", "new@example.com", "newpass");
        User savedUser = new User(2L, "newuser", "new@example.com", "newpass");
        when(userService.saveUser(any(User.class))).thenReturn(savedUser);

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"newuser\",\"email\":\"new@example.com\",\"password\":\"newpass\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(2L));
    }
}
```

### `TestRestTemplate`

Used in `@SpringBootTest` (full context) for integration tests where you want to test the entire application stack by making real HTTP requests.

### Integration tests

Test the interaction between different layers of your application (controller, service, repository) and potentially the actual database.

