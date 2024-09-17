import "reflect-metadata";

import { PostgresCourseRepository } from "../../contexts/mooc/courses/infrastructure/PostgresCourseRepository";
import { container } from "../../contexts/shared/infrastructure/dependency-injection/diod.config";

async function main(): Promise<void> {
	const repository = container.get(PostgresCourseRepository);

	const courses = await repository.searchAll();

	await Promise.all(courses.map((course) => repository.save(course)));
}

main().catch(console.error);
