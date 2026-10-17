
const {
  Client,
  GatewayIntentBits
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const WELCOME_CHANNEL_ID = '1559293373750186006';

client.once('ready', () => {
  console.log(`${client.user.tag} aktif!`);
});

client.on('guildMemberAdd', async (member) => {
  try {
    const channel = await member.guild.channels.fetch(
      WELCOME_CHANNEL_ID
    );

    if (!channel || !channel.isTextBased()) return;

    const message = await channel.send(
      `selam cnm hoş geldin ${member}`
    );

    setTimeout(() => {
      message.delete().catch(() => {});
    }, 5000);

  } catch (error) {
    console.error('Karşılama mesajı gönderilemedi:', error);
  }
});

client.login(process.env.DISCORD_TOKEN);
