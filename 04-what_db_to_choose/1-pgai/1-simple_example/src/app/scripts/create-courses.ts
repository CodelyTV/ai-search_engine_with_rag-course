/* eslint-disable no-console */
import "reflect-metadata";

import { PostgresConnection } from "../PostgresConnection";

import jsonCourses from "./courses.json";

async function main(pgConnection: PostgresConnection): Promise<void> {
	await Promise.all(
		jsonCourses.map(async (jsonCourse) => {
			await pgConnection.sql`
				INSERT INTO mooc.courses (id, name, summary, categories)
				VALUES (
					${jsonCourse.id},
					${jsonCourse.name},
					${jsonCourse.summary},
					${jsonCourse.categories}
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

main(pgConnection)
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await pgConnection.end();
		console.log("Done!");

		process.exit(0);
	});
