import { config } from "dotenv";
config()

import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAI } from "@langchain/openai";
import { RetrievalQAChain,loadQAStuffChain } from "langchain/chains";

const embeddings = new OpenAIEmbeddings({apiKey:process.env.API_KEY});
const vectorStore = await FaissStore.load("./", embeddings);

const model = new OpenAI({ apiKey:process.env.API_KEY,temperature: 0 });

const chain = new RetrievalQAChain({
  combineDocumentsChain: loadQAStuffChain(model),
  retriever: vectorStore.asRetriever(),
  returnSourceDocuments: true,
});

const res = await chain.call({
  query: "When does the restaurant open on friday?",
});
console.log(res.text);