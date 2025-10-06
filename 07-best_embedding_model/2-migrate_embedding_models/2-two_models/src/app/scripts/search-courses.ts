/* eslint-disable no-console */
import "reflect-metadata";

import { OllamaEmbeddings } from "@langchain/ollama";

import { container } from "../../contexts/shared/infrastructure/dependency-injection/diod.config";
import { PostgresConnection } from "../../contexts/shared/infrastructure/postgres/PostgresConnection";

async function main(
	query: string,
	connection: PostgresConnection,
	nomicEmbeddingsGenerator: OllamaEmbeddings,
	gemmaEmbeddingsGenerator: OllamaEmbeddings,
): Promise<void> {
	const nomicEmbedding = `[${(await nomicEmbeddingsGenerator.embedQuery(query)).join(",")}]`;

	const nomicResults = await connection.sql`
		SELECT name
		FROM mooc.courses
		ORDER BY (embedding <=> ${nomicEmbedding})
		LIMIT 3;
	`;

	const gemmaEmbedding = `[${(await gemmaEmbeddingsGenerator.embedQuery(query)).join(",")}]`;

	const gemmaResults = await connection.sql`
		SELECT name
		FROM mooc.courses
		ORDER BY (embedding_gemma <=> ${gemmaEmbedding})
		LIMIT 3;
	`;

	console.log("Top 3 results for nomic:", nomicResults);
	console.log("\nTop 3 results for gemma:", gemmaResults);
}

const pgConnection = container.get(PostgresConnection);

const nomicEmbeddingsGenerator = new OllamaEmbeddings({
	model: "nomic-embed-text",
	baseUrl: "http://localhost:11434",
});

const gemmaEmbeddingsGenerator = new OllamaEmbeddings({
	model: "embeddinggemma:300m",
	baseUrl: "http://localhost:11434",
});

main(
	process.argv[2],
	pgConnection,
	nomicEmbeddingsGenerator,
	gemmaEmbeddingsGenerator,
)
	.catch(console.error)
	.finally(async () => {
		await pgConnection.end();
		console.log("Done!");

		process.exit(0);
	});
