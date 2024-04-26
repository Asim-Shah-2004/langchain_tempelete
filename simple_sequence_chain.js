import { config } from "dotenv";
config();

import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { SimpleSequentialChain, LLMChain } from "langchain/chains";

const llm = new OpenAI({ apiKey: process.env.API_KEY, temperature: 0 });

const template1 = `
You are a helpful bot that creates a 'thank you' response text.
If customers are unsatisfied, offer them a real world assistant to talk to.
You will get a sentiment and subject as input and evaluate.

text: {input}
`;

const template2 = `You are an assistant bot. Your job is to make the customer feel heard and understood.
Reflect on the input you receive.

text: {input}
`;

const prompt1 = new PromptTemplate({ template: template1, inputVariables: ["input"] });
const prompt2 = new PromptTemplate({ template: template2, inputVariables: ["input"] });

const chain1 = new LLMChain({ llm: llm, prompt: prompt1 });
const chain2 = new LLMChain({ llm: llm, prompt: prompt2 });

const overallChain = new SimpleSequentialChain({
    chains: [chain1, chain2],
    verbose: true
});

const result = await overallChain.run({
    input: "I ordered Pizza Salami and it was awful!"
})

console.log(result);