const busboy = require("busboy");
const validationHelper = require("./validationHelper");
const fileService = require("../services/fileService");

const parseMultipartRequest = (req) => {
    return new Promise((resolve, reject) => {
        const contentType = req.headers["content-type"] || "";
        if (!contentType.includes("multipart/form-data")) {
            return reject(new Error("Content-Type must be multipart/form-data"));
        }

        const bb = busboy({ headers: req.headers });
        const fields = {};
        const files = [];
        const filePromises = [];
        let parsingError = null;

        bb.on("field", (name, val) => {
            fields[name] = val;
        });

        bb.on("file", (name, fileStream, info) => {
            const fileName = info.filename;
            const fileType = info.mimeType;

            const extCheck = validationHelper.validateFileExtension(fileName);
            if (!extCheck.success) {
                fileStream.resume();
                parsingError = extCheck.error;
                return;
            }

            const savePromise = fileService.saveFileStream(fileStream, fileName)
                .then(savedInfo => {
                    files.push({
                        fileName: savedInfo.fileName,
                        contentType: fileType,
                        size: savedInfo.size
                    });
                })
                .catch(err => {
                    parsingError = err.message;
                });

            filePromises.push(savePromise);
        });

        bb.on("error", (err) => {
            reject(err);
        });

        bb.on("close", async () => {
            await Promise.all(filePromises);

            const cleanup = () => {
                files.forEach(f => fileService.deleteFile(f.fileName));
            };

            if (parsingError) {
                cleanup();
                return reject(new Error(parsingError));
            }

            resolve({
                fields,
                files,
                cleanup
            });
        });

        req.pipe(bb);
    });
};

module.exports = {
    parseMultipartRequest
};
