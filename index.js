require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const frasesTropicales = [
  '¡Dijeron MONO! ¡Permiso, que esto se pone tropical!',
  '¡Banano detectado, nivel de sabrosura aumentando!',
  '¡Explosión tropical inminente!',
  '¡Péguele al mono que se nos va!',
  '¡Puerto Banano nunca se rinde!',
  '¡Hora de la operación sabrosura!',
  '¡Disparen al mono antes de que se escape!'
];

const gifsMonos = [
  'https://media.tenor.com/SZdi4B2MZqwAAAAC/monkey-shoot.gif',
  'https://media.tenor.com/JZMbPXX6kB4AAAAC/monke-shoot.gif',
  'https://media.tenor.com/fmXt2NdKP2kAAAAC/gun-monkey.gif',
  'https://media.tenor.com/N9SSMH09_H8AAAAC/monkey.gif'
];

const personajes = [
  'https://media.tenor.com/C8p9QbfuGpYAAAAC/waifu-anime.gif',
  'https://media.tenor.com/SK2aPf4YYRgAAAAd/waifu-toradora.gif',
  'https://media.tenor.com/XY9QmBme7nQAAAAC/waifu-hearts.gif',
  'https://media.tenor.com/_yDQk09dPfQAAAAC/waifu-love.gif',
  'https://i.imgur.com/E5IuAvT.png',
  'https://i.imgur.com/lZ9cbF6.jpeg',
  'https://i.imgur.com/yDbd9OZ.jpeg'
];

let contador = 0;

client.once('ready', () => {
  console.log(`¡Sargento Banano está en línea como ${client.user.tag}!`);

  const canal = client.channels.cache.find(c => c.name === 'muelle-general' && c.isTextBased());
  if (!canal) {
    console.log('No se encontró el canal muelle-general.');
    return;
  }

  // Mensaje automático de monos cada 10 minutos
  setInterval(() => {
    const frase = frasesTropicales[Math.floor(Math.random() * frasesTropicales.length)];
    const gif = gifsMonos[Math.floor(Math.random() * gifsMonos.length)];
    canal.send(`${frase}\n${gif}`);
  }, 10 * 60 * 1000); // cada 10 minutos

  // Mensaje automático de waifus/memes cada 20 minutos
  setInterval(() => {
    const personaje = personajes[Math.floor(Math.random() * personajes.length)];
    canal.send(`🌟 ¡Nuevo personaje apareció! ¿Quién lo reclama?\n${personaje}`);
  }, 20 * 60 * 1000); // cada 20 minutos
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  const contenido = message.content.toLowerCase();

  if (contenido === '!tirar') {
    contador += 5;
    message.reply(`¡BANG! ¡Le diste al mono! +5 puntos (Total: ${contador})`);
  }

  if (contenido === '!ranking') {
    message.channel.send(`🏆 Puntaje total acumulado: ${contador} puntos.`);
  }

  const palabrasClave = ['mono', 'banano', 'explosión'];
  if (palabrasClave.some(p => contenido.includes(p))) {
    const respuesta = frasesTropicales[Math.floor(Math.random() * frasesTropicales.length)];
    message.channel.send(respuesta);
  }

  if (message.attachments.size > 0 || message.content.includes('https://tenor.com')) {
    message.channel.send('📸 ¡Qué sabrosura visual! Esto se va directo a los archivos del comando.');
  }
});

client.login(process.env.DISCORD_TOKEN);