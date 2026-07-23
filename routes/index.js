const userController = require("../controllers/userController");


const router = (req, res) => {
    if (req.method === "POST" && (req.url === "/register" || req.url === "/")) {
        userController.registerUser(req, res);
        return;
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
};

module.exports = router;
