
const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Send Verification Message')
        .setDefaultMemberPermissions('0'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
        .setTitle("Minecraft Verification")
        .setDescription(`Click the button to verify and gain access to the whole server, once the verification is complete you can access the server as usual!`)
        .setColor("#6a5acd");
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('verify')
            .setLabel('Verify')
            .setStyle('Primary')
        )
        const channel = interaction.channel;
        await channel.send({embeds: [embed], components: [row]});
        interaction.reply({content: "Verification Message Sent!", ephemeral: true});
    }
}


