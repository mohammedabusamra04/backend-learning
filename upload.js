const fs = require("fs");

const fields = ["fileName", "contentType", "data"];
const allowedExtensions = ["txt", "png", "jpg", "jpeg", "pdf"];

const handleUpload = (req, res) => {
    let body = "";

    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", () => {
        try {
            const fileData = JSON.parse(body);
            const keys = Object.keys(fileData);

            const missing = fields.some(field => !keys.includes(field));
            const extra = keys.some(key => !fields.includes(key));

            if (missing || extra) {
                res.writeHead(400, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    message: "Extra or missing fields"
                }));
                return;
            }

            const { fileName, contentType, data } = fileData;

            if (!fileName || !contentType || !data) {
                res.writeHead(400, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    message: "All fields are required."
                }));
                return;
            }

            const extension = fileName.split(".").pop().toLowerCase();

            if (!allowedExtensions.includes(extension)) {
                res.writeHead(400, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    message: "File type not allowed."
                }));
                return;
            }

            if (!fs.existsSync("uploads")) {
                fs.mkdirSync("uploads");
            }

            const buffer = Buffer.from(data, "base64");
            fs.writeFileSync("uploads/" + fileName, buffer);

            res.writeHead(201, {
                "Content-Type": "application/json"
            });
            res.end(JSON.stringify({
                message: "File uploaded successfully.",
                file: {
                    fileName,
                    contentType,
                    size: buffer.length
                }
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
};

module.exports = handleUpload;
