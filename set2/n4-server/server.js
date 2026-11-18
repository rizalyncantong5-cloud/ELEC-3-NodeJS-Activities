
const http = require("http");

const PORT = 8000;

const server = http.createServer((req, res) => {

    // HOME PAGE
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
            <h1>Welcome to My Home Page!</h1>
            <h2>My name is Rizalyn A. Cantong.</h2>
            <p>Section: BSIT 4A</p>
        `);
    }

    // ABOUT PAGE
    else if (req.url === "/about") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
            <h1>About Me</h1>
            <p>I am a 4th year Bachelor of Science in Information Technology student at Pangasinan State University.</p>
        `);
    }

    // CONTACT PAGE
    else if (req.url === "/contact") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
            <h1>Contact Me</h1>
            <p>Name: Rizalyn A. Cantong</p>
            <p>Course: BS Information Technology</p>
            <p>School: Pangasinan State University</p>
        `);
    }

    // 404 PAGE
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - Page not found</h1>");
    }

});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
