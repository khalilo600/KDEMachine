# FastAPI Guide: Comprehensive Learning Outline

This guide provides a structured overview of FastAPI, a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints. It covers core concepts, path operations, request features, dependency injection, security, data modeling with Pydantic, advanced topics, and deployment best practices.

---

## I. Getting Started and Core Concepts

### A. What is FastAPI?

FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints. It is built on Starlette (for the web parts) and Pydantic (for data parts).

*   **Fast:** Very high performance, comparable to Node.js and Go.
*   **Python 3.7+:** Leverages modern Python features like type hints.
*   **Asynchronous:** Built-in support for `async` and `await`.
*   **Automatic Docs:** Generates interactive API documentation (Swagger UI, ReDoc) automatically.

### B. Why Use FastAPI?

*   **High Performance:** Achieves excellent speed due to Starlette and Pydantic.
*   **Developer Productivity:** Reduces development time by 20% to 40% due to type hints and automatic validation.
*   **Robustness:** Type hints enable great editor support, autocompletion, and error checking.
*   **Data Validation:** Automatic data validation and serialization using Pydantic.
*   **Automatic Interactive API Docs:** Saves time on documentation.
*   **Modern Python:** Embraces `async`/`await` for concurrent operations.
*   **Security:** Built-in security features with OAuth2, JWT, and API Keys.

### C. Installation and Setup (Python, pip, virtual environments)

1.  **Python:** Ensure you have Python 3.7+ installed.
2.  **Virtual Environments:** Recommended to isolate project dependencies.

    ```bash
    python3 -m venv venv
    source venv/bin/activate # On macOS/Linux
    # venv\Scripts\activate   # On Windows (Command Prompt)
    ```

3.  **Install FastAPI and Uvicorn:**

    ```bash
    pip install fastapi uvicorn[standard]
    ```

### D. "Hello World!" Application

```python
# main.py
from fastapi import FastAPI

app = FastAPI() # Create a FastAPI application instance

@app.get("/") # Define a path operation for GET requests to the root URL
async def read_root():
    return {"message": "Hello World"} # Return a JSON response
```

### E. Running the Application (Uvicorn)

Uvicorn is an ASGI (Asynchronous Server Gateway Interface) server that runs FastAPI applications.

```bash
uvicorn main:app --reload
```
*   `main`: The Python file (`main.py`).
*   `app`: The FastAPI application object inside `main.py`.
*   `--reload`: Enables auto-reloading on code changes (for development).

Open your browser to `http://127.0.0.1:8000/`. You can also visit `http://127.0.0.1:8000/docs` for interactive API documentation (Swagger UI) or `http://127.0.0.1:8000/redoc` for ReDoc documentation.

### F. Path Operations

FastAPI uses "path operation decorators" (e.g., `@app.get()`, `@app.post()`) to define how your API handles specific HTTP methods and paths.

### G. Type Hints and Data Validation

FastAPI leverages Python type hints for:
*   **Data validation:** Ensures incoming data matches the expected types.
*   **Data serialization:** Converts Python objects to JSON.
*   **Automatic documentation:** Generates API schemas.

---

## II. Path Operations

### A. Path Parameters

Extract values directly from the URL path.

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int): # Type hint for automatic validation
    return {"item_id": item_id}
```

### B. Query Parameters

Extract values from the URL query string (e.g., `?name=Alice`).

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/users/")
async def read_users(skip: int = 0, limit: int = 10): # Default values and type hints
    return {"skip": skip, "limit": limit}
```

### C. Request Body (Pydantic Models)

Receive data in the request body (e.g., JSON payload) using Pydantic models.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel): # Define a Pydantic model
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

@app.post("/items/")
async def create_item(item: Item): # Item object is automatically validated and parsed
    item_dict = item.dict()
    if item.tax:
        price_with_tax = item.price + item.tax
        item_dict.update({"price_with_tax": price_with_tax})
    return item_dict
```

### D. Multiple Parameters (Path, Query, Body)

You can combine path, query, and request body parameters in a single path operation.

```python
from fastapi import FastAPI, Query
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

@app.put("/items/{item_id}")
async def update_item(
    item_id: int,
    item: Item,
    q: str | None = Query(default=None, max_length=50) # Query parameter with validation
):
    results = {"item_id": item_id, **item.dict()}
    if q:
        results.update({"q": q})
    return results
```

### E. Status Codes

Specify the HTTP status code for the response.

```python
from fastapi import FastAPI, status

app = FastAPI()

@app.post("/items/", status_code=status.HTTP_201_CREATED)
async def create_item(item: Item):
    return item
```

### F. Response Model

Define the exact structure of the response data using `response_model`. This ensures data is filtered and validated before being sent.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ItemIn(BaseModel): # Input model
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

class ItemOut(BaseModel): # Output model (e.g., without tax)
    name: str
    price: float

@app.post("/items/", response_model=ItemOut) # Ensures response matches ItemOut
async def create_item(item: ItemIn):
    return item # Only name and price will be returned
```

---

## III. Request Features

### A. Headers

Access request headers using `fastapi.Header`.

```python
from fastapi import FastAPI, Header

app = FastAPI()

@app.get("/headers/")
async def read_headers(user_agent: str | None = Header(default=None)):
    return {"User-Agent": user_agent}
```

### B. Cookies

Access request cookies using `fastapi.Cookie`.

```python
from fastapi import FastAPI, Cookie

app = FastAPI()

@app.get("/cookies/")
async def read_cookies(ads_id: str | None = Cookie(default=None)):
    return {"ads_id": ads_id}
```

### C. Forms

Receive form data using `fastapi.Form`.

```python
from fastapi import FastAPI, Form

app = FastAPI()

@app.post("/login/")
async def login(username: str = Form(), password: str = Form()):
    return {"username": username, "password": password}
```

### D. File Uploads

Handle file uploads using `fastapi.UploadFile`.

```python
from fastapi import FastAPI, UploadFile, File

app = FastAPI()

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    return {"filename": file.filename, "content_type": file.content_type}

@app.post("/uploadfiles/")
async def create_upload_files(files: list[UploadFile]):
    return [{"filename": file.filename, "content_type": file.content_type} for file in files]
```

### E. Request Directly

Access the raw `Request` object directly.

```python
from fastapi import FastAPI, Request

app = FastAPI()

@app.get("/request_info")
async def get_request_info(request: Request):
    return {"client_host": request.client.host, "method": request.method}
```

---

## IV. Dependencies

FastAPI's Dependency Injection system is powerful and easy to use.

### A. Dependency Injection System

Functions can declare dependencies that FastAPI will resolve and inject.

```python
from fastapi import FastAPI, Depends

app = FastAPI()

async def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}

@app.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    return commons
```

### B. Classes as Dependencies

Classes can also be used as dependencies.

```python
from fastapi import FastAPI, Depends

app = FastAPI()

class CommonQueryParams:
    def __init__(self, q: str | None = None, skip: int = 0, limit: int = 100):
        self.q = q
        self.skip = skip
        self.limit = limit

@app.get("/items_class/")
async def read_items_class(commons: CommonQueryParams = Depends()):
    return commons
```

### C. Sub-dependencies

Dependencies can have their own dependencies.

### D. Global Dependencies

Add dependencies that apply to all path operations in the application.

```python
from fastapi import FastAPI, Depends

async def verify_token(token: str):
    if token != "secret-token":
        raise HTTPException(status_code=400, detail="Invalid token")
    return token

app = FastAPI(dependencies=[Depends(verify_token)])

@app.get("/protected-route")
async def protected_route():
    return {"message": "This is a protected route"}
```

### E. Dependencies with `yield` (Context Managers)

Dependencies can use `yield` to define setup and teardown logic, similar to context managers.

```python
from fastapi import FastAPI, Depends
from contextlib import contextmanager

app = FastAPI()

@contextmanager
def get_db_session():
    db = "fake_db_session"
    try:
        yield db
    finally:
        print("Closing db session")

def get_db():
    with get_db_session() as db:
        yield db

@app.get("/db-item")
async def get_db_item(db_session: str = Depends(get_db)):
    return {"db_session": db_session, "item": "item from db"}
```

---

## V. Security

FastAPI provides tools for implementing various security schemes.

### A. OAuth2 with Password (and Bearer Token)

```python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
    return {"token": token}
```

### B. JWT (JSON Web Tokens)

Often used with OAuth2 for token-based authentication.

### C. API Keys

Implement API key authentication using `fastapi.security.APIKeyHeader` or `APIKeyQuery`.

### D. Permissions (Scopes)

Define different levels of access for authenticated users.

---

## VI. Data Modeling and Validation (Pydantic)

FastAPI uses Pydantic for data validation, serialization, and documentation.

### A. Defining Pydantic Models

(See Section II.C for example)

### B. Field Validation (min_length, max_length, regex)

Pydantic allows you to add validation constraints to fields.

```python
from pydantic import BaseModel, Field

class User(BaseModel):
    name: str = Field(min_length=3, max_length=50)
    email: str = Field(regex="^.+@.+\..+$")
    age: int = Field(gt=0, lt=150) # Greater than 0, less than 150
```

### C. Nested Models

Pydantic models can be nested within each other.

```python
from pydantic import BaseModel

class Address(BaseModel):
    street: str
    city: str
    zip_code: str

class UserProfile(BaseModel):
    name: str
    address: Address # Nested model
```

### D. Optional Fields

Use `Optional` from `typing` or `| None` (Python 3.10+) to mark fields as optional.

```python
from typing import Optional # For Python < 3.10
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: Optional[str] = None # Optional field
    # Or: description: str | None = None (Python 3.10+)
```

### E. Default Values

Provide default values for fields.

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = False # Default value
```

---

## VII. Advanced Topics

### A. Routers (`APIRouter`)

Organize your API into multiple files using `APIRouter`.

```python
# routers/items.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/items/")
async def read_items():
    return [{"name": "Item Foo"}]

# main.py
from fastapi import FastAPI
from routers import items

app = FastAPI()
app.include_router(items.router, prefix="/api/v1")
```

### B. Middleware

Functions that run before and/or after every request.

```python
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import time

app = FastAPI()

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

### C. Background Tasks

Run tasks in the background after returning a response.

```python
from fastapi import FastAPI, BackgroundTasks

app = FastAPI()

def write_log(message: str):
    with open("log.txt", "a") as log_file:
        log_file.write(message + "\n")

@app.post("/send-notification/{email}")
async def send_notification(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(write_log, f"notification for {email}")
    return {"message": "Notification sent in the background"}
```

### D. Static Files

Serve static files (CSS, JavaScript, images).

```python
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
```

### E. Templates (Jinja2)

Serve HTML templates using Jinja2.

```python
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/items/{id}", response_class=HTMLResponse)
async def read_item(request: Request, id: str):
    return templates.TemplateResponse("item.html", {"request": request, "id": id})
```

### F. WebSockets

Built-in support for WebSockets.

```python
from fastapi import FastAPI, WebSocket

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")
```

### G. Testing (TestClient)

FastAPI provides a `TestClient` for easy testing.

```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

def test_read_item():
    response = client.get("/items/1")
    assert response.status_code == 200
    assert response.json() == {"item_id": 1}
```

---

## VIII. Deployment

### A. Production Servers (Uvicorn, Gunicorn)

*   **Uvicorn:** The ASGI server that runs FastAPI.
*   **Gunicorn:** A robust HTTP server that can manage Uvicorn worker processes.

    ```bash
    gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
    ```

### B. Dockerization

Containerize your FastAPI application using Docker for consistent environments.

```dockerfile
# Dockerfile
FROM python:3.10-slim-buster
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
```

### C. Cloud Deployment (AWS, Azure, GCP)

FastAPI applications can be deployed to various cloud platforms.

*   **AWS:** EC2, ECS, Lambda (with Mangum).
*   **Azure:** App Service, Azure Kubernetes Service.
*   **GCP:** App Engine, Google Kubernetes Engine.

