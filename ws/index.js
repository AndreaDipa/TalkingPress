const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);
const PORT = process.env.PORT || 6000;

let general = [];
let science = [];
let sports = [];
let business = [];
let healt = [];
let entertainment = [];
let tech = [];
let politics = [];
let food = [];
let travel = [];


app.ws("/chat/general", (ws, req) => {
    
    general.push(ws);
    ws.onmessage = function (msg) {
        general.forEach(function (client) {
            if (client != ws && client.readyState == 1) {
                client.send(msg.data);
            }
        });
    };
});

app.ws("/chat/science", (ws, req) => {
    science.push(ws);

    ws.onmessage = function (msg) {
        science.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});
app.ws("/chat/sports", (ws, req) => {
    sports.push(ws);

    ws.onmessage = function (msg) {
        sports.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});
app.ws("/chat/business", (ws, req) => {
    business.push(ws);

    ws.onmessage = function (msg) {
        business.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});
app.ws("/chat/health", (ws, req) => {
    healt.push(ws);

    ws.onmessage = function (msg) {

        healt.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});
app.ws("/chat/entertainment", (ws, req) => {

    entertainment.push(ws);

    ws.onmessage = function (msg) {
        entertainment.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});
app.ws("/chat/tech", (ws, req) => {

    tech.push(ws);

    ws.onmessage = function (msg) {
        tech.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});
app.ws("/chat/politics", (ws, req) => {

    politics.push(ws);

    ws.onmessage = function (msg) {
        politics.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});
app.ws("/chat/food", (ws, req) => {
    food.push(ws);

    ws.onmessage = function (msg) {
        food.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});
app.ws("/chat/travel", (ws, req) => {
    travel.push(ws);

    ws.onmessage = function (msg) {
        travel.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});