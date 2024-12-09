/* eslint-disable no-console */
import "reflect-metadata";

import {
	DistanceStrategy,
	PGVectorStore,
} from "@langchain/community/vectorstores/pgvector";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { pull } from "langchain/hub";
import { PoolConfig } from "pg";

async function main(
	query: string,
	vectorStorePromise: Promise<PGVectorStore>,
): Promise<void> {
	const vectorStore = await vectorStorePromise;

	const similarCourses = await vectorStore.similaritySearch(query, 2);

	console.log(
		`For the query "${query}" the results are:`,
		similarCourses.map((result) => result.metadata),
	);

	// https://smith.langchain.com/hub/rlm/rag-prompt
	const prompt = await pull<ChatPromptTemplate>("rlm/rag-prompt");

	const llm = new ChatOllama({ model: "llama3.1:8b", temperature: 5 });

	const ragChain = await createStuffDocumentsChain({
		llm,
		prompt,
		outputParser: new StringOutputParser(),
	});

	const retriever = vectorStore.asRetriever();
	const retrievedDocs = await retriever.invoke(query);

	const response = await ragChain.invoke({
		question: query,
		context: retrievedDocs,
	});

	console.log(response);

	await vectorStore.end();
}

const vectorStore = PGVectorStore.initialize(
	new OllamaEmbeddings({
		model: "nomic-embed-text",
		baseUrl: "http://localhost:11434",
	}),
	{
		postgresConnectionOptions: {
			type: "postgres",
			host: "localhost",
			port: 5432,
			user: "codely",
			password: "c0d3ly7v",
			database: "postgres",
		} as PoolConfig,
		tableName: "mooc.courses",
		columns: {
			idColumnName: "id",
			contentColumnName: "content",
			metadataColumnName: "metadata",
			vectorColumnName: "embedding",
		},
		distanceStrategy: "cosine" as DistanceStrategy,
	},
);

main(process.argv[2], vectorStore)
	.catch(console.error)
	.finally(async () => {
		console.log("Done!");

		process.exit(0);
	});
