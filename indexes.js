import { config } from "dotenv";
config();

import { TextLoader } from "langchain/document_loaders/fs/text";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";

const OPENAI_API_KEY = process.env.API_KEY;

if (!OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY environment variable is not set.");
  process.exit(1);
}

const loader = new TextLoader("./data.txt");

const docs = await loader.load();

const splitter = new CharacterTextSplitter({
  chunkSize: 200,
  chunkOverlap: 50,
});

const documents = await splitter.splitDocuments(docs);

const embeddings = new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY });

const vectorstore = await FaissStore.fromDocuments(documents, embeddings);

await vectorstore.save("./");