import { config } from "dotenv";
config();

import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";

const model = new OpenAI({apiKey: process.env.API_KEY, temperature: 0.7});

const template = `
    be funny while answering questions\n
    Question : {question}
`;
const prompt = new PromptTemplate({template, inputVariables: ["question"]});

const chain = new LLMChain({llm: model, prompt});

const result = await chain.call({question: "what is the capital of France?"});
console.log(result);
