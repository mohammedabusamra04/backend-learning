# File Upload

A simple Node.js task that receives a file as Base64 data inside a JSON body, converts it to a Buffer, validates the file type, and stores the file on the local disk.

## Request Fields

- fileName
- contentType
- data

## Validation Rules

- All fields are required.
- Only these file types are allowed: `txt`, `png`, `jpg`, `jpeg`, `pdf`.
- Any other file type is rejected.
- Extra or missing fields are rejected.

## Examples

### Valid Request

**Input**

```json
{
  "fileName": "note.txt",
  "contentType": "text/plain",
  "data": "SGVsbG8gV29ybGQ="
}
```

**Response**

```json
{
  "message": "File uploaded successfully.",
  "file": {
    "fileName": "note.txt",
    "contentType": "text/plain",
    "size": 11
  }
}
```

---

### Invalid File Type

**Input**

```json
{
  "fileName": "script.exe",
  "contentType": "application/octet-stream",
  "data": "TVqQAAMAAAAEAAAA//8AALgAAAAA"
}
```

**Response**

```json
{
  "message": "File type not allowed."
}
```

---

### Missing Required Field

**Input**

```json
{
  "fileName": "note.txt",
  "contentType": "text/plain",
  "data": ""
}
```

**Response**

```json
{
  "message": "All fields are required."
}
```

---

### Missing or Extra Key

**Input (missing key)**

```json
{
  "fileName": "note.txt",
  "data": "SGVsbG8gV29ybGQ="
}
```

**Input (extra key)**

```json
{
  "fileName": "note.txt",
  "contentType": "text/plain",
  "data": "SGVsbG8gV29ybGQ=",
  "owner": "Loai"
}
```

**Response**

```json
{
  "message": "Extra or missing fields"
}
```

## Technologies

- Node.js
- HTTP Module
- File System (`fs`)
- Buffer
