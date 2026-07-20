const { createServer } = require('http');
const fs = require("fs");
const validateUserInput = require("./validation");
const handleUpload = require("./upload");

const server = createServer((req, res) => {

    if (req.method === "POST" && req.url === "/upload") {
        handleUpload(req, res);
        return;
    }

    if (req.method === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const userData = JSON.parse(body);
                const users = JSON.parse(fs.readFileSync("users.json", "utf8"));

                const validationResult = validateUserInput(userData, users);

                if (!validationResult.success) {
                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });
                    res.end(JSON.stringify({
                        message: validationResult.error
                    }));
                    return;
                }

                const newUser = {
                    id: users.length + 1,
                    ...userData,
                    createdAt: new Date().toISOString()
                };
                users.push(newUser);
                fs.writeFileSync(
                    "users.json",
                    JSON.stringify(users, null, 2)
                );
                res.writeHead(201, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    message: "User created successfully",
                    user: newUser
                }));

            } catch (error) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    message: "Invalid JSON"
                }));
            }
        });
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});