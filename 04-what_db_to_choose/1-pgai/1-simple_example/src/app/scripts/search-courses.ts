/* eslint-disable no-console */
import "reflect-metadata";

import { PostgresConnection } from "../PostgresConnection";

async function main(
	query: string,
	pgConnection: PostgresConnection,
): Promise<void> {
	const results = await pgConnection.sql`
		SELECT
		  name,
		  summary,
		  categories,
		  embedding <=>  ai.ollama_embed('nomic-embed-text', ${query}, host => 'http://host.docker.internal:11434') as distance
		FROM mooc.courses_embedding
		ORDER BY distance
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

main(process.argv[2], pgConnection)
	.catch(console.error)
	.finally(async () => {
		await pgConnection.end();
		console.log("Done!");

		process.exit(0);
	});
