# ASP.NET Core Guide: Comprehensive Learning Outline

This guide provides a structured overview of ASP.NET Core, a cross-platform, high-performance, open-source framework for building modern, cloud-based, internet-connected applications. It covers core concepts, web development with MVC, RESTful APIs, data access with Entity Framework Core, configuration, authentication, testing, and deployment best practices.

---

## I. Getting Started and Core Concepts

### A. What is ASP.NET Core?

ASP.NET Core is a re-design of ASP.NET by Microsoft, providing a unified framework for building web UI and web APIs. It runs on .NET, which is a free, cross-platform, open-source developer platform for building many different types of applications.

*   **Cross-Platform:** Runs on Windows, macOS, and Linux.
*   **High-Performance:** Designed for speed and scalability.
*   **Open-Source:** Community-driven development.
*   **Unified Framework:** For building web UI (MVC, Razor Pages) and web APIs.

### B. Why Use ASP.NET Core?

*   **Performance:** One of the fastest web frameworks available.
*   **Cross-Platform Development:** Develop and deploy on any major operating system.
*   **Cloud-Ready:** Built for cloud-native applications and microservices.
*   **Modern Tooling:** Excellent IDE support with Visual Studio and Visual Studio Code.
*   **Strong Ecosystem:** Leverages the vast .NET ecosystem and C# language features.
*   **Built-in Dependency Injection:** First-class support for DI.

### C. Installation and Setup (.NET SDK, IDE - Visual Studio/VS Code)

1.  **.NET SDK (Software Development Kit):** Contains everything you need to build and run .NET applications, including the .NET runtime, C# compiler, and .NET CLI tools. Download from [dot.net](https://dotnet.microsoft.com/download).
2.  **IDE (Integrated Development Environment):**
    *   **Visual Studio (Windows/macOS):** Full-featured IDE, highly recommended for .NET development.
    *   **Visual Studio Code (Cross-Platform):** Lightweight and extensible editor with C# extensions (e.g., C# Dev Kit).

    ```bash
    # Verify .NET SDK installation in terminal
    dotnet --version
    ```

### D. Creating a New Project (`dotnet new`)

```bash
# Create a new MVC web application
dotnet new mvc -n MyWebApp
cd MyWebApp

# Create a new Web API project
dotnet new webapi -n MyApi
cd MyApi

# Restore dependencies
dotnet restore

# Run the application
dotnet run
```
Open your browser to `https://localhost:5001/` (default HTTPS port).

### E. Project Structure

```
MyWebApp/
├── Controllers/        # MVC Controllers
├── Models/             # Data models, ViewModels
├── Views/              # Razor Views (.cshtml)
├── wwwroot/            # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── lib/
├── appsettings.json    # Application configuration
├── Program.cs          # Application entry point, configures services and middleware
├── MyWebApp.csproj     # Project file (references, dependencies)
└── README.md
```

### F. Middleware

Middleware components are software components that are assembled into an application pipeline to handle requests and responses.

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // Serves files from wwwroot
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute( // Maps MVC routes
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

### G. Dependency Injection

ASP.NET Core has built-in support for Dependency Injection (DI). Services are registered in `Program.cs` and injected into constructors.

```csharp
// Program.cs
builder.Services.AddTransient<IMyService, MyService>(); // Register a service

// In a Controller
public class HomeController : Controller
{
    private readonly IMyService _myService;

    public HomeController(IMyService myService) // Inject the service
    {
        _myService = myService;
    }
    // ...
}
```

---

## II. Web Development (MVC)

ASP.NET Core MVC provides a pattern for building dynamic web applications.

### A. Controllers (`Controller` class)

Controllers handle incoming requests, interact with models, and prepare data for views. They inherit from `Microsoft.AspNetCore.Mvc.Controller`.

```csharp
// Controllers/HomeController.cs
using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    public IActionResult Index() // Action method
    {
        ViewData["Message"] = "Welcome to ASP.NET Core MVC!";
        return View(); // Renders Views/Home/Index.cshtml
    }

    public IActionResult Privacy()
    {
        return View();
    }
}
```

### B. Actions (`IActionResult`)

Public methods in a controller are considered actions. They typically return an `IActionResult` (or a derived type like `ViewResult`, `JsonResult`, `OkResult`).

### C. Views (Razor Pages, Razor Views)

*   **Razor Pages:** A page-based programming model that makes building web UI easier and more productive. Each page is a self-contained unit with its own `.cshtml` file and an optional `.cshtml.cs` code-behind file.
*   **Razor Views:** Used in the MVC pattern. `.cshtml` files that combine HTML with C# code.

    ```html
    <!-- Views/Home/Index.cshtml -->
    @{
        ViewData["Title"] = "Home Page";
    }

    <div class="text-center">
        <h1 class="display-4">@ViewData["Message"]</h1>
        <p>Learn about <a href="https://docs.microsoft.com/aspnet/core">building Web apps with ASP.NET Core</a>.</p>
    </div>
    ```

### D. Routing (Conventional, Attribute)

Maps incoming HTTP requests to controller actions.

*   **Conventional Routing:** Defined in `Program.cs` (e.g., `"{controller=Home}/{action=Index}/{id?}"`).
*   **Attribute Routing:** Defined directly on controllers and actions using attributes (`[Route]`, `[HttpGet]`).

    ```csharp
    // Controllers/ProductsController.cs
    [Route("products")]
    public class ProductsController : Controller
    {
        [HttpGet("")] // Matches /products
        public IActionResult Index() { /* ... */ return View(); }

        [HttpGet("{id}")] // Matches /products/{id}
        public IActionResult Details(int id) { /* ... */ return View(); }
    }
    ```

### E. Model Binding

Automatically maps data from HTTP requests (form fields, route data, query strings) to action method parameters.

```csharp
// Controllers/ProductsController.cs
public IActionResult Create(Product product) // Product object is bound from form data
{
    if (ModelState.IsValid) { /* ... */ }
    return View(product);
}
```

### F. View Components

Reusable, self-contained pieces of UI logic that can be invoked from views.

---

## III. RESTful APIs

ASP.NET Core is excellent for building RESTful APIs.

### A. API Controllers (`ApiController` attribute)

The `[ApiController]` attribute enables API-specific behaviors like automatic model validation, HTTP 400 responses for validation errors, and binding source inference.

```csharp
// Controllers/Api/ProductsController.cs
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")] // api/products
[ApiController]
public class ProductsController : ControllerBase // Inherit from ControllerBase for API-only
{
    private static List<Product> _products = new List<Product> {
        new Product { Id = 1, Name = "Laptop", Price = 1200.00M }
    };

    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetProducts()
    {
        return _products;
    }

    [HttpGet("{id}")]
    public ActionResult<Product> GetProduct(int id)
    {
        var product = _products.Find(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }
        return product;
    }
}
```

### B. HTTP Verbs (`[HttpGet]`, `[HttpPost]`, etc.)

Attributes to specify the HTTP method an action responds to.

*   `[HttpGet]`
*   `[HttpPost]`
*   `[HttpPut]`
*   `[HttpDelete]`
*   `[HttpPatch]`

### C. Route Parameters (`[FromRoute]`, `[FromQuery]`)

*   `[FromRoute]`: Binds data from route values.
*   `[FromQuery]`: Binds data from the query string.

### D. Request Body (`[FromBody]`)

Binds data from the HTTP request body (e.g., JSON) to a method parameter.

```csharp
[HttpPost]
public ActionResult<Product> PostProduct([FromBody] Product product)
{
    _products.Add(product);
    return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
}
```

### E. Response Handling (`ActionResult<T>`, `Ok()`, `NotFound()`)

*   **`ActionResult<T>`:** A union type that allows an action to return either a specific type `T` or an `IActionResult`.
*   **`Ok()`:** Returns an HTTP 200 OK response.
*   **`NotFound()`:** Returns an HTTP 404 Not Found response.
*   **`CreatedAtAction()`:** Returns an HTTP 201 Created response with a Location header.

---

## IV. Data Access (Entity Framework Core)

Entity Framework Core (EF Core) is a modern object-database mapper for .NET.

### A. Database Configuration (`appsettings.json`)

Connection strings are typically stored in `appsettings.json`.

```json
// appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\mssqllocaldb;Database=MyWebAppDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
  "Logging": { /* ... */ }
}
```

### B. DbContext

The `DbContext` class is the primary class that interacts with the database. It represents a session with the database and allows you to query and save instances of your entities.

```csharp
// Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; } = default!;
    public DbSet<Category> Categories { get; set; } = default!;
}
```

Register `DbContext` in `Program.cs`:

```csharp
// Program.cs
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

### C. Entities (Models)

Entities are plain C# classes that represent tables in your database.

```csharp
// Models/Product.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Product
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }

    public int CategoryId { get; set; }
    public Category? Category { get; set; } // Navigation property
}

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ICollection<Product>? Products { get; set; } // Navigation property
}
```

### D. Migrations (`Add-Migration`, `Update-Database`)

Migrations allow you to evolve your database schema over time.

```bash
# In Package Manager Console (Visual Studio)
Add-Migration InitialCreate
Update-Database

# Using .NET CLI
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### E. Basic CRUD Operations

```csharp
// In a service or controller
public class ProductService
{
    private readonly ApplicationDbContext _context;

    public ProductService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> GetAllProductsAsync()
    {
        return await _context.Products.Include(p => p.Category).ToListAsync();
    }

    public async Task<Product?> GetProductByIdAsync(int id)
    {
        return await _context.Products.FindAsync(id);
    }

    public async Task AddProductAsync(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateProductAsync(Product product)
    {
        _context.Entry(product).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteProductAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product != null)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }
    }
}
```

### F. Relationships (One-to-One, One-to-Many, Many-to-Many)

Defined using navigation properties and fluent API in `DbContext.OnModelCreating()`.

### G. LINQ Queries

Use LINQ (Language Integrated Query) to query your database.

```csharp
var expensiveProducts = await _context.Products
    .Where(p => p.Price > 1000)
    .OrderBy(p => p.Name)
    .ToListAsync();
```

---

## V. Configuration

ASP.NET Core uses a flexible configuration system.

### A. `appsettings.json`

The primary configuration file.

```json
// appsettings.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "MyCustomSetting": {
    "Key1": "Value1",
    "Key2": 123
  }
}
```

### B. Environment-Specific Configuration

*   `appsettings.Development.json`
*   `appsettings.Production.json`
*   Loaded based on the `ASPNETCORE_ENVIRONMENT` environment variable.

### C. Options Pattern

A way to access configuration settings as strongly typed objects.

```csharp
// Models/MyOptions.cs
public class MyOptions
{
    public string Key1 { get; set; } = string.Empty;
    public int Key2 { get; set; }
}

// Program.cs
builder.Services.Configure<MyOptions>(builder.Configuration.GetSection("MyCustomSetting"));

// In a service
public class MyService
{
    private readonly MyOptions _options;
    public MyService(IOptions<MyOptions> options)
    {
        _options = options.Value;
        Console.WriteLine($"Key1: {_options.Key1}, Key2: {_options.Key2}");
    }
}
```

### D. Custom Configuration Providers

You can extend the configuration system to load settings from other sources (e.g., environment variables, Azure Key Vault).

---

## VI. Authentication and Authorization

ASP.NET Core provides a robust security system.

### A. ASP.NET Core Identity

A membership system that adds user login functionality to ASP.NET Core applications.

### B. Cookie Authentication

Common for web applications, where a cookie is issued after successful login.

### C. JWT Bearer Authentication

Common for RESTful APIs, where a JSON Web Token (JWT) is issued.

```csharp
// Program.cs (simplified JWT setup)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });
```

### D. Authorization (Roles, Policies)

*   **Roles:** Assign users to roles (e.g., "Admin", "User").
*   **Policies:** More granular authorization rules.

    ```csharp
    // Controllers/AdminController.cs
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize(Roles = "Admin")] // Only users in "Admin" role can access
    [Route("admin")]
    public class AdminController : Controller
    {
        [HttpGet("dashboard")]
        public IActionResult Dashboard()
        {
            return View();
        }
    }
    ```

---

## VII. Testing

ASP.NET Core provides excellent support for testing.

### A. Unit Testing (xUnit, NUnit, MSTest)

*   **xUnit:** A popular, community-focused unit testing tool.
*   **NUnit:** A widely used unit-testing framework for .NET.
*   **MSTest:** Microsoft's unit testing framework.

```csharp
// Tests/CalculatorTests.cs
using Xunit;

public class Calculator
{
    public int Add(int a, int b) => a + b;
}

public class CalculatorTests
{
    [Fact]
    public void Add_TwoNumbers_ReturnsSum()
    {
        // Arrange
        var calculator = new Calculator();
        // Act
        var result = calculator.Add(2, 3);
        // Assert
        Assert.Equal(5, result);
    }
}
```

### B. Integration Testing (`WebApplicationFactory`)

Tests that evaluate how multiple components of an application interact.

```csharp
// Tests/IntegrationTests.cs
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;
using System.Threading.Tasks;

public class BasicTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public BasicTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Theory]
    [InlineData("/")]
    [InlineData("/Home/Privacy")]
    public async Task Get_EndpointsReturnSuccessAndCorrectContentType(string url)
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync(url);

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        Assert.Equal("text/html; charset=utf-8", response.Content.Headers.ContentType?.ToString());
    }
}
```

### C. Mocking (Moq)

Moq is a popular mocking library for .NET.

---

## VIII. Advanced Topics

### A. Logging (`ILogger`)

ASP.NET Core has a robust logging system.

```csharp
using Microsoft.Extensions.Logging;

public class MyService
{
    private readonly ILogger<MyService> _logger;

    public MyService(ILogger<MyService> logger)
    {
        _logger = logger;
    }

    public void DoSomething()
    {
        _logger.LogInformation("Doing something important.");
    }
}
```

### B. Caching (In-Memory, Distributed)

*   **In-Memory Caching:** `IMemoryCache`.
*   **Distributed Caching:** `IDistributedCache` (e.g., Redis, SQL Server).

### C. Background Tasks (Hosted Services)

Implement long-running background tasks using `IHostedService`.

### D. SignalR (Real-time Communication)

A library for adding real-time web functionality to applications.

### E. Health Checks

Provides endpoints for monitoring the health of your application.

### F. Microservices (gRPC, Dapr)

ASP.NET Core is well-suited for building microservices, often integrating with technologies like gRPC for high-performance inter-service communication or Dapr for building portable, event-driven microservices.

---

## IX. Deployment

### A. Publishing Applications (`dotnet publish`)

The `dotnet publish` command compiles the application and its dependencies into a folder for deployment.

```bash
dotnet publish -c Release -o ./publish
```

### B. IIS, Nginx, Apache

ASP.NET Core applications run as self-contained processes. A reverse proxy (IIS, Nginx, Apache) is typically used to forward requests to the .NET Core application.

### C. Dockerization

Containerize your ASP.NET Core application using Docker for consistent environments across development, testing, and production.

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["MyWebApp.csproj", "MyWebApp/"]
RUN dotnet restore "MyWebApp/MyWebApp.csproj"
COPY . .
WORKDIR "/src/MyWebApp"
RUN dotnet build "MyWebApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyWebApp.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyWebApp.dll"]
```

### D. Cloud Deployment (Azure, AWS, GCP)

ASP.NET Core applications can be easily deployed to various cloud platforms.

*   **Azure:** App Service, Azure Kubernetes Service, Azure Container Apps.
*   **AWS:** Elastic Beanstalk, EC2, ECS, Lambda.
*   **GCP:** App Engine, Google Kubernetes Engine.
