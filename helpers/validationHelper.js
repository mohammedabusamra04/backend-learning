const validateName = (name) => {
    if (!/^[a-zA-Z]+$/.test(name)) {
        return {
            success: false,
            error: "Name must contain only letters"
        };
    }
    return { success: true };
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            success: false,
            error: "Invalid email format"
        };
    }
    return { success: true };
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
    return { success: true };
};

const checkFieldsStructure = (data, expectedFields) => {
    const keys = Object.keys(data);
    const missing = expectedFields.some(field => !keys.includes(field));
    const extra = keys.some(key => !expectedFields.includes(key));

    if (missing || extra) {
        return {
            success: false,
            error: "Extra or missing fields"
        };
    }
    return { success: true };
};

const checkEmptyFields = (data, expectedFields, errorMessage) => {
    for (const field of expectedFields) {
        if (!data[field]) {
            return {
                success: false,
                error: errorMessage
            };
        }
    }
    return { success: true };
};

const allowedExtensions = ["txt", "png", "jpg", "jpeg", "pdf"];

const validateFileExtension = (fileName) => {
    if (!fileName) {
        return {
            success: false,
            error: "File name is missing"
        };
    }
    const extension = fileName.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
        return {
            success: false,
            error: "File type not allowed."
        };
    }
    return { success: true };
};

module.exports = {
    validateName,
    validateEmail,
    validatePhoneNumber,
    checkFieldsStructure,
    checkEmptyFields,
    validateFileExtension
};
