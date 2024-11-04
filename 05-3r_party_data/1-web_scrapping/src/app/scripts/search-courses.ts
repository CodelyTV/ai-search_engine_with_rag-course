/* eslint-disable no-console */
import "reflect-metadata";

import { OllamaEmbeddings } from "@langchain/ollama";

import { PostgresConnection } from "../PostgresConnection";

async function main(
	query: string,
	pgConnection: PostgresConnection,
	embeddingsGenerator: OllamaEmbeddings,
): Promise<void> {
	const embedding = await embeddingsGenerator.embedQuery(query);

	const results = await pgConnection.sql`
		SELECT name, summary, categories
		FROM mooc.courses
		ORDER BY (embedding <=> ${JSON.stringify(embedding)})
		LIMIT 3;
	`;

	console.log(`For the query "${query}" the results are:`, results);
}

const pgConnection = new PostgresConnection(
	"localhost",
	5432,
	"codely",
	"c0d3ly7v",
	"postgres",
);
const embeddingsGenerator = new OllamaEmbeddings({
	model: "nomic-embed-text",
	baseUrl: "http://localhost:11434",
});

main(process.argv[2], pgConnection, embeddingsGenerator)
	.catch(console.error)
	.finally(async () => {
		await pgConnection.end();
		console.log("Done!");

		process.exit(0);
	});
