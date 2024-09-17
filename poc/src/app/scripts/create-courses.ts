/* eslint-disable no-console */
import "reflect-metadata";

import { Course } from "../../contexts/mooc/courses/domain/Course";
import { PostgresCourseRepository } from "../../contexts/mooc/courses/infrastructure/PostgresCourseRepository";
import { container } from "../../contexts/shared/infrastructure/dependency-injection/diod.config";
import { PostgresConnection } from "../../contexts/shared/infrastructure/postgres/PostgresConnection";

import jsonCourses from "./courses.json";

async function main(): Promise<void> {
	const repository = container.get(PostgresCourseRepository);
	const connection = container.get(PostgresConnection);

	await Promise.all(
		jsonCourses.map(async (jsonCourse) => {
			const course = Course.fromPrimitives(jsonCourse);

			await repository.save(course);
		}),
	);

	await connection.end();

	console.log("Done!");
}

main().catch(console.error);
