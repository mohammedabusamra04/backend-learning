const fs = require("fs");
const path = require("path");

const usersFilePath = path.resolve(__dirname, "../users.json");

const getAllUsers = () => {
    try {
        if (!fs.existsSync(usersFilePath)) {
            fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
            return [];
        }
        const data = fs.readFileSync(usersFilePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const createUser = (userData, filesList = []) => {
    const users = getAllUsers();
    const { email, phoneNumber } = userData;

    if (users.some(user => user.email === email)) {
        return {
            success: false,
            error: "Email already exists"
        };
    }

    if (users.some(user => user.phoneNumber === phoneNumber)) {
        return {
            success: false,
            error: "Phone number already exists"
        };
    }

    const newUser = {
        id: users.length + 1,
        ...userData,
        files: filesList,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);

    fs.writeFileSync(
        usersFilePath,
        JSON.stringify(users, null, 2)
    );

    return {
        success: true,
        user: newUser
    };
};

module.exports = {
    getAllUsers,
    createUser
};
