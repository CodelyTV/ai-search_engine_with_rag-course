/* eslint-disable no-console */
import "reflect-metadata";

import { OllamaEmbeddings } from "@langchain/ollama";

import { container } from "../../contexts/shared/infrastructure/dependency-injection/diod.config";
import { PostgresConnection } from "../../contexts/shared/infrastructure/postgres/PostgresConnection";

async function main(
	query: string,
	connection: PostgresConnection,
	embeddingsGenerator: OllamaEmbeddings,
): Promise<void> {
	const embedding = `[${(await embeddingsGenerator.embedQuery(query)).join(",")}]`;

	const results = await connection.sql`
		SELECT id, name, summary, categories, published_at
		FROM mooc.courses
		ORDER BY (embedding <-> ${embedding})
		LIMIT 3;
	`;

	console.log(`For the query "${query}" the results are:`, results);
}

const pgConnection = container.get(PostgresConnection);

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
