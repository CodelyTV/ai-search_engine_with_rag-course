/* eslint-disable no-console */
import "reflect-metadata";

import { Course } from "../../contexts/mooc/courses/domain/Course";
import { PostgresCourseRepository } from "../../contexts/mooc/courses/infrastructure/PostgresCourseRepository";
import { container } from "../../contexts/shared/infrastructure/dependency-injection/diod.config";
import { PostgresConnection } from "../../contexts/shared/infrastructure/postgres/PostgresConnection";

import jsonCourses from "./courses.json";

async function main(repository: PostgresCourseRepository): Promise<void> {
	await Promise.all(
		jsonCourses.map(async (jsonCourse) => {
			const course = Course.fromPrimitives({
				...jsonCourse,
				publishedAt: new Date(jsonCourse.published_at),
			});

			await repository.save(course);
		}),
	);
}

main(container.get(PostgresCourseRepository))
	.catch(console.error)
	.finally(async () => {
		await container.get(PostgresConnection).end();
		console.log("Done!");

		process.exit(0);
	});
