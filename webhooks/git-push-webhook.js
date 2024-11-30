const http = require("http");
const { exec } = require("child_process");
const crypto = require("crypto");

const PORT = 3001;

// Helper function to verify the GitHub signature
function verifySignature(payload, signature) {
    const hmac = crypto.createHmac("sha256", SECRET);
    const digest = `sha256=${hmac.update(payload).digest("hex")}`;
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}


const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/github-webhook") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const payload = JSON.parse(body);

            // Check if the event is a pull request closed and merged into `main`
            if (
                payload.action === "closed" &&
                payload.pull_request &&
                payload.pull_request.merged === true &&
                payload.pull_request.base.ref === "main"
            ) {
                console.log("Pull request merged into 'main', triggering git pull");

                const path = require("path");
                const projectPath = path.join(__dirname, "..");

                // Execute git pull
                exec("git pull origin main", { cwd: projectPath }, (error, stdout, stderr) => {
                    if (error) {
                        console.error("Error during git pull:", stderr);
                        res.writeHead(500);
                        res.end("Error during git pull");
                        return;
                    }

                    console.log("Git pull success:", stdout);
                    res.writeHead(200);
                    res.end("Git pull success");
                });
            } else {
                console.log("Event does not meet criteria for git pull.");
                res.writeHead(200);
                res.end("Event ignored");
            }
        });
    } else {
        res.writeHead(404);
        res.end("Not found");
    }
});

server.listen(PORT, () => {
    console.log(`Webhook server running on port ${PORT}`);
});
