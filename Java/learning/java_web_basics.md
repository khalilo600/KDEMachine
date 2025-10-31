# Java Web Development Basics (Servlets & JSP)

This guide introduces the foundational technologies for building web applications in Java: Servlets and JavaServer Pages (JSP). These technologies, part of Java EE (now Jakarta EE), allow developers to create dynamic and interactive web content.

## 1. Introduction to Java Web Development

### Web Application Architecture

Java web applications typically follow a client-server architecture, where a web browser (client) sends HTTP requests to a web server, which then processes the request and sends back an HTTP response.

*   **Client:** Web browser, mobile app, etc.
*   **HTTP:** The protocol used for communication between client and server.
*   **Web Server:** Software that handles HTTP requests (e.g., Apache HTTP Server, Nginx).
*   **Web Container (Servlet Container):** A component of a web server that manages the lifecycle of Servlets and JSPs, handles request/response processing, and provides services like session management. Examples: Apache Tomcat, Jetty, WildFly (formerly JBoss).

### Java EE (Jakarta EE) Overview

Java EE (Enterprise Edition), now known as Jakarta EE, is a set of specifications for enterprise Java development. It includes APIs for web services, database access, messaging, and more. Servlets and JSP are core components of Java EE's web profile.

## 2. Servlets

### What are Servlets?

Servlets are Java programs that extend the capabilities of a server. They are server-side components that generate dynamic web content and interact with web clients using the request-response programming model.

### Servlet Lifecycle

A Servlet's lifecycle is managed by the web container and consists of three main phases:

1.  **`init()`**: Called once when the Servlet is first loaded by the container. Used for initialization tasks.
2.  **`service()`**: Called for each client request. It dispatches the request to appropriate `doGet()`, `doPost()`, etc., methods.
3.  **`destroy()`**: Called once when the Servlet is being removed from service (e.g., when the web server shuts down). Used for cleanup tasks.

### `HttpServlet` Class

Most Servlets extend `HttpServlet`, which provides implementations for the `service()` method that dispatches requests to specific `doGet()`, `doPost()`, `doPut()`, `doDelete()` methods based on the HTTP method of the request.

### Handling HTTP Methods (`doGet()`, `doPost()`)

*   **`doGet(HttpServletRequest request, HttpServletResponse response)`**: Handles HTTP GET requests. Typically used for retrieving data or displaying pages.
*   **`doPost(HttpServletRequest request, HttpServletResponse response)`**: Handles HTTP POST requests. Typically used for submitting data (e.g., form submissions).

### `HttpServletRequest` and `HttpServletResponse` Objects

*   **`HttpServletRequest`**: Represents the client's request. Provides methods to access request parameters, headers, cookies, session information, etc.
*   **`HttpServletResponse`**: Represents the server's response to the client. Provides methods to set response headers, status codes, and write content to the client.

### Reading Request Parameters

```java
// In doGet() or doPost()
String username = request.getParameter("username");
String[] hobbies = request.getParameterValues("hobby"); // For multiple values
```

### Setting Response Content

```java
// In doGet() or doPost()
response.setContentType("text/html"); // Set content type
PrintWriter out = response.getWriter(); // Get a PrintWriter to write content
out.println("<html><body><h1>Hello from Servlet!</h1></body></html>");
```

### Deployment Descriptor (`web.xml`) vs. Annotations (`@WebServlet`)

*   **`web.xml` (Deployment Descriptor):** An XML file used to configure Servlets, JSP, filters, listeners, etc. (Servlet API 2.x and earlier).
*   **Annotations (`@WebServlet`):** From Servlet API 3.0 onwards, you can configure Servlets using annotations directly in the Java code, which is the preferred modern approach.

```java
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/hello") // Maps this Servlet to the /hello URL path
public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>Hello, " + request.getParameter("name") + " from Servlet!</h1>");
        out.println("</body></html>");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Handle POST requests, e.g., form submissions
        String data = request.getParameter("data");
        response.setContentType("text/plain");
        response.getWriter().write("Received POST data: " + data);
    }
}
```

## 3. JavaServer Pages (JSP)

### What is JSP?

JSP is a technology that helps developers create dynamic web pages. It allows you to embed Java code directly into HTML pages using special tags. A JSP page is essentially an HTML page with embedded Java code that gets compiled into a Servlet by the web container.

### JSP Lifecycle

1.  **Translation:** The web container translates the JSP page into a Java Servlet source file.
2.  **Compilation:** The Servlet source file is compiled into a Java class file.
3.  **Loading:** The Servlet class is loaded into memory.
4.  **Instantiation:** An instance of the Servlet class is created.
5.  **`jspInit()`**: Called once for initialization.
6.  **`_jspService()`**: Called for each client request to process the request and generate the response.
7.  **`jspDestroy()`**: Called once for cleanup when the JSP is removed from service.

### JSP Elements

#### Scriptlets (`<% ... %>`)

Allows you to embed any valid Java code directly into the JSP page.

```jsp
<% int i = 0; %>
<% for (i = 1; i <= 5; i++) { %>
    <p>Hello <%= i %></p>
<% } %>
```

#### Expressions (`<%= ... %>`)

Evaluates a Java expression and prints its result directly to the output stream.

```jsp
<p>Current time: <%= new java.util.Date() %></p>
```

#### Declarations (`<%! ... %>`)

Used to declare instance variables or methods within the JSP's generated Servlet class.

```jsp
<%! int counter = 0; %>
<%! public int incrementCounter() { return ++counter; } %>
<p>Page visits: <%= incrementCounter() %></p>
```

#### Directives (`<%@ ... %>`)

Provide instructions to the JSP container about how to process the page.

*   `page`: Defines page-dependent attributes (e.g., `language`, `import`, `contentType`).
*   `include`: Includes another file at translation time.
*   `taglib`: Declares a tag library.

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="header.jsp" %>
```

#### Actions (`<jsp: ... />`)

XML-like tags that control the behavior of the JSP engine.

*   `<jsp:include page="relativeURL" />`: Includes a page at request time.
*   `<jsp:forward page="relativeURL" />`: Forwards the request to another resource.
*   `<jsp:useBean id="name" class="package.Class" />`: Locates or instantiates a JavaBean.

### Implicit Objects

JSP provides several implicit objects that are automatically available in scriptlets and expressions without explicit declaration:

*   `request`: `HttpServletRequest` object.
*   `response`: `HttpServletResponse` object.
*   `session`: `HttpSession` object.
*   `application`: `ServletContext` object.
*   `out`: `JspWriter` object for writing content.
*   `config`: `ServletConfig` object.
*   `pageContext`: `PageContext` object.
*   `page`: The Servlet instance itself.
*   `exception`: `Throwable` object (only in error pages).

### JSP Standard Tag Library (JSTL)

JSTL provides a set of standard tags that encapsulate common JSP programming tasks, such as iteration and conditionals, data formatting, and XML manipulation. It's highly recommended over scriptlets for cleaner code.

```jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:if test="${user.isAdmin}">
    <p>Welcome, Admin!</p>
</c:if>
<c:forEach var="item" items="${myList}">
    <p>${item}</p>
</c:forEach>
```

## 4. Model-View-Controller (MVC) in Java Web

### Understanding the Pattern

MVC is an architectural pattern that separates an application into three main components:

*   **Model:** Represents the data and business logic (e.g., JavaBeans, POJOs, database interaction).
*   **View:** Displays the data to the user (e.g., JSP pages, HTML).
*   **Controller:** Handles user input, interacts with the Model, and selects the appropriate View (e.g., Servlets).

### How Servlets and JSPs fit into MVC

*   **Controller:** Servlets typically act as controllers, receiving requests, processing input, and delegating to the model.
*   **View:** JSPs typically act as views, responsible for rendering the presentation layer based on data provided by the controller.
*   **Model:** Plain Old Java Objects (POJOs) or JavaBeans represent the data and business logic.

This separation of concerns makes applications more modular, maintainable, and testable.

## 5. Basic Web Application Example (Conceptual)

Consider a simple user registration form.

1.  **`register.jsp` (View):** Contains an HTML form for user input.

    ```jsp
    <!-- register.jsp -->
    <form action="registerServlet" method="post">
        Username: <input type="text" name="username"><br>
        Email: <input type="email" name="email"><br>
        <input type="submit" value="Register">
    </form>
    ```

2.  **`RegisterServlet.java` (Controller):** Receives the form submission.

    ```java
    // RegisterServlet.java
    @WebServlet("/registerServlet")
    public class RegisterServlet extends HttpServlet {
        protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            String username = request.getParameter("username");
            String email = request.getParameter("email");

            // --- Model Interaction (Conceptual) ---
            // User user = new User(username, email);
            // userService.registerUser(user);

            request.setAttribute("message", "Registration successful for " + username);
            request.getRequestDispatcher("success.jsp").forward(request, response);
        }
    }
    ```

3.  **`success.jsp` (View):** Displays a success message.

    ```jsp
    <!-- success.jsp -->
    <p>${requestScope.message}</p>
    ```

This example demonstrates how a Servlet acts as a controller, processing input and forwarding to a JSP view to display the result.
