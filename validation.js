const validateName = (name) => {

    if (!/^[a-zA-Z]+$/.test(name)) {
        return {
            success: false,
            error: "Name must contain only letters"
        };
    }

    return {
        success: true
    };
};

const validateEmail = (email) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return {
            success: false,
            error: "Invalid email format"
        };
    }

    return {
        success: true
    };
};

const validatePhoneNumber = (phoneNumber) => {
    if (
        phoneNumber.length !== 10 ||
        (!phoneNumber.startsWith("056") &&
        !phoneNumber.startsWith("059"))
    ) {
        return {
            success: false,
            error: "Invalid phone number"
        };
    }
    return {
        success: true
    };
};

const fields = ["name", "email", "phoneNumber"];

const validateUserInput = (user, users) => {
    const keys = Object.keys(user);

    const missing = fields.some(field => !keys.includes(field));
    const extra = keys.some(key => !fields.includes(key));

    if (missing || extra) {
        return {
            success: false,
            error: "Extra or missing fields"
        };
    }

    const { name, email, phoneNumber } = user;

    if (!name || !email || !phoneNumber) {
        return {
            success: false,
            error: "All fields are required"
        };
    }

    const validations = [
        validateName(name),
        validateEmail(email),
        validatePhoneNumber(phoneNumber)
    ];

    const failedValidation = validations.find(
        validation => !validation.success
    );

    if (failedValidation) {
        return failedValidation;
    }

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
    return {
        success: true
    };
};

module.exports = validateUserInput;