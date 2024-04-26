/**
 * this is basically to format output according to our needs
 * (not working perfectly)
 */

import { config } from "dotenv";
config();

import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

const llm = new OpenAI({ apiKey: process.env.API_KEY, temperature: 0 });

const parser = StructuredOutputParser.fromNamesAndDescriptions({
    answer: "answer to users questions"
});

const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
    template: "be very funny while answering questions \n Question: {input}",
    inputVariables: ["input"],
    partialVariables: { formatInstructions: formatInstructions }
});

const input = await prompt.format({
    input: "what is the capital of france"
});

console.log(input);

const response = await llm.call(input);

console.log(response);

console.log(await parser.parse(response));
