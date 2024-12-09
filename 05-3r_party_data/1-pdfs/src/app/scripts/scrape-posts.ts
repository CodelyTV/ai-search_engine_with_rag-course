/* eslint-disable no-console */
import "reflect-metadata";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {
	DistanceStrategy,
	PGVectorStore,
} from "@langchain/community/vectorstores/pgvector";
import { OllamaEmbeddings } from "@langchain/ollama";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PoolConfig } from "pg";

async function main(vectorStorePromise: Promise<PGVectorStore>): Promise<void> {
	const directoryLoader = new DirectoryLoader("./codely", {
		".pdf": (path: string): PDFLoader => new PDFLoader(path),
	});

	const documents = await directoryLoader.load();

	console.log(documents);

	const vectorStore = await vectorStorePromise;

	await vectorStore.addDocuments(documents);
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
		tableName: "mooc.posts",
		columns: {
			idColumnName: "id",
			contentColumnName: "content",
			metadataColumnName: "metadata",
			vectorColumnName: "embedding",
		},
		distanceStrategy: "cosine" as DistanceStrategy,
	},
);

main(vectorStore)
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		console.log("Done!");

		process.exit(0);
	});
