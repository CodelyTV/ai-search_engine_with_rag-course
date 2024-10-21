/* eslint-disable no-console */
import "reflect-metadata";

import { OllamaEmbeddings } from "@langchain/ollama";

import { PostgresConnection } from "../PostgresConnection";

import jsonCourses from "./courses.json";

async function main(
	pgConnection: PostgresConnection,
	embeddingsGenerator: OllamaEmbeddings,
): Promise<void> {
	await Promise.all(
		jsonCourses.map(async (jsonCourse) => {
			const [embedding] = await embeddingsGenerator.embedDocuments([
				[
					`Name: ${jsonCourse.name}`,
					`Summary: ${jsonCourse.summary}`,
					`Categories: ${jsonCourse.categories.join(", ")}`,
				].join("|"),
			]);

			await pgConnection.sql`
				INSERT INTO mooc.courses (id, name, summary, categories, embedding)
				VALUES (
					${jsonCourse.id},
					${jsonCourse.name},
					${jsonCourse.summary},
					${jsonCourse.categories},
					${JSON.stringify(embedding)}
				);
			`;
		}),
	);
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

main(pgConnection, embeddingsGenerator)
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await pgConnection.end();
		console.log("Done!");

		process.exit(0);
	});
