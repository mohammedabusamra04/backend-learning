# Consolidated User Registration & Streaming File Upload

A high-performance, modular Node.js backend server that registers users and handles file uploads simultaneously via `multipart/form-data`. It parses requests and streams files directly to disk using `busboy` to avoid memory bloat, with automatic file cleanup on validation failures.

---

## Features

- **Consolidated Endpoint:** Register a user and upload their files in a single request.
- **Efficient Streaming:** Files are written to disk directly via Node.js Write Streams (`fs.createWriteStream`).
- **Validation Rules:**
  - Standard fields: `name` (letters only), `email` (valid email format), and `phoneNumber` (10 digits starting with `056` or `059`).
  - Allowed file extensions: `txt`, `png`, `jpg`, `jpeg`, `pdf`.
  - Uniqueness validation: Checks for duplicate emails or phone numbers in `users.json`.
- **Automatic File Cleanup:** If any validation fails (e.g. duplicate email or invalid phone), any files that were uploaded in the same request are automatically deleted from the server to save disk space.

---

## Project Architecture

The project is structured according to clean code principles:

```text
├── controllers/
│   └── userController.js    # Receives requests, triggers validations, calls services, sends HTTP response
├── helpers/
│   ├── multipartHelper.js   # Parses multipart/form-data request using busboy streams
│   └── validationHelper.js  # Generic formatting validators for name, email, phone, and file extensions
├── routes/
│   └── index.js             # Main router forwarding requests to userController
├── services/
│   ├── fileService.js       # Handles file writing via streams and file deletion
│   └── userService.js       # Manages users list in users.json (database simulation)
├── uploads/                 # Storage folder for uploaded files (automatically created)
├── users.json               # Local database simulating user storage
├── server.js                # Sersver startup file
├── multipartRequests.http   # REST Client test file for local API testing
├── package.json             # NPM package manager config
└── README.md                # Project documentation
```

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed.

### Installation
1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server
Run the local server on port `3000`:
```bash
npm start
```
or:
```bash
node server.js
```

---

## API Documentation

### Register User & Upload Files

- **URL:** `/register` or `/`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`

#### Fields (form-data):
| Field | Type | Description |
|---|---|---|
| `name` | Text | Required. Only English letters allowed. |
| `email` | Text | Required. Must be a valid email format, must be unique. |
| `phoneNumber` | Text | Required. 10 digits starting with `056` or `059`, must be unique. |
| `file` | File | Required. Any file with extension: `txt`, `png`, `jpg`, `jpeg`, `pdf`. |

#### Response Examples

##### 1. Success Response (201 Created)
```json
{
  "message": "User registered and files uploaded successfully",
  "user": {
    "id": 1,
    "name": "Khaled",
    "email": "khaled@gmail.com",
    "phoneNumber": "0569876543",
    "files": [
      {
        "fileName": "hello.txt",
        "contentType": "text/plain",
        "size": 109
      }
    ],
    "createdAt": "2026-07-23T10:26:42.109Z"
  }
}
```

##### 2. Validation Failure (400 Bad Request)
```json
{
  "message": "Email already exists"
}
```
*(Note: If a duplicate email/phone is submitted, any file uploaded in that request is automatically deleted from the `uploads/` directory).*

##### 3. Disallowed File Type (400 Bad Request)
```json
{
  "message": "File type not allowed."
}
```

---

## Testing the API

A test suite file is provided at `multipartRequests.http`. You can send test requests directly within VS Code using the **REST Client** extension, or use `curl`/`Postman` as described below:

### Testing with native `curl`
```bash
curl.exe -X POST \
  -F "name=Khaled" \
  -F "email=khaled@gmail.com" \
  -F "phoneNumber=0569876543" \
  -F "file=@test.txt" \
  http://localhost:3000/register
```

---

## Technologies Used

- **Node.js** (native `http` and `fs` modules)
- **Busboy** (efficient streaming multipart parser)
