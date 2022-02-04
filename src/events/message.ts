import { Client, Message, GuildMember } from 'discord.js';
import { config } from './../config';

module.exports = {
	name: 'messageCreate',
	once: false,
	execute: async (client: Client, ...args: Message[]) => {
		const msg = args[0];
		// use this if you don't want to use responds in DMs
		//	if (!msg.guild) return;

		if (msg.author.bot) return;

		const guildSettings = config.guildSettings.find(
			(guild) => guild.id === msg.guildId
		);

		if (!msg.member) return;

		if (!guildSettings) return;
		if (msg.content.indexOf(guildSettings.prefix) === 0) {
			runCommand(msg, client, guildSettings);
			return;
		}
	},
};

const runCommand = (msg: Message, client: Client, settings: any) => {
	const args = msg.content.slice(settings.prefix.length).split(' ');
	const commandArg = args.shift()?.toLowerCase();

	if (!client.commands.has(commandArg)) return;
	let command = client.commands.get(commandArg);

	command.execute(client, msg, args, settings);
};

