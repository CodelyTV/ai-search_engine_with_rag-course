/* eslint-disable no-console */
import "reflect-metadata";

import { CourseId } from "../../contexts/mooc/courses/domain/CourseId";
import { PostgresCourseRepository } from "../../contexts/mooc/courses/infrastructure/PostgresCourseRepository";
import { container } from "../../contexts/shared/infrastructure/dependency-injection/diod.config";
import { PostgresConnection } from "../../contexts/shared/infrastructure/postgres/PostgresConnection";

async function main(): Promise<void> {
	const repository = container.get(PostgresCourseRepository);
	const connection = container.get(PostgresConnection);

	const ids = [
		// Vue 3: Novedades aplicadas al mundo real
		new CourseId("qoh2"),
		// Buenas prácticas con CSS: Layouts
		new CourseId("2eym"),
		// Migrando a VueJS progresivamente
		new CourseId("j685"),
	];

	const similarCourses = await repository.searchSimilar(ids);

	console.log(similarCourses);
	await connection.end();
}

main().catch(console.error);
