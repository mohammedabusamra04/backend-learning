const multipartHelper = require("../helpers/multipartHelper");
const validationHelper = require("../helpers/validationHelper");
const userService = require("../services/userService");

const expectedTextFields = ["name", "email", "phoneNumber"];

const registerUser = async (req, res) => {
    let parsedData = null;
    try {
        parsedData = await multipartHelper.parseMultipartRequest(req);
        const { fields, files, cleanup } = parsedData;

        const keys = Object.keys(fields);
        const missingFields = expectedTextFields.filter(field => !keys.includes(field));
        const extraFields = keys.filter(key => !expectedTextFields.includes(key));

        if (missingFields.length > 0 || extraFields.length > 0) {
            cleanup();
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Extra or missing fields" }));
            return;
        }

        const emptyCheck = validationHelper.checkEmptyFields(fields, expectedTextFields, "All fields are required");
        if (!emptyCheck.success) {
            cleanup();
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: emptyCheck.error }));
            return;
        }

        const nameVal = validationHelper.validateName(fields.name);
        if (!nameVal.success) {
            cleanup();
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: nameVal.error }));
            return;
        }

        const emailVal = validationHelper.validateEmail(fields.email);
        if (!emailVal.success) {
            cleanup();
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: emailVal.error }));
            return;
        }

        const phoneVal = validationHelper.validatePhoneNumber(fields.phoneNumber);
        if (!phoneVal.success) {
            cleanup();
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: phoneVal.error }));
            return;
        }

        if (files.length === 0) {
            cleanup();
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "All fields are required." }));
            return;
        }

        const result = userService.createUser(fields, files);
        if (!result.success) {
            cleanup();
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: result.error }));
            return;
        }

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            message: "User registered and files uploaded successfully",
            user: result.user
        }));

    } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: error.message }));
    }
};

module.exports = {
    registerUser
};
