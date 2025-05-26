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
const puntos = {};
let cooldownActivo = false;

const personajes = [
  'https://i.imgur.com/2n0kFZO.gif',
  'https://i.imgur.com/7ydZ0pG.gif',
  'https://i.imgur.com/5W2tw9L.gif',
  'https://i.imgur.com/K8FvYvG.gif',
  'https://i.imgur.com/E5IuAvT.png',
  'https://i.imgur.com/lZ9cbF6.jpeg',
  'https://i.imgur.com/yDbd9OZ.jpeg',
  'https://media.tenor.com/kMNyQZy8KyoAAAAC/yuno-gasai-yandere.gif',
  'https://media.tenor.com/MLsCbnQGPhEAAAAC/anime-hot.gif',
  'https://media.tenor.com/mCAj-wKqB_gAAAAd/banano-tropical.gif'
];

client.once('ready', () => {
  console.log(`¡Sargento Banano está en línea como ${client.user.tag}!`);
});

// Comandos
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const contenido = message.content.toLowerCase();
  const usuario = message.author.username;

  if (contenido === '!tirar') {
    puntos[usuario] = (puntos[usuario] || 0) + 5;
    message.reply('¡BANG! ¡Le diste al mono! +5 puntos');
  }

  if (contenido === '!ranking') {
    if (Object.keys(puntos).length === 0) {
      message.channel.send('Nadie ha disparado al mono aún.');
    } else {
      const ranking = Object.entries(puntos)
        .sort((a, b) => b[1] - a[1])
        .map(([usuario, score], i) => `${i + 1}. ${usuario}: ${score} puntos`)
        .join('\n');
      message.channel.send(`🏆 **Ranking del Mono:**\n${ranking}`);
    }
  }

  if (contenido === '!call') {
    if (cooldownActivo) {
      message.reply('¡Aguantá! Solo se puede lanzar waifus cada 30 minutos.');
      return;
    }

    cooldownActivo = true;
    puntos[usuario] = (puntos[usuario] || 0) + 5;
    message.channel.send(`¡${usuario} lanzó una ronda de personajes! +5 puntos`);

    const canal = client.channels.cache.get(canalID);
    if (!canal) {
      message.channel.send('Error: No se encontró el canal.');
      return;
    }

    for (let i = 0; i < 5; i++) {
      const img = personajes[Math.floor(Math.random() * personajes.length)];
      const valor = Math.floor(Math.random() * 401) + 100; // entre 100 y 500
      await canal.send({ content: `🌟 Valor: ${valor} bananas`, files: [img] });
    }

    // Cooldown de 30 minutos
    setTimeout(() => {
      cooldownActivo = false;
      canal.send('¡La próxima ronda de personajes ya está disponible! Usá `!call` para lanzarla.');
    }, 30 * 60 * 1000);
  }
});

// Servidor HTTP para mantener Railway activo
app.get('/', (req, res) => res.send('Sargento Banano activo'));
app.listen(3000, () => console.log('Servidor HTTP corriendo en puerto 3000'));

client.login(process.env.DISCORD_TOKEN);
