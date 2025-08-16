const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const interfaces = os.networkInterfaces();
    let ipAddress = 'Unknown';
    
    for (const iface of Object.values(interfaces)) {
        for (const details of iface) {
            if (details.family === 'IPv4' && !details.internal) {
                ipAddress = details.address;
                break;
            }
        }
    }
    
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Container IP Address</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                h1 { color: #333; }
            </style>
        </head>
        <body>
            <h1>Container IP Address</h1>
            <p>IP: ${ipAddress}</p>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
