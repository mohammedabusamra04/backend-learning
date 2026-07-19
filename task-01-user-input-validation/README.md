# User Input Validation

A simple Node.js task that validates user input, prevents duplicate email and phone number, and stores valid users in a local JSON file.

## User Fields

- id
- name
- email
- phoneNumber
- createdAt

## Validation Rules

- All fields are required.
- Email must be unique.
- Phone number must be unique.

## Examples

### Valid Request

**Input**

```json
{
  "name": "Mohammed",
  "email": "mohammed@example.com",
  "phoneNumber": "0591234567"
}
```

**Response**

```json
{
  "message": "User created successfully.",
  "user": {
    "id": "1",
    "name": "Mohammed",
    "email": "mohammed@example.com",
    "phoneNumber": "0591234567",
    "createdAt": "2026-07-19T12:00:00.000Z"
  }
}
```

---

### Duplicate Email

**Input**

```json
{
  "name": "Rafat",
  "email": "mohammed@example.com",
  "phoneNumber": "0569876543"
}
```

**Response**

```json
{
  "message": "Email already exists."
}
```

---

### Duplicate Phone Number

**Input**

```json
{
  "name": "Ahmad",
  "email": "ahmad@example.com",
  "phoneNumber": "0591234567"
}
```

**Response**

```json
{
  "message": "Phone number already exists."
}
```

---

### Missing Required Field

**Input**

```json
{
  "name": "Yousef",
  "email": "",
  "phoneNumber": "0564567890"
}
```

**Response**

```json
{
  "message": "All fields are required."
}
```

## Technologies

- Node.js
- HTTP Module
- File System (`fs`)
