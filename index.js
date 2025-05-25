require('dotenv').config();
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
app.get('/', (req, res) => res.send('Sargento Banano activo'));
app.listen(3000, () => console.log('Servidor HTTP corriendo en puerto 3000'));

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

function cicloMonos() {
  const canal = client.channels.cache.get('1370495546321666108');
  if (canal) {
    const frase = frasesTropicales[Math.floor(Math.random() * frasesTropicales.length)];
    const gif = gifsMonos[Math.floor(Math.random() * gifsMonos.length)];
    canal.send(`${frase}\n${gif}`);
  }
  setTimeout(cicloMonos, 10 * 60 * 1000);
}

function cicloWaifus() {
  const canal = client.channels.cache.get('1370495546321666108');
  if (canal) {
    const personaje = personajes[Math.floor(Math.random() * personajes.length)];
    canal.send(`🌟 ¡Nuevo personaje apareció! ¿Quién lo reclama?\n${personaje}`);
  }
  setTimeout(cicloWaifus, 20 * 60 * 1000);
}

client.once('ready', () => {
  console.log(`¡Sargento Banano está en línea como ${client.user.tag}!`);
  setTimeout(cicloMonos, 10 * 1000);
  setTimeout(cicloWaifus, 30 * 1000);
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