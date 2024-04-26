import dotenv from "dotenv";
dotenv.config();
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.API_KEY
});



async function chat(input) {
    const messages = [{ role: 'user', content: input }];
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0
    });
    return response.choices[0].message;
}

const question = "what is the capital of france";

const promptTemplate = `
    be very funny while answering questions
    Question : {question}
`

const prompt = promptTemplate.replace("{question}",question)

chat(prompt)
    .then((response) => console.log(response))
    .catch((err) => console.log(err));

