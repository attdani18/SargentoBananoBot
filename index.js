const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const frasesTropicales = [
  '¡Dijeron MONO! ¡Permiso, que esto se pone tropical!',
  '¡Banano detectado, nivel de sabrosura aumentando!',
  '¡Explosión tropical inminente!',
  '¡Péguele al mono que se nos va!',
  '¡Puerto Banano nunca se rinde!',
  '¡Hora de la operación sabrosura!'
];

const gifsMonos = [
  'https://media.tenor.com/SZdi4B2MZqwAAAAC/monkey-shoot.gif',
  'https://media.tenor.com/JZMbPXX6kB4AAAAC/monke-shoot.gif',
  'https://media.tenor.com/fmXt2NdKP2kAAAAC/gun-monkey.gif',
  'https://media.tenor.com/N9SSMH09_H8AAAAC/monkey.gif'
];

let contador = 0;

client.once('ready', () => {
  console.log(`¡Sargento Banano está en línea como ${client.user.tag}!`);

  // Mensaje automático cada 15 minutos
  setInterval(() => {
    const canal = client.channels.cache.find(c => c.name === 'muelle-general' && c.isTextBased());
    if (canal) {
      const frase = frasesTropicales[Math.floor(Math.random() * frasesTropicales.length)];
      const gif = gifsMonos[Math.floor(Math.random() * gifsMonos.length)];
      canal.send(`${frase}\n${gif}`);
    }
  }, 15 * 60 * 1000);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  const contenido = message.content.toLowerCase();

  if (contenido === '!tirar') {
    contador += 5;
    message.reply(`¡BANG! ¡Le diste al mono! +5 puntos (Total: ${contador})`);
  }

  const palabrasClave = ['mono', 'banano', 'explosión'];
  if (palabrasClave.some(p => contenido.includes(p))) {
    const respuesta = frasesTropicales[Math.floor(Math.random() * frasesTropicales.length)];
    message.channel.send(respuesta);
  }

  if (message.attachments.size > 0 || message.content.includes('https://tenor.com')) {
    message.channel.send('¡Qué sabrosura visual! Esto se va directo a los archivos del comando.');
  }
});

client.login(process.env.DISCORD_TOKEN);