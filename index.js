require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const frases = [
  "¡A pelar el banano, mi gente! 🍌",
  "Puerto Banano no duerme, solo se activa. 🌴",
  "Aquí se jode con estilo y sabor tropical. 😎",
  "Si no es con gallo pinto, no es desayuno. 🇨🇷"
];

const burlas = [
  "¿Ese fue tu intento? Mejor poné música de fondo. 🎺",
  "Con ese comentario ni los monos se rieron. 🐒",
  "Tu IQ es más bajo que el nivel del mar en Limón. 🌊",
  "Decí que fue sarcasmo, por tu bien... 🙃"
];

const trivias = [
  {
    pregunta: "¿Cuál es la capital de Costa Rica?",
    respuesta: "San José"
  },
  {
    pregunta: "¿En qué año se abolió el ejército en Costa Rica?",
    respuesta: "1948"
  },
  {
    pregunta: "¿Cuál es el plato típico que lleva arroz, frijoles, carne y plátano?",
    respuesta: "Casado"
  }
];

client.on('ready', () => {
  console.log(`🟢 Sargento Banano listo como ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const contenido = message.content.toLowerCase();

  if (contenido === '!frase') {
    const frase = frases[Math.floor(Math.random() * frases.length)];
    message.channel.send(frase);
  }

  if (contenido === '!burlarse') {
    const burla = burlas[Math.floor(Math.random() * burlas.length)];
    message.channel.send(burla);
  }

  if (contenido === '!trivia') {
    const trivia = trivias[Math.floor(Math.random() * trivias.length)];
    message.channel.send(`❓ ${trivia.pregunta}\n(Respuesta: ||${trivia.respuesta}||)`);
  }
});

client.login(process.env.TOKEN);
