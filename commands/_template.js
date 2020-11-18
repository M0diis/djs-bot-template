const Discord = require("discord.js");
var CONFIG = require("../config.json");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 * @param {string} cmd
 */

module.exports.run = async (client, message, cmd, args) =>
{
    console.log(`Executing ${cmd} command...`);

    const embed = new Discord.MessageEmbed()
        .setFooter(`Issued by ${message.author.tag}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setColor("#f26a41");

}

module.exports.help = {
    name: 'cmdname',
    aliases: ['cmdalias']
};