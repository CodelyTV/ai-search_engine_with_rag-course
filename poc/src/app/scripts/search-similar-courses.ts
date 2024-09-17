/* eslint-disable no-console */
import "reflect-metadata";

import { CourseId } from "../../contexts/mooc/courses/domain/CourseId";
import { PostgresCourseRepository } from "../../contexts/mooc/courses/infrastructure/PostgresCourseRepository";
import { container } from "../../contexts/shared/infrastructure/dependency-injection/diod.config";
import { PostgresConnection } from "../../contexts/shared/infrastructure/postgres/PostgresConnection";

async function main(): Promise<void> {
	const repository = container.get(PostgresCourseRepository);
	const connection = container.get(PostgresConnection);

	const courseIds = ["qoh2", "2eym", "j685"];

	const courses = (
		await Promise.all(
			courseIds.map(async (id) => {
				return await repository.search(new CourseId(id));
			}),
		)
	).filter((course) => course !== null);

	const similarCourses = await repository.searchSimilar(courses);

	console.log(similarCourses);
	await connection.end();
}

main().catch(console.error);
