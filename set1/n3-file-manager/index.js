
const fs = require("fs");
const path = require("path");

const filesFolder = path.join(__dirname, "files");

// Create files folder if it does not exist
if (!fs.existsSync(filesFolder)) {
    fs.mkdirSync(filesFolder);
}

const command = process.argv[2];
const fileName = process.argv[3];
const content = process.argv.slice(4).join(" ");

function createFile() {
    const filePath = path.join(filesFolder, fileName);

    fs.writeFileSync(filePath, content);
    console.log("File created successfully!");
    console.log("File:", fileName);
}

function readFile() {
    const filePath = path.join(filesFolder, fileName);

    if (!fs.existsSync(filePath)) {
        throw new Error("File not found!");
    }

    const data = fs.readFileSync(filePath, "utf8");
    console.log("File Content:", data);
}

function updateFile() {
    const filePath = path.join(filesFolder, fileName);

    if (!fs.existsSync(filePath)) {
        throw new Error("File not found!");
    }

    fs.writeFileSync(filePath, content);
    console.log("File updated successfully!");
}

function deleteFile() {
    const filePath = path.join(filesFolder, fileName);

    if (!fs.existsSync(filePath)) {
        throw new Error("File not found!");
    }

    fs.unlinkSync(filePath);
    console.log("File deleted successfully!");
}

function listFiles() {
    const files = fs.readdirSync(filesFolder);

    if (files.length === 0) {
        console.log("No files found.");
        return;
    }

    console.log("===== FILE LIST =====");

    files.forEach(file => {
        const filePath = path.join(filesFolder, file);
        const stats = fs.statSync(filePath);

        if (stats.isFile()) {
            const fileContent = fs.readFileSync(filePath, "utf8");

            console.log("------------------------------");
            console.log("Full Path:", filePath);
            console.log("File Name:", path.basename(file));
            console.log("Extension:", path.extname(file));
            console.log("Content:", fileContent);
        }
    });
}

try {
    switch (command) {
        case "create":
            if (!fileName || !content) {
                throw new Error("Usage: node index.js create filename.txt content");
            }
            createFile();
            break;

        case "read":
            if (!fileName) throw new Error("Please provide a filename.");
            readFile();
            break;

        case "update":
            if (!fileName || !content) {
                throw new Error("Usage: node index.js update filename.txt new content");
            }
            updateFile();
            break;

        case "delete":
            if (!fileName) throw new Error("Please provide a filename.");
            deleteFile();
            break;

        case "list":
            listFiles();
            break;

        default:
            console.log("Available commands: create, read, update, delete, list");
    }
} catch (error) {
    console.log("Error:", error.message);
}
