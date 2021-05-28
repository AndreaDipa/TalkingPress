const express = require("express");

const router = express.Router();
var expressWs = require("express-ws")(router);
const auth = require("../middleware/auth");

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

router.ws("/general", (ws, req) => {
    general.push(ws);
    ws.onmessage = function (msg) {
        general.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});

router.ws("/science", (ws, req) => {
    science.push(ws);

    ws.onmessage = function (msg) {
        science.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});

router.ws("/sports", (ws, req) => {
    sports.push(ws);

    ws.onmessage = function (msg) {
        sports.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});

router.ws("/business", (ws, req) => {
    business.push(ws);

    ws.onmessage = function (msg) {
        business.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});

router.ws("/health", (ws, req) => {
    healt.push(ws);

    ws.onmessage = function (msg) {
        healt.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});

router.ws("/entertainment", (ws, req) => {
    entertainment.push(ws);

    ws.onmessage = function (msg) {
        entertainment.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});

router.ws("/tech", (ws, req) => {
    tech.push(ws);

    ws.onmessage = function (msg) {
        tech.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});

router.ws("/politics", (ws, req) => {
    politics.push(ws);

    ws.onmessage = function (msg) {
        politics.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});

router.ws("/food", (ws, req) => {
    food.push(ws);

    ws.onmessage = function (msg) {
        food.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});

router.ws("/travel", (ws, req) => {
    travel.push(ws);

    ws.onmessage = function (msg) {
        travel.forEach(function (client) {
            if (client != ws && client.readyState == 1) client.send(msg.data);
        });
    };
});

module.exports = router;
