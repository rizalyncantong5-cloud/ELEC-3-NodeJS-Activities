
# N6 - Middleware and API Testing

**Name:** Rizalyn A. Cantong  
**Section:** BSIT 4A  
**Activity:** N6 - Middleware and API Testing  
**Date:** November 18, 2026

## Description
This project is a REST-style Student API using Node.js HTTP module.
It implements custom middleware for logging requests and setting JSON response headers.

## Middleware Used
1. Logger Middleware - Displays the HTTP method, URL, date, and time of every incoming request.
2. JSON Middleware - Sets the Content-Type header to application/json.

## How to Run

1. Open the project folder in VS Code.
2. Open the terminal.
3. Run:

```bash
node server.js
```

4. The server will run at:

http://127.0.0.1:8002

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/students | Get all students |
| GET | /api/students/1 | Get student by ID |
| POST | /api/students | Add a student |
| PUT | /api/students/4 | Update a student |
| DELETE | /api/students/4 | Delete a student |

## Technologies Used
- Node.js
- JavaScript
- HTTP Module
- Custom Middleware
- PowerShell API Testing
