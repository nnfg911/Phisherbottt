
const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('webhook')
        .setDescription('Add or update a webhook.')
        .addStringOption(option => option.setName('webhook').setDescription('Sets your webhook for you.').setRequired(true))
        .setDefaultMemberPermissions('0'),
    async execute(interaction) {
        const id = interaction.user.id;
        const name = interaction.user.username;
        const webhook = interaction.options.getString('webhook');
        const isDiscordWebhook = (url) => {
            const webhookRegex = /^https:\/\/discord\.com\/api\/webhooks\/\d+\/[\w-]{68}$/;
            return webhookRegex.test(url);
        }
        if (!isDiscordWebhook(webhook)) {
            const embed = new EmbedBuilder()
                .setTitle('Invalid Webhook')
                .setDescription('The webhook you entered is invalid. Please try again.')
                .setColor('#6a5acd');
            interaction.reply({embeds: [embed], ephemeral: true});
            return;
        } else {
            try {
                await axios.get(webhook);
            }
            catch (error) {
                const embed = new EmbedBuilder()
                    .setTitle('Invalid Webhook')
                    .setDescription('The webhook you entered is invalid. Please try again.')
                    .setColor('#6a5acd');
                interaction.reply({embeds: [embed], ephemeral: true});
                return;
            }
        }

        if (await databaseUtil.userExists(id)) {
            databaseUtil.updateWebhook(id, webhook);
            const embed = new EmbedBuilder()
                .setTitle('Webhook Updated')
                .setDescription(`Your webhook has been updated to ||**${webhook}**||`)
                .setColor('#6a5acd');
            interaction.reply({embeds: [embed], ephemeral: true});
        } else {
            databaseUtil.addWebhook(id, name, webhook);
            const embed = new EmbedBuilder()
                .setTitle('Webhook Added')
                .setDescription(`Your webhook has been set to ||**${webhook}**||`)
                .setColor('#6a5acd');
            interaction.reply({embeds: [embed], ephemeral: true});
        }        
    }
}


