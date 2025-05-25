const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const canalID = '1370495546321666108';

// Lista de frases para "mono"
const frasesMono = [
  '¡Disparen al mono!',
  '¡BANG BANG! ¡No dejen que escape el mono!',
  '¿Dijeron MONO? ¡Permiso, que esto se pone tropical!',
  '¡Alerta tropical! ¡Hay un mono suelto!',
];

// Lista de URLs de gifs de waifus, memes, etc
const galeria = [
  'https://media.tenor.com/kMNyQZy8KyoAAAAC/yuno-gasai-yandere.gif',
  'https://media.tenor.com/MLsCbnQGPhEAAAAC/anime-hot.gif',
  'https://media.tenor.com/mCAj-wKqB_gAAAAd/banano-tropical.gif',
  'https://media.tenor.com/SsMkNyij1jMAAAAC/gun-monkey.gif',
  'https://media.tenor.com/lo4slEuzVksAAAAd/nerd-anime.gif',
  'https://media.tenor.com/IJJ_G_Z5dJkAAAAC/banana-monkey.gif',
  // Puedes agregar más de 10 mil si querés, con un JSON o desde un link externo
];

// Sistema de puntaje
const puntos = {};

// Comando !tirar
client.on('messageCreate', message => {
  if (message.content.toLowerCase() === '!tirar') {
    const usuario = message.author.username;
    puntos[usuario] = (puntos[usuario] || 0) + 5;
    message.reply('¡BANG! ¡Le diste al mono! +5 puntos');
  }

  if (message.content.toLowerCase() === '!ranking') {
    if (Object.keys(puntos).length === 0) {
      message.channel.send('Nadie ha disparado al mono aún.');
    } else {
      const ranking = Object.entries(puntos)
        .sort((a, b) => b[1] - a[1])
        .map(([usuario, puntaje], index) => `${index + 1}. ${usuario}: ${puntaje} puntos`)
        .join('\n');
      message.channel.send(`**Ranking del Mono:**\n${ranking}`);
    }
  }

  // Si mencionan la palabra "mono"
  if (message.content.toLowerCase().includes('mono')) {
    message.channel.send('¿Dijeron MONO? ¡Permiso, que esto se pone tropical!');
  }

  // Si alguien manda una imagen o link
  if (message.attachments.size > 0 || message.content.includes('http')) {
    message.channel.send('¡Qué sabrosura visual! Esto se va directo al archivo bananero.');
  }
});

// Mensajes automáticos cada cierto tiempo
client.once('ready', () => {
  console.log(`¡Sargento Banano está en línea como ${client.user.tag}!`);

  // Cada 10 minutos: mensaje de disparar al mono
  setInterval(() => {
    const canal = client.channels.cache.get(canalID);
    if (canal) {
      const frase = frasesMono[Math.floor(Math.random() * frasesMono.length)];
      canal.send(frase);
    }
  }, 10 * 60 * 1000);

  // Cada 20 minutos: enviar gif o imagen random
  setInterval(() => {
    const canal = client.channels.cache.get(canalID);
    if (canal) {
      const url = galeria[Math.floor(Math.random() * galeria.length)];
      canal.send({ content: '¡Sabrosura desbloqueada!', files: [url] });
    }
  }, 20 * 60 * 1000);
});

// Evitar que Railway duerma el bot
app.get('/', (req, res) => res.send('Bot activo'));
app.listen(3000, () => console.log('Servidor express activo'));

client.login(process.env.DISCORD_TOKEN);