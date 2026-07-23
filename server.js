const { createServer } = require('http');
const router = require('./routes');

const server = createServer((req, res) => {
    router(req, res);
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});