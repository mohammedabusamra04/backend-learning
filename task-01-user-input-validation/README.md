```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Input Validation</title>
</head>
<body>

    <h1>User Input Validation</h1>

    <p>
        A simple Node.js task that validates user input, prevents duplicate email and phone number,
        and stores valid users in a local JSON file.
    </p>

    <h2>User Fields</h2>
    <ul>
        <li>id</li>
        <li>name</li>
        <li>email</li>
        <li>phoneNumber</li>
        <li>createdAt</li>
    </ul>

    <h2>Validation Rules</h2>
    <ul>
        <li>All fields are required.</li>
        <li>Email must be unique.</li>
        <li>Phone number must be unique.</li>
    </ul>

    <h2>Examples</h2>

    <h3>Valid Request</h3>
    <strong>Input</strong>
    <pre>
{
  "name": "Mohammed",
  "email": "mohammed@example.com",
  "phoneNumber": "0591234567"
}
    </pre>

    <strong>Response</strong>
    <pre>
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
    </pre>

    <hr>

    <h3>Duplicate Email</h3>
    <strong>Input</strong>
    <pre>
{
  "name": "Rafat",
  "email": "mohammed@example.com",
  "phoneNumber": "0569876543"
}
    </pre>

    <strong>Response</strong>
    <pre>
{
  "message": "Email already exists."
}
    </pre>

    <hr>

    <h3>Duplicate Phone Number</h3>
    <strong>Input</strong>
    <pre>
{
  "name": "Ahmad",
  "email": "ahmad@example.com",
  "phoneNumber": "0591234567"
}
    </pre>

    <strong>Response</strong>
    <pre>
{
  "message": "Phone number already exists."
}
    </pre>

    <hr>

    <h3>Missing Required Field</h3>
    <strong>Input</strong>
    <pre>
{
  "name": "Yousef",
  "email": "",
  "phoneNumber": "0564567890"
}
    </pre>

    <strong>Response</strong>
    <pre>
{
  "message": "All fields are required."
}
    </pre>

    <h2>Technologies</h2>
    <ul>
        <li>Node.js</li>
        <li>HTTP Module</li>
        <li>File System (fs)</li>
    </ul>

</body>
</html>
```
