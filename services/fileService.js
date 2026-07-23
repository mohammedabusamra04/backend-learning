const fs = require("fs");
const path = require("path");

const uploadsDirPath = path.resolve(__dirname, "../uploads");


const ensureUploadsDir = () => {
    if (!fs.existsSync(uploadsDirPath)) {
        fs.mkdirSync(uploadsDirPath);
    }
};


const saveFileStream = (fileStream, fileName) => {
    ensureUploadsDir();
    const filePath = path.join(uploadsDirPath, fileName);
    const writeStream = fs.createWriteStream(filePath);

    return new Promise((resolve, reject) => {
        fileStream.pipe(writeStream);

        writeStream.on("finish", () => {
            resolve({
                fileName,
                size: writeStream.bytesWritten
            });
        });

        writeStream.on("error", (err) => {
            reject(err);
        });

        fileStream.on("error", (err) => {
            reject(err);
        });
    });
};


const deleteFile = (fileName) => {
    const filePath = path.join(uploadsDirPath, fileName);
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }
    } catch (error) {
        console.error(`Error deleting file ${fileName}:`, error.message);
    }
    return false;
};

module.exports = {
    saveFileStream,
    deleteFile
};
