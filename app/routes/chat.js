const express = require("express");
const router = express.Router();
const expressWs = require("express-ws")(router);

 
const amqp = require("amqplib/callback_api");
let general = [];
let science = [];
let sports = [];
let business = [];
let health = [];
let entertainment = [];
let tech = [];
let politics = [];
let food = [];
let travel = [];
const severities = [
    "general",
    "science",
    "sports",
    "business",
    "health",
    "entertainment",
    "tech",
    "politics",
    "food",
    "travel",
];

function start() {
    amqp.connect("amqp://rabbit", (error0, connection) => {
        connection.createChannel(function (error1, channel) {
            const exchange = "messaggi";
            channel.assertExchange(exchange, "direct", {
                durable: false,
            });
            channel.assertQueue(
                "",
                {
                    exclusive: true,
                },
                function (error2, q) {
                    severities.forEach((sev) => {
                        channel.bindQueue(q.queue, exchange, sev);
                    }); 
                    channel.consume(
                        q.queue,
                        function (msg) {
                            const data = JSON.parse(msg.content.toString());

                            if (data.numero != process.env.number) {
                                switch (msg.fields.routingKey) {
                                    case "general":
                                        general.forEach((client) => {
                                            if (client.readyState == 1)
                                                client.send(data.mex);
                                        });
                                        break;
                                    case "science":
                                        science.forEach((client) => {
                                            if (client.readyState == 1)
                                                client.send(data.mex);
                                        });
                                        break;
                                    case "sports":
                                        sports.forEach((client) => {
                                            if (client.readyState == 1)
                                                client.send(data.mex);
                                        });
                                        break;
                                    case "business":
                                        business.forEach((client) => {
                                            if (client.readyState == 1)
                                                client.send(data.mex);
                                        });
                                        break;
                                    case "health":
                                        health.forEach((client) => {
                                            if (client.readyState == 1)
                                                client.send(data.mex);
                                        });
                                        break;
                                    case "entertainment":
                                        entertainment.forEach((client) => {
                                            if (client.readyState == 1)
                                                client.send(data.mex);
                                        });
                                        break;
                                    case "tech":
                                        tech.forEach((client) => {
                                            if (client.readyState == 1)
                                                client.send(data.mex);
                                        });
                                        break;
                                    case "politics":
                                        politics.forEach((client) => {
                                            if (client.readyState == 1)
                                                client.send(data.mex);
                                        });
                                        break;
                                    case "food":
                                        food.forEach((client) => {
                                            if (client.readyState == 1)
                                                client.send(data.mex);
                                        });
                                        break;
                                    case "travel":
                                        travel.forEach((client) => {
                                            if (client.readyState == 1)
                                                client.send(data.mex);
                                        });
                                        break;
                                }
                            }
                        },
                        {
                            noAck: true,
                        }
                    );
                }
            );
        });
    });
}
function publish(cat, sok) {
    amqp.connect("amqp://rabbit", function (error0, connection) {
        connection.createChannel(function (error1, channel) {
            const exchange = "messaggi";
            channel.assertExchange(exchange, "direct", {
                durable: false,
            });
            sok.onmessage = function (mess) {
                channel.publish(
                    exchange,
                    cat,
                    Buffer.from(
                        `{"mex": "${mess.data}", "numero": "${process.env.number}"}`
                    )
                );
                switch (cat) {
                    case "general":
                        general.forEach((client) => {
                            if (client != sok && client.readyState == 1)
                                client.send(mess.data);
                        });
                        break;
                    case "science":
                        science.forEach((client) => {
                            if (client != sok && client.readyState == 1)
                                client.send(mess.data);
                        });
                        break;
                    case "sports":
                        sports.forEach((client) => {
                            if (client != sok && client.readyState == 1)
                                client.send(mess.data);
                        });
                        break;
                    case "business":
                        business.forEach((client) => {
                            if (client != sok && client.readyState == 1)
                                client.send(mess.data);
                        });
                        break;
                    case "health":
                        health.forEach((client) => {
                            if (client != sok && client.readyState == 1)
                                client.send(mess.data);
                        });
                        break;
                    case "entertainment":
                        entertainment.forEach((client) => {
                            if (client != sok && client.readyState == 1)
                                client.send(mess.data);
                        });
                        break;
                    case "tech":
                        tech.forEach((client) => {
                            if (client != sok && client.readyState == 1)
                                client.send(mess.data);
                        });
                        break;
                    case "politics":
                        politics.forEach((client) => {
                            if (client != sok && client.readyState == 1)
                                client.send(mess.data);
                        });
                        break;
                    case "food":
                        food.forEach((client) => {
                            if (client != sok && client.readyState == 1)
                                client.send(mess.data);
                        });
                        break;
                    case "travel":
                        travel.forEach((client) => {
                            if (client != sok && client.readyState == 1)
                                client.send(mess.data);
                        });
                        break;
                }
            };
            sok.on('close', () => {
                switch (cat) {
                    case "general":
                        for (let i = 0; i < general.length; i++)
                            if (sok == general[i])
                                general.splice(i,1);
                        break;
                    case "science":
                        for (let i = 0; i < science.length; i++)
                            if (sok == science[i])
                                science.splice(i,1);
                        break;
                    case "sports":
                        for (let i = 0; i < sports.length; i++)
                            if (sok == sports[i])
                                sports.splice(i,1);
                        break;
                    case "business":
                        for (let i = 0; i < business.length; i++)
                            if (sok == business[i])
                                business.splice(i,1);
                        break;
                    case "health":
                        for (let i = 0; i < health.length; i++)
                            if (sok == health[i])
                                health.splice(i,1);
                        break;
                    case "entertainment":
                        for (let i = 0; i < entertainment.length; i++)
                            if (sok == entertainment[i])
                                entertainment.splice(i,1);
                        break;
                    case "tech":
                        for (let i = 0; i < tech.length; i++)
                            if (sok == tech[i])
                                tech.splice(i,1);
                        break;
                    case "politics":
                        for (let i = 0; i < politics.length; i++)
                            if (sok == politics[i])
                                politics.splice(i,1);
                        break;
                    case "food":
                        for (let i = 0; i < food.length; i++)
                            if (sok == food[i])
                                food.splice(i,1);
                        break;
                    case "travel":
                        for (let i = 0; i < travel.length; i++)
                            if (sok == travel[i])
                                travel.splice(i,1);
                        break;
                }
                channel.close();
                connection.close();
            });
        });
    });
}
start();


router.ws("/general", (ws, req) => {
    console.log(process.env.number);
    general.push(ws);
    publish("general", ws);
   
});

router.ws("/science", (ws, req) => {
    console.log(process.env.number);
    science.push(ws);
    publish("science", ws);
    
});

router.ws("/sports", (ws, req) => {
    console.log(process.env.number);
    sports.push(ws);
    publish("sports", ws);
    
});

router.ws("/business", (ws, req) => {
    console.log(process.env.number);
    business.push(ws);
    publish("business", ws);
   
});

router.ws("/health", (ws, req) => {
    console.log(process.env.number);
    health.push(ws);
    publish("health", ws);
    
});

router.ws("/entertainment", (ws, req) => {
    console.log(process.env.number);
    entertainment.push(ws);
    publish("entertainment", ws);
    
});

router.ws("/tech", (ws, req) => {
    console.log(process.env.number);
    tech.push(ws);
    publish("tech", ws);
    
});

router.ws("/politics", (ws, req) => {
    console.log(process.env.number);
    politics.push(ws);
    publish("politics", ws);
    
});

router.ws("/food", (ws, req) => {
    console.log(process.env.number);
    food.push(ws);
    publish("food", ws);
    
});

router.ws("/travel", (ws, req) => {
    console.log(process.env.number);
    travel.push(ws);
    publish("travel", ws);
    
    
});

module.exports = router;
