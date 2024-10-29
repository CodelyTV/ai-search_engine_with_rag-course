/* eslint-disable no-console */
import "reflect-metadata";

import { OllamaEmbeddings } from "@langchain/ollama";

import { PostgresConnection } from "../PostgresConnection";

async function searchByIds(
	pgConnection: PostgresConnection,
	ids: string[],
): Promise<{ name: string; summary: string; categories: string[] }[]> {
	return pgConnection.sql`
		SELECT id, name, summary, categories
		FROM mooc.courses
		WHERE id = ANY(${ids}::text[]);
	`;
}

async function main(
	courseIds: string[],
	pgConnection: PostgresConnection,
	embeddingsGenerator: OllamaEmbeddings,
): Promise<void> {
	const courses = await searchByIds(pgConnection, courseIds);

	const embedding = await embeddingsGenerator.embedQuery(
		courses
			.map((course) =>
				[
					`Name: ${course.name}`,
					`Summary: ${course.summary}`,
					`Categories: ${course.categories.join(", ")}`,
				].join("|"),
			)
			.join("\n"),
	);

	const results = await pgConnection.sql`
		SELECT name, summary, categories
		FROM mooc.courses
		WHERE id != ALL(${courseIds}::text[])
		ORDER BY (embedding <-> ${JSON.stringify(embedding)})
		LIMIT 3;
	`;

	console.log(`For the query "${courseIds}" the results are:`, results);
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

main(process.argv[2].split(","), pgConnection, embeddingsGenerator)
	.catch(console.error)
	.finally(async () => {
		await pgConnection.end();
		console.log("Done!");

		process.exit(0);
	});
