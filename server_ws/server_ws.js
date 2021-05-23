const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });



wss.on('connection', (ws) => {
    ws.on('message', (data) => {
            wss.clients.forEach(client => {
                if (client != ws && client.readyState == WebSocket.OPEN)
                    client.send(data);
            });
    });
});
server.listen(port, () => {
    console.log('server listening on port: ' + port);
})

