
Name: Rizalyn A. Cantong
Section: BSIT 4A
Activity: N5 - REST-style API
Date: November 18, 2026

const http = require("http");

let students = [
    { id: 1, name: "Rizalyn Cantong", section: "BSIT 4A", course: "BSIT" },
    { id: 2, name: "Maria Santos", section: "BSIT 4A", course: "BSIT" },
    { id: 3, name: "Juan Dela Cruz", section: "BSIT 4B", course: "BSIT" }
];

const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost:8002");
    const parts = url.pathname.split("/").filter(Boolean);

    res.setHeader("Content-Type", "application/json");

    if (req.method === "GET" && url.pathname === "/api/students") {
        res.writeHead(200);
        return res.end(JSON.stringify(students));
    }

    if (req.method === "GET" &&
        parts.length === 3 &&
        parts[0] === "api" &&
        parts[1] === "students") {

        const student = students.find(s => s.id === Number(parts[2]));

        if (!student) {
            res.writeHead(404);
            return res.end(JSON.stringify({ message: "Student not found" }));
        }

        res.writeHead(200);
        return res.end(JSON.stringify(student));
    }

    if (req.method === "POST" && url.pathname === "/api/students") {
        let body = "";

        req.on("data", chunk => body += chunk);

        req.on("end", () => {
            try {
                const newStudent = JSON.parse(body);

                if (!newStudent.name || !newStudent.section || !newStudent.course) {
                    res.writeHead(400);
                    return res.end(JSON.stringify({
                        message: "Name, section, and course are required"
                    }));
                }

                newStudent.id = students.length
                    ? Math.max(...students.map(s => s.id)) + 1
                    : 1;

                students.push(newStudent);

                res.writeHead(201);
                res.end(JSON.stringify(newStudent));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: "Invalid JSON body" }));
            }
        });

        return;
    }

    if (req.method === "PUT" &&
        parts.length === 3 &&
        parts[0] === "api" &&
        parts[1] === "students") {

        const id = Number(parts[2]);
        const student = students.find(s => s.id === id);

        if (!student) {
            res.writeHead(404);
            return res.end(JSON.stringify({ message: "Student not found" }));
        }

        let body = "";

        req.on("data", chunk => body += chunk);

        req.on("end", () => {
            try {
                const updatedData = JSON.parse(body);

                Object.assign(student, {
                    name: updatedData.name ?? student.name,
                    section: updatedData.section ?? student.section,
                    course: updatedData.course ?? student.course
                });

                res.writeHead(200);
                res.end(JSON.stringify(student));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: "Invalid JSON body" }));
            }
        });

        return;
    }

    if (req.method === "DELETE" &&
        parts.length === 3 &&
        parts[0] === "api" &&
        parts[1] === "students") {

        const id = Number(parts[2]);
        const index = students.findIndex(s => s.id === id);

        if (index === -1) {
            res.writeHead(404);
            return res.end(JSON.stringify({ message: "Student not found" }));
        }

        const deletedStudent = students.splice(index, 1)[0];

        res.writeHead(200);
        return res.end(JSON.stringify({
            message: "Student deleted successfully",
            student: deletedStudent
        }));
    }

    res.writeHead(404);
    res.end(JSON.stringify({ message: "Endpoint not found" }));
});

server.listen(8002, "127.0.0.1", () => {
    console.log("Students API running at http://127.0.0.1:8002");
});
