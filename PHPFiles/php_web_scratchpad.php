<?php

/**
 * PHP Web Development Scratchpad
 *
 * This file demonstrates key concepts for building web applications with PHP,
 * including HTML forms, processing form data, interacting with a MySQL database
 * using MySQLi, and managing user state with sessions and cookies. It also covers
 * file handling, error logging, date/time manipulation, basic API interaction,
 * security considerations, and regular expressions.
 *
 * IMPORTANT: To run this code, you will need a local web server (e.g., Apache, Nginx)
 * configured with PHP, and a MySQL/MariaDB database. Ensure your web server's document
 * root points to the directory containing this file, or a subdirectory.
 *
 * Database Setup (Example CLI commands):
 * 1. Connect to MySQL: `mysql -u root -p`
 * 2. Create a database: `CREATE DATABASE php_demo;`
 * 3. Create a user (optional but recommended): `CREATE USER 'phpuser'@'localhost' IDENTIFIED BY 'password';`
 * 4. Grant privileges: `GRANT ALL PRIVILEGES ON php_demo.* TO 'phpuser'@'localhost';`
 * 5. Flush privileges: `FLUSH PRIVILEGES;`
 * 6. Use the database: `USE php_demo;`
 * 7. Create a table for users:
 *    `CREATE TABLE users (
 *       id INT AUTO_INCREMENT PRIMARY KEY,
 *       username VARCHAR(255) NOT NULL UNIQUE,
 *       email VARCHAR(255) NOT NULL,
 *       password VARCHAR(255) NOT NULL
 *    );
 * `
 *
 * After setting up, access this file through your web browser (e.g., http://localhost/php_web_scratchpad.php).
 */

// --- Configuration (Update with your database credentials) ---
define("DB_SERVER", "localhost");
define("DB_USERNAME", "phpuser"); // Replace with your DB username
define("DB_PASSWORD", "password"); // Replace with your DB password
define("DB_NAME", "php_demo");   // Replace with your DB name

// Start session at the very beginning for session management
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

echo "<!DOCTYPE html>";
echo "<html lang='en'>";
echo "<head>";
echo "    <meta charset='UTF-8'>";
echo "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>";
echo "    <title>PHP Web Scratchpad</title>";
echo "    <style>";
echo "        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; background-color: #f4f4f4; color: #333; }";
echo "        h1, h2, h3 { color: #0056b3; }";
echo "        form { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,.1); margin-bottom: 20px; }";
echo "        input[type='text'], input[type='email'], input[type='password'], textarea { width: calc(100% - 22px); padding: 10px; margin: 8px 0; border: 1px solid #ddd; border-radius: 4px; }";
echo "        input[type='submit'] { background-color: #007bff; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }";
echo "        input[type='submit']:hover { background-color: #0056b3; }";
echo "        pre { background: #eee; padding: 10px; border-radius: 4px; overflow-x: auto; }";
echo "        table { width: 100%; border-collapse: collapse; margin-top: 15px; }";
echo "        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }";
echo "        th { background-color: #f2f2f2; }";
echo "        .section { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,.1); margin-top: 30px; }";
echo "        .error { color: red; font-weight: bold; }";
echo "    </style>";
echo "</head>";
echo "<body>";

echo "<h1>PHP Web Development Scratchpad</h1>";

// --- Section 1: HTML Form Example (GET Method) ---
// This section displays an HTML form and processes its submission using GET.

echo "<div class='section'>";
echo "<h2>Section 1: HTML Form (GET Method)</h2>";

// Display the form
echo '<form method="GET" action="">";
echo '  <label for="name_get">Name:</label><br>';
echo '  <input type="text" id="name_get" name="name_get" value="' . (isset($_GET['name_get']) ? htmlspecialchars($_GET['name_get']) : '') . '">';<br><br>';
echo '  <label for="email_get">Email:</label><br>';
echo '  <input type="email" id="email_get" name="email_get" value="' . (isset($_GET['email_get']) ? htmlspecialchars($_GET['email_get']) : '') . '">';<br><br>';
echo '  <input type="submit" value="Submit with GET">';
echo '</form>';

// Process form submission if data is present in $_GET
if (isset($_GET['name_get']) || isset($_GET['email_get'])) { // Check if *any* GET data related to form is present
    $nameGet = isset($_GET['name_get']) ? htmlspecialchars($_GET['name_get']) : 'N/A'; // Sanitize and check
    $emailGet = isset($_GET['email_get']) ? filter_var($_GET['email_get'], FILTER_SANITIZE_EMAIL) : 'N/A'; // Sanitize email

    echo "<h3>GET Form Submission Result:</h3>";
    echo "<p>Hello, <strong>" . $nameGet . "</strong>! Your email is <strong>" . $emailGet . "</strong>.</p>";
    echo '<p>Data sent via URL parameters. Check your browser\'s address bar!</p>';
} else {
    echo "<p>Submit the form above using GET method.</p>";
}
echo "</div>";


// --- Section 2: HTML Form Example (POST Method) ---
// This section displays an HTML form and processes its submission using POST.

echo "<div class='section'>";
echo "<h2>Section 2: HTML Form (POST Method)</h2>";

// Display the form
echo '<form method="POST" action="">";
echo '  <label for="name_post">Name:</label><br>';
echo '  <input type="text" id="name_post" name="name_post" value="' . (isset($_POST['name_post']) ? htmlspecialchars($_POST['name_post']) : '') . '">';<br><br>';
echo '  <label for="message_post">Message:</label><br>';
echo '  <textarea id="message_post" name="message_post">' . (isset($_POST['message_post']) ? htmlspecialchars($_POST['message_post']) : '') . '</textarea><br><br>';
echo '  <input type="submit" value="Submit with POST">';
echo '</form>';

// Process form submission if data is present in $_POST
if (isset($_POST['name_post']) || isset($_POST['message_post'])) { // Check if *any* POST data related to form is present
    $namePost = isset($_POST['name_post']) ? htmlspecialchars($_POST['name_post']) : 'N/A'; // Sanitize input
    $messagePost = isset($_POST['message_post']) ? htmlspecialchars($_POST['message_post']) : 'N/A'; // Sanitize input

    echo "<h3>POST Form Submission Result:</h3>";
    echo "<p>Hello, <strong>" . $namePost . "</strong>! You sent the message: \"<strong>" . $messagePost . "</strong>\"</p>";
    echo '<p>Data sent in the HTTP request body (not visible in URL).</p>';
} else {
    echo "<p>Submit the form above using POST method.</p>";
}
echo "</div>";


// --- Section 3: Database Interaction (MySQLi: CRUD Operations) ---
// This section demonstrates connecting to a MySQL database and performing
// Create, Read, Update, and Delete operations using MySQLi prepared statements
// to prevent SQL injection.

echo "<div class='section'>";
echo "<h2>Section 3: Database Interaction (MySQLi)</h2>";

// Attempt to connect to MySQL database
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if ($conn->connect_error) {
    echo "<p class='error'>ERROR: Could not connect to database. " . $conn->connect_error . "</p>";
} else {
    echo "<p>Successfully connected to the database.</p>";

    // --- CREATE (Insert Data) ---
    echo "<h3>C: Create (Insert Data)</h3>";
    // Using a random number to create unique usernames/emails for repeated execution
    $usernameToInsert = "testuser_" . rand(10000, 99999);
    $emailToInsert = "test_" . rand(10000, 99999) . "@example.com";
    // Always hash passwords before storing them!
    $passwordToInsert = password_hash("securepass123", PASSWORD_DEFAULT);

    // Prepare an insert statement using placeholders (?)
    $sqlInsert = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    if ($stmt = $conn->prepare($sqlInsert)) {
        // Bind variables to the prepared statement as parameters
        // "sss" indicates that all three parameters are strings
        $stmt->bind_param("sss", $usernameToInsert, $emailToInsert, $passwordToInsert);

        // Attempt to execute the prepared statement
        if ($stmt->execute()) {
            echo "<p>New record created successfully. Username: <strong>" . $usernameToInsert . "</strong></p>";
        } else {
            // Check for duplicate entry error specifically (error code 1062 for MySQL)
            if ($stmt->errno == 1062) {
                echo "<p class='error'>ERROR: Duplicate username or email. Please refresh to try again with new random data.</p>";
            } else {
                echo "<p class='error'>ERROR: Could not execute insert query: " . $stmt->error . "</p>";
            }
        }
        $stmt->close(); // Close the statement
    } else {
        echo "<p class='error'>ERROR: Could not prepare insert query: " . $conn->error . "</p>";
    }

    // --- READ (Select Data) ---
    echo "<h3>R: Read (Select Data)</h3>";
    $sqlSelect = "SELECT id, username, email FROM users ORDER BY id DESC LIMIT 5"; // Get last 5 users
    if ($result = $conn->query($sqlSelect)) {
        if ($result->num_rows > 0) {
            echo "<table>";
            echo "<thead><tr><th>ID</th><th>Username</th><th>Email</th></tr></thead>";
            echo "<tbody>";
            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row["id"] . "</td>";
                echo "<td>" . htmlspecialchars($row["username"]) . "</td>";
                echo "<td>" . htmlspecialchars($row["email"]) . "</td>";
                echo "</tr>";
            }
            echo "</tbody>";
            echo "</table>";
        } else {
            echo "<p>No records found in the 'users' table.</p>";
        }
        $result->free(); // Free result set
    } else {
        echo "<p class='error'>ERROR: Could not execute select query: " . $conn->error . "</p>";
    }

    // --- UPDATE (Update Data) ---
    echo "<h3>U: Update (Data)</h3>";
    // Get the ID of the last inserted user to update it
    $latestUserId = null;
    $sqlGetLatestId = "SELECT id FROM users ORDER BY id DESC LIMIT 1";
    if ($result = $conn->query($sqlGetLatestId)) {
        if ($row = $result->fetch_assoc()) {
            $latestUserId = $row['id'];
        }
        $result->free();
    }

    if ($latestUserId) {
        $newEmail = "updated_" . rand(1000, 9999) . "@example.com";
        $sqlUpdate = "UPDATE users SET email = ? WHERE id = ?";

        if ($stmt = $conn->prepare($sqlUpdate)) {
            // "si" indicates string and integer parameters
            $stmt->bind_param("si", $newEmail, $latestUserId);
            if ($stmt->execute()) {
                if ($stmt->affected_rows > 0) {
                    echo "<p>Record with ID <strong>" . $latestUserId . "</strong> updated successfully. New email: <strong>" . $newEmail . "</strong></p>";
                } else {
                    echo "<p>No record found or no changes made for username id <strong>" . $latestUserId . "</strong>.</p>";
                }
            } else {
                echo "<p class='error'>ERROR: Could not execute update query: " . $stmt->error . "</p>";
            }
            $stmt->close();
        } else {
            echo "<p class='error'>ERROR: Could not prepare update query: " . $conn->error . "</p>";
        }
    } else {
        echo "<p>No user found to update. Insert some data first.</p>";
    }

    // --- DELETE (Delete Data) ---
    echo "<h3>D: Delete (Data)</h3>";
    // Option to delete the record just created/updated or another one.
    // Let's delete the very first record (lowest ID) for demonstration so we don't clear everything right away.
    $firstUserIdToDelete = null;
    $sqlGetFirstId = "SELECT id FROM users ORDER BY id ASC LIMIT 1";
    if ($result = $conn->query($sqlGetFirstId)) {
        if ($row = $result->fetch_assoc()) {
            $firstUserIdToDelete = $row['id'];
        }
        $result->free();
    }

    if ($firstUserIdToDelete) {
        $sqlDelete = "DELETE FROM users WHERE id = ?";
        if ($stmt = $conn->prepare($sqlDelete)) {
            $stmt->bind_param("i", $firstUserIdToDelete); // "i" for integer parameter
            if ($stmt->execute()) {
                if ($stmt->affected_rows > 0) {
                    echo "<p>Record with ID <strong>" . $firstUserIdToDelete . "</strong> deleted successfully.</p>";
                } else {
                    echo "<p>No record found for deletion with ID <strong>" . $firstUserIdToDelete . "</strong>.</p>";
                }
            } else {
                echo "<p class='error'>ERROR: Could not execute delete query: " . $stmt->error . "</p>";
            }
            $stmt->close();
        } else {
            echo "<p class='error'>ERROR: Could not prepare delete query: " . $conn->error . "</p>";
        }
    } else {
        echo "<p>No user found to delete. Insert some data first.</p>";
    }

    $conn->close(); // Close the database connection
}
echo "</div>";


// --- Section 4: Session Management ---
// Sessions allow you to store user information on the server for the duration
// of their visit (or until the session expires/is destroyed).

echo "<div class='section'>";
echo "<h2>Section 4: Session Management</h2>";

echo "<p>Session Status: " . (session_status() == PHP_SESSION_ACTIVE ? 'Active' : 'Inactive') . "</p>";

// Set a session variable
$_SESSION['favcolor'] = 'green';
$_SESSION['favanimal'] = 'dog';
$_SESSION['username'] = 'sessionuser';

echo "<p>Session variables are set (favcolor, favanimal, username).</p>";

// Retrieve session variables
if (isset($_SESSION['favcolor'])) {
    echo "<p>Favorite Color (from session): <strong>" . htmlspecialchars($_SESSION['favcolor']) . "</strong></p>";
}

// Modify a session variable
$_SESSION['favcolor'] = 'blue';
echo "<p>Favorite Color (updated in session): <strong>" . htmlspecialchars($_SESSION['favcolor']) . "</strong></p>";

// Display all session variables for debugging (NEVER do this in production!)
echo "<p>All session variables:</p><pre>";
print_r($_SESSION);
echo "</pre>";

// Unset a specific session variable
if (isset($_SESSION['favanimal'])) {
    unset($_SESSION['favanimal']);
    echo "<p>'favanimal' session variable unset.</p>";
}

// Destroy all session data (uncomment to test logout logic)
// echo "<form method='POST' action=''><input type='submit' name='destroy_session' value='Destroy Session'></form>";
// if (isset($_POST['destroy_session'])) {
//     session_unset();     // Unset all session variables
//     session_destroy();   // Destroy the session
//     echo "<p>Session destroyed. Refresh the page to see changes.</p>";
// }
echo "</div>";


// --- Section 5: Cookie Management ---
// Cookies are small files stored on the user's computer by the web server.
// They are typically used to remember user preferences or track user activity.

echo "<div class='section'>";
echo "<h2>Section 5: Cookie Management</h2>";

$cookieName = "user_preference";
$cookieValue = "dark_mode_enabled";

// Set a cookie (name, value, expiration time, path, domain, secure, httponly)
// This cookie will expire in 1 hour (3600 seconds)
if (!isset($_COOKIE[$cookieName]) || $_COOKIE[$cookieName] !== $cookieValue) {
    setcookie($cookieName, $cookieValue, time() + (3600), "/");
    echo "<p>Cookie '<strong>" . $cookieName . "</strong>' set to '<strong>" . $cookieValue . "</strong>'. You might need to refresh the page to see it.</p>";
}

// Retrieve a cookie
if (isset($_COOKIE[$cookieName])) {
    echo "<p>Cookie '<strong>" . htmlspecialchars($cookieName) . "</strong>' value: <strong>" . htmlspecialchars($_COOKIE[$cookieName]) . "</strong></p>";
} else {
    echo "<p>Cookie '<strong>" . htmlspecialchars($cookieName) . "</strong>' not found or expired.</p>";
}

// Delete a cookie (uncomment to test)
// echo "<form method='POST' action=''><input type='submit' name='delete_cookie' value='Delete Cookie'></form>";
// if (isset($_POST['delete_cookie'])) {
//     setcookie($cookieName, "", time() - 3600, "/"); // Set expiration to past
//     echo "<p>Cookie '<strong>" . $cookieName . "</strong>' deleted. Refresh the page to see changes.</p>";
// }
echo "</div>";


// --- Section 6: File Handling ---
// Demonstrates reading from and writing to files.

echo "<div class='section'>";
echo "<h2>Section 6: File Handling</h2>";

$fileName = "example_log.txt";
$fileContent = "This is a log entry at " . date("Y-m-d H:i:s") . "\n";

// Writing to a file (appending content)
// FILE_APPEND flag ensures content is added to the end of the file
// LOCK_EX flag prevents anyone else from writing to the file at the same time
if (file_put_contents($fileName, $fileContent, FILE_APPEND | LOCK_EX) !== false) {
    echo "<p>Appended to '<strong>" . htmlspecialchars($fileName) . "</strong>'.</p>";
} else {
    echo "<p class='error'>ERROR: Could not write to file '<strong>" . htmlspecialchars($fileName) . "</strong>'. Check permissions.</p>";
}

// Reading from a file
if (file_exists($fileName)) {
    $readContent = file_get_contents($fileName);
    echo "<h3>Content of '<strong>" . htmlspecialchars($fileName) . "</strong>':</h3>";
    echo "<pre>" . htmlspecialchars($readContent) . "</pre>";
} else {
    echo "<p class='error'>File '<strong>" . htmlspecialchars($fileName) . "</strong>' does not exist.</p>";
}

// Basic example of a temporary file for uploads (conceptual)
echo "<h3>File Upload Example (Conceptual)</h3>";
echo "<p>A real file upload requires a multipart/form-data HTML form and handling of <code>$_FILES</code> array.</p>";
echo "<p>Example HTML for upload:</p>";
echo "<pre><form action=\"upload.php\" method=\"post\" enctype=\"multipart/form-data">
  Select image to upload:
  <input type=\"file\" name=\"fileToUpload\" id=\"fileToUpload">
  <input type=\"submit\" value=\"Upload Image\" name=\"submit">
</form></pre>";

echo "<p>Example PHP for upload (<code>upload.php</code>):</p>";
echo "<pre><?php
if (isset($_POST["submit"])) {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    // Check if image file is a actual image or fake image
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
    // ... more checks and move_uploaded_file()
}?></pre>";

echo "</div>";


// --- Section 7: Error Logging and Debugging ---
// How to configure error reporting and log errors.

echo "<div class='section'>";
echo "<h2>Section 7: Error Logging and Debugging</h2>";

// Configure error reporting (for production, typically E_ALL & ~E_NOTICE & ~E_DEPRECATED)
error_reporting(E_ALL); // Report all PHP errors
ini_set('display_errors', 1); // Display errors in the browser (convenient for dev, BAD for prod)
ini_set('log_errors', 1);   // Log errors to a file
ini_set('error_log', 'php_errors.log'); // Specify log file

echo "<p>Error reporting configured to log errors to 'php_errors.log'.</p>";

// Trigger a notice (e.g., accessing an undefined variable)
echo "<h3>Triggering a Notice:</h3>";
@$undefinedVar; // The @ suppresses the display, but it still logs if display_errors is 0 and log_errors is 1
echo "<p>An attempt to access an undefined variable was made. Check 'php_errors.log'.</p>";

// Trigger a warning (e.g., division by zero)
echo "<h3>Triggering a Warning:</h3>";
$divisor = 0;
if ($divisor != 0) {
    echo 10 / $divisor;
} else {
    echo "<p>Attempted division by zero was avoided. A warning *would* be triggered if not handled.</p>";
}


// Custom Error Handler Example (Conceptual)
echo "<h3>Custom Error Handler (Conceptual)</h3>";
echo "<p>A custom error handler allows you to define how PHP errors are processed, e.g., logging to a database, notifying an admin.</p>";
echo "<pre><?php
function myErrorHandler($errno, $errstr, $errfile, $errline) {
    // Log error to custom location or send email
    echo "<div class='error'>[Custom Error] $errstr in $errfile on line $errline</div>";
    return true; // Don't execute PHP's internal error handler
}

// set_error_handler("myErrorHandler");

// Trigger a custom error to see handler in action
// trigger_error("A custom error message!");
?></pre>";

echo "</div>";


// --- Section 8: Date and Time Manipulation ---
// Working with dates and times in PHP.

echo "<div class='section'>";
echo "<h2>Section 8: Date and Time Manipulation</h2>";

// Current date and time
echo "<h3>Current Date and Time:</h3>";
echo "<p>Current date and time: <strong>" . date("Y-m-d H:i:s") . "</strong></p>";
echo "<p>Current Unix Timestamp: <strong>" . time() . "</strong></p>";

// Formatting dates
echo "<h3>Formatting Dates:</h3>";
$timestamp = strtotime("next Monday"); // Get timestamp for next Monday
echo "<p>Next Monday (Y-m-d): <strong>" . date("Y-m-d", $timestamp) . "</strong></p>";
echo "<p>Full Date/Time: <strong>" . date("l, F j, Y, h:i:s A", $timestamp) . "</strong></p>";

// Using DateTime object (more modern and flexible)
echo "<h3>Using DateTime Object:</h3>";
$now = new DateTime();
echo "<p>Current DateTime object: <strong>" . $now->format("Y-m-d H:i:s") . "</strong></p>";

$futureDate = new DateTime('+1 month'); // 1 month from now
echo "<p>Date 1 month from now: <strong>" . $futureDate->format("Y-m-d H:i:s") . "</strong></p>";

$specificDate = new DateTime('2024-12-25 10:30:00');
echo "<p>Specific Date: <strong>" . $specificDate->format("Y-m-d H:i:s") . "</strong></p>";

$interval = $now->diff($specificDate); // Difference between two dates
echo "<h3>Date Difference:</h3>";
echo "<p>" . $interval->format('%R%a days %H hours %I minutes') . " difference between now and 2024-12-25.</p>";

echo "</div>";


// --- Section 9: Working with APIs (cURL/file_get_contents) ---
// Making basic HTTP requests to external services.

echo "<div class='section'>";
echo "<h2>Section 9: Working with APIs</h2>";

echo "<h3>Fetching JSON Placeholder Data (GET Request):</h3>";
$apiUrl = "https://jsonplaceholder.typicode.com/posts/1";

// Using file_get_contents (requires allow_url_fopen = On in php.ini)
$apiResponse = @file_get_contents($apiUrl); // @ suppresses errors if file_get_contents fails

if ($apiResponse === false) {
    echo "<p class='error'>ERROR: Could not fetch data from API using file_get_contents. Check allow_url_fopen in php.ini or network connection.</p>";
    // Fallback to cURL example if file_get_contents fails
    echo "<p>Attempting with cURL (if enabled)...</p>";
    if (extension_loaded('curl')) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the transfer as a string rather than outputting it directly
        $apiResponse = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($apiResponse === false || $httpCode !== 200) {
            echo "<p class='error'>ERROR: Failed to fetch API data using cURL. HTTP Code: " . $httpCode . ", cURL Error: " . curl_error($ch) . "</p>";
        }
    } else {
        echo "<p>cURL extension is not enabled. Cannot fetch API data.</p>";
    }
}

if ($apiResponse) {
    $data = json_decode($apiResponse, true); // Decode JSON into an associative array

    if (json_last_error() === JSON_ERROR_NONE) {
        echo "<h4>API Response for Post 1:</h4>";
        echo "<pre>" . htmlspecialchars(print_r($data, true)) . "</pre>";
        echo "<p>Title: <strong>" . htmlspecialchars($data['title']) . "</strong></p>";
    } else {
        echo "<p class='error'>ERROR: Could not decode JSON response: " . json_last_error_msg() . "</p>";
        echo "Raw response: <pre>" . htmlspecialchars($apiResponse) . "</pre>";
    }
} else {
    echo "<p>No API response to display.</p>";
}
echo "</div>";


// --- Section 10: Security Considerations ---
// Best practices for securing web applications.

echo "<div class='section'>";
echo "<h2>Section 10: Security Considerations</h2>";

echo "<h3>Input Validation &amp; Sanitization:</h3>";
$unsafeInput = "<script>alert('XSS!');</script>Hello, <b>User</b>!";

// htmlspecialchars for XSS prevention (for displaying user-supplied data)
echo "<p>Unsafe input displayed with htmlspecialchars: <strong>" . htmlspecialchars($unsafeInput) . "</strong></p>";

// filter_var for more specific validation/sanitization
$email = "test@example.com";
$invalidEmail = "invalid-email";

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<p>'" . htmlspecialchars($email) . "' is a valid email.</p>";
} else {
    echo "<p class='error'>'" . htmlspecialchars($email) . "' is NOT a valid email.</p>";
}

if (filter_var($invalidEmail, FILTER_VALIDATE_EMAIL)) {
    echo "<p>'" . htmlspecialchars($invalidEmail) . "' is a valid email.</p>";
} else {
    echo "<p class='error'>'" . htmlspecialchars($invalidEmail) . "' is NOT a valid email.</p>";
}

echo "<h3>Password Hashing:</h3>";
$userPassword = "mySecretPassword123";

// Hash the password for storage
$hashedPassword = password_hash($userPassword, PASSWORD_DEFAULT);
echo "<p>Original Password: <strong>" . htmlspecialchars($userPassword) . "</strong></p>";
echo "<p>Hashed Password: <strong>" . htmlspecialchars($hashedPassword) . "</strong></p>";

// Verify a password (e.g., during login)
$loginAttemptPassword = "mySecretPassword123";
if (password_verify($loginAttemptPassword, $hashedPassword)) {
    echo "<p>Password verification successful! (Login attempt with '<strong>" . htmlspecialchars($loginAttemptPassword) . "</strong>')</p>";
} else {
    echo "<p class='error'>Password verification failed!</p>";
}

$wrongLoginAttempt = "wrongPassword";
if (password_verify($wrongLoginAttempt, $hashedPassword)) {
    echo "<p>Password verification successful! (Login attempt with '<strong>" . htmlspecialchars($wrongLoginAttempt) . "</strong>')</p>";
} else {
    echo "<p class='error'>Password verification failed! (Login attempt with '<strong>" . htmlspecialchars($wrongLoginAttempt) . "</strong>')</p>";
}

echo "<p><strong>SQL Injection Prevention:</strong> Demonstrated in Section 3 using Prepared Statements.</p>";
echo "<p><strong>CSRF Token (Conceptual):</strong> A real CSRF prevention mechanism involves generating a unique token for each form submission and verifying it on the server. Libraries or frameworks often handle this.</p>";

echo "</div>";


// --- Section 11: Regular Expressions ---
// Using regular expressions for pattern matching and replacement.

echo "<div class='section'>";
echo "<h2>Section 11: Regular Expressions</h2>";

$text = "The quick brown fox jumps over the lazy dog. The fox is agile.";
$pattern = "/fox/i"; // Case-insensitive search for "fox"

echo "<h3>Basic Pattern Matching (preg_match):</h3>";
if (preg_match($pattern, $text, $matches)) {
    echo "<p>Pattern '<strong>" . htmlspecialchars($pattern) . "</strong>' found in text. First match: <strong>" . htmlspecialchars($matches[0]) . "</strong></p>";
} else {
    echo "<p>Pattern not found.</p>";
}

echo "<h3>Global Pattern Matching (preg_match_all):</h3>";
$patternAll = "/(fox|dog)/i"; // Find all occurrences of "fox" or "dog"
if (preg_match_all($patternAll, $text, $matchesAll)) {
    echo "<p>All matches for '<strong>" . htmlspecialchars($patternAll) . "</strong>': <strong>" . htmlspecialchars(implode(", ", $matchesAll[0])) . "</strong></p>";
}

echo "<h3>Pattern Replacement (preg_replace):</h3>";
$replacement = "cat";
$newText = preg_replace($pattern, $replacement, $text);
echo "<p>Original text: <strong>" . htmlspecialchars($text) . "</strong></p>";
echo "<p>Replaced 'fox' with 'cat': <strong>" . htmlspecialchars($newText) . "</strong></p>";

echo "<h3>More Complex Example (Email Validation):</h3>";
$emailRegex = "/^[\_a-z0-9-]+(\.[a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})";
$validEmail = "test@example.com";
$invalidEmail = "test@.com";

if (preg_match($emailRegex, $validEmail)) {
    echo "<p>'" . htmlspecialchars($validEmail) . "' is considered a valid email by regex.</p>";
} else {
    echo "<p class='error'>'" . htmlspecialchars($validEmail) . "' is NOT considered a valid email by regex.</p>";
}

if (preg_match($emailRegex, $invalidEmail)) {
    echo "<p>'" . htmlspecialchars($invalidEmail) . "' is considered a valid email by regex.</p>";
} else {
    echo "<p class='error'>'" . htmlspecialchars($invalidEmail) . "' is NOT considered a valid email by regex.</p>";
}
echo "</div>";

echo "</body>";
echo "</html>";

// --- End of PHP Web Development Scratchpad ---

?>