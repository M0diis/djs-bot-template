const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const PREFIX = "!";
const CONFIG = require("./config.json");

client.commands = new Map();

client.on('ready', () =>
{
    console.info(`Logged in as ${client.user.tag}!`);

    client.user.setActivity('Hello.', { type: 'PLAYING' });

    fs.readdir('./commands/', (error, files) =>
    {
        if (error) throw error;

        files.forEach(file =>
        {
            if (!file.endsWith('.js')) return;

            try
            {
                const properties = require(`./commands/${file}`);

                properties.help.aliases.forEach(alias =>
                {
                    client.commands.set(alias, properties);
                });

                client.commands.set(properties.help.name, properties);
            }
            catch (error)
            {
                throw error;
            }
        });
    });
});

client.on('message', message =>
{
    const embed = new Discord.MessageEmbed()
        .setAuthor("")
        .setColor("#32CD32");

    if (message.content[0] != PREFIX) return;

    var args = message.content.substring(1).split(" ");

    // `Cmd` definition
    var cmd = args.shift();

    var joinedArgs = restArguments(args, 0);

    const command = client.commands.get(cmd);

    if (command) command.run(client, message, cmd, args);

    if (!command)
    {
        embed.setDescription(`
        The command: \`${PREFIX}${cmd}\` is not recognised. 
        
        The prefix for this server is: \`${PREFIX}\`
        For a list of commands, use \`${PREFIX}\`help`
        );

        return message.channel.send(embed);
    }
});

/**
 * Returns concatted arguments from specific (`0 based`) index (to another)
 * 
 * @param {String[]} args 
 * @param {number} from
 * @param {number} to
 * @returns {String} Concatted arguments
 */

function restArguments(args, from, to)
{
    return to == undefined ? args.splice(from, args.length).join(" ") : args.splice(from, to - from).join(" ");
}