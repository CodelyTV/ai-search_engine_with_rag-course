/* eslint-disable no-console */
import "reflect-metadata";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {
	DistanceStrategy,
	PGVectorStore,
} from "@langchain/community/vectorstores/pgvector";
import { Document } from "@langchain/core/documents";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PoolConfig } from "pg";

async function main(
	vectorStorePromise: Promise<PGVectorStore>,
	llm: ChatOllama,
): Promise<void> {
	const directoryLoader = new DirectoryLoader("./codely", {
		".pdf": (path: string): PDFLoader =>
			new PDFLoader(path, {
				splitPages: false,
			}),
	});

	const documents = await directoryLoader.load();

	const formattedDocuments = await Promise.all(
		documents.map(async (document) => {
			const content = await llm.invoke(
				`
Resume el siguiente contenido en 3 frases siguiendo estas reglas:
 * Devuelve directamente el texto, no digas gracias ni nada por el estilo.
 * No digas lo siento.
 * No incluyas información que no esté en el texto.
 * Haz el resumen en castellano.
 * No digas que no tienes información, siempre puedes hacer un resumen.

El texto a resumir:
\`\`\`
${document.pageContent}
\`\`\`
`.trim(),
			);

			return new Document({
				pageContent: content.content as string,
				metadata: document.metadata,
			});
		}),
	);

	console.log(documents);

	const vectorStore = await vectorStorePromise;

	await vectorStore.addDocuments(formattedDocuments);
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
const llm = new ChatOllama({ model: "llama3.1:8b", temperature: 5 });

main(vectorStore, llm)
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		console.log("Done!");

		process.exit(0);
	});
