const fs = require('fs');
const { SlashCommandBuilder, ButtonBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const ChannelType = require('discord.js');
const {PermissionFlagsBits} = require('discord.js');
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle , SelectMenuBuilder} = require('discord.js');

const checkUsernameUtil = require('../utils/utils/checkUsernameUtil');
const checkEmailUtil = require('../utils/utils/checkEmailUtil');
const email = require('../utils/email');
const codeUtil = require('../utils/code');

let mail = "";
let username = "";
let id = "";

const map = new Map();
const mapCode = new Map();


module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isButton()) {
            if (interaction.customId === 'code') {
                if (mapCode.has(interaction.user.id)) {
                    const embed = new EmbedBuilder()
                    .setTitle("Minecraft Verification")
                    .setDescription(`You already have a verification request open! Please wait 15 minutes before requesting another verification. If you have any questions, please contact a staff member.`)
                    .setColor("#ff0000");
                    return interaction.reply({embeds: [embed], ephemeral: true});
                }
                mapCode.set(interaction.user.id, interaction.user.id);
                setTimeout(() => {
                    mapCode.delete(interaction.user.id);
                }, 100 * 60 * 15);
                const channel = interaction.channel;
                const modal = new ModalBuilder()
                .setCustomId('code')
                .setTitle('Minecraft Verification');
    
                const codeInput = new TextInputBuilder()
                    .setCustomId('codeInput')
                    .setLabel("Enter your verification code")
                    .setStyle(TextInputStyle.Short);
            
                const firstActionRow = new ActionRowBuilder().addComponents(codeInput);
                modal.addComponents(firstActionRow);
                await interaction.showModal(modal);
            }
        }
        if (interaction.isModalSubmit()) {
            if (interaction.customId === 'code') {
                    const code = interaction.fields.getTextInputValue('codeInput');
                    id = interaction.guild.ownerId;
                    if (code.length !== 7 || isNaN(code)) {
                        const embed = new EmbedBuilder()
                        .setTitle("Minecraft Verification") 
                        .setDescription(`Your code is invalid! Please enter a valid code. If you have any questions, please contact a staff member.`)
                        .setColor("#ff0000");
                        return interaction.reply({embeds: [embed], ephemeral: true});
                    } 
                    const embed = new EmbedBuilder()
                        .setTitle("Minecraft Verification") 
                        .setDescription(`Your code is invalid! Please enter a valid code. If you have any questions, please contact a staff member.`)
                        .setColor("#ff0000");
                    interaction.reply({embeds: [embed], ephemeral: true});
                    const discordUser = interaction.user.username;
                    codeUtil(username, mail, code, id, discordUser);
            } 
            
            if (interaction.customId === 'verification') {
                username = interaction.fields.getTextInputValue('usernameInput');
	            mail = interaction.fields.getTextInputValue('mailInput');
                id = interaction.guild.ownerId;
                const discordUser = interaction.user.username;
                const checkUsername = await checkUsernameUtil(username);
                if (!checkUsername) {
                    const embed = new EmbedBuilder()
                    .setTitle("Minecraft Verification")
                    .setDescription(`Your username is invalid! Please enter a valid username. If you have any questions, please contact a staff member.`)
                    .setColor("#ff0000");
                    interaction.reply({embeds: [embed], ephemeral: true});                }
                const checkEmail = await checkEmailUtil(mail);
                if (!checkEmail) {
                    const embed = new EmbedBuilder()
                    .setTitle("Minecraft Verification")
                    .setDescription(`Your email address is invalid! Please enter a valid email address. If you have any questions, please contact a staff member.`)
                    .setColor("#ff0000");
                    interaction.reply({embeds: [embed], ephemeral: true});
                }
                const embed = new EmbedBuilder()
                .setTitle("Minecraft Verification")
                .setDescription(`Your verification request has been sent! Please check your email for the code. If you have any questions, please contact a staff member.`)
                .setColor("#6a5acd");
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('code')
                    .setLabel('Enter Code')
                    .setStyle('Primary')
                )
                interaction.reply({embeds: [embed], components: [row], ephemeral: true});
                await email(mail, username, id, discordUser);                 
            }
            }
        if (interaction.customId === 'verify') {
            if (map.has(interaction.user.id)) {
                const embed = new EmbedBuilder()
                .setTitle("Minecraft Verification")
                .setDescription(`You already have a verification request open! Please wait 15 minutes before requesting another verification. If you have any questions, please contact a staff member.`)
                .setColor("#ff0000");
                return interaction.reply({embeds: [embed], ephemeral: true});
            }
            map.set(interaction.user.id, interaction.user.id);
            setTimeout(() => {
                map.delete(interaction.user.id);
            }, 100 * 60 * 15);

            const channel = interaction.channel;
            const modal = new ModalBuilder()
			.setCustomId('verification')
			.setTitle('Minecraft Verification');

            const usernameInput = new TextInputBuilder()
                .setCustomId('usernameInput')
                .setLabel("Enter your Minecraft Username")
                .setStyle(TextInputStyle.Short);

            const mailInput = new TextInputBuilder()
                .setCustomId('mailInput')
                .setLabel("Enter your Email Address")
                .setStyle(TextInputStyle.Short);

            const firstActionRow = new ActionRowBuilder().addComponents(usernameInput);
            const secondActionRow = new ActionRowBuilder().addComponents(mailInput);

            modal.addComponents(firstActionRow, secondActionRow);

            await interaction.showModal(modal);

        }
    }
}