const { createServer } = require('http');

const server = createServer((req, res) => {

    if (req.method === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const userData = JSON.parse(body);

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    message: "Data received successfully",
                    data: userData
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