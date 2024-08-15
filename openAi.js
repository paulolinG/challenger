const OpenAi = require("openai");
const dotenv = require("dotenv");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = openai;
