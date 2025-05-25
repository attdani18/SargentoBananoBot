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
  'https://i.imgur.com/ZKXzNya.gif',
  'https://i.imgur.com/yJolD2z.gif',
  'https://i.imgur.com/wlEVUvt.gif',
  'https://i.imgur.com/Dch8Srn.gif'
];

const personajes = [
  'https://i.imgur.com/2n0kFZO.gif',
  'https://i.imgur.com/7ydZ0pG.gif',
  'https://i.imgur.com/5W2tw9L.gif',
  'https://i.imgur.com/K8FvYvG.gif',
  'https://i.imgur.com/E5IuAvT.png',
  'https://i.imgur.com/lZ9cbF6.jpeg',
  'https://i.imgur.com/yDbd9OZ.jpeg'
];

let contador = 0;

async function cicloMonos() {
  try {
    const canal = await client.channels.fetch('1370495546321666108');
    if (canal) {
      const frase = frasesTropicales[Math.floor(Math.random() * frasesTropicales.length)];
      const gif = gifsMonos[Math.floor(Math.random() * gifsMonos.length)];
      console.log(`[MONO] Enviando: ${frase} + ${gif}`);
      await canal.send(`${frase}\n${gif}`);
    } else {
      console.log('[MONO] Canal no encontrado');
    }
  } catch (error) {
    console.log('[MONO] Error:', error.message);
  }

  setTimeout(cicloMonos, 10 * 60 * 1000);
}

async function cicloWaifus() {
  try {
    const canal = await client.channels.fetch('1370495546321666108');
    if (canal) {
      const personaje = personajes[Math.floor(Math.random() * personajes.length)];
      console.log(`[WAIFU] Enviando personaje: ${personaje}`);
      await canal.send(`🌟 ¡Nuevo personaje apareció! ¿Quién lo reclama?\n${personaje}`);
    } else {
      console.log('[WAIFU] Canal no encontrado');
    }
  } catch (error) {
    console.log('[WAIFU] Error:', error.message);
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