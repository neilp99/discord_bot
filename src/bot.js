require('dotenv').config();

const { Client, Intents, WebhookClient } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const PREFIX = "$";

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

const webhookClient = new ebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN,
    );
      

client.on('message', async (message) => {
    if (messge.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim
            .substring(PREFIX.length)
            .split(/\s+/);

        if (CMD_NAME === 'kick') {
            if (args.length === 0) return message.reply('Please provide an ID');
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                    .kick()
                    .then((member) => message.channel.send(`${member} was kicked.`))
                    .catch((err) => message.channel.send('I do not have permissions :('));
            } else {
                message.channel.send('That member was not found');
            }
        } else if (CMD_NAME === 'ban') {
            if (!message.member.hasPermission('BAN_MEMBERS'))
                return message.reply("You do not have permissions to use that command");
            if (args.length === 0) return message.reply("Please provide an ID");

            try {
                const user = await message.guildmembers.ban(args[0]);
                message.channel.send('User was banned successfully');
            } catch (err) {
                console.log(err);
                message.channel.send('An error occured. Either I do not have permissions or the user was not found.');
            }
        } else if (CMD_NAME === 'announce') {
            console.log(args);
            const msg = args.join(' ');
            console.log(msg);
            webhookClient.send(msg);
        }
    }
});

client.on('message', message => {
    if (message.content === '+ping') {
        message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
