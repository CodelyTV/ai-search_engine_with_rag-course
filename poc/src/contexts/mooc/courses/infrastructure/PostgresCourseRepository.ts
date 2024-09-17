import { Service } from "diod";

import { PostgresRepository } from "../../../shared/infrastructure/postgres/PostgresRepository";
import { Course } from "../domain/Course";
import { CourseId } from "../domain/CourseId";
import { CourseRepository } from "../domain/CourseRepository";

type DatabaseCourseRow = {
	id: string;
	name: string;
	summary: string;
	categories: string[];
	embedding: string;
};

@Service()
export class PostgresCourseRepository
	extends PostgresRepository<Course>
	implements CourseRepository
{
	async save(course: Course): Promise<void> {
		const userPrimitives = course.toPrimitives();
		const embedding = "";

		await this.execute`
			INSERT INTO mooc.courses (id, name, summary, categories, embedding)
			VALUES (
				${userPrimitives.id},
				${userPrimitives.name},
				${userPrimitives.summary},
				${userPrimitives.categories},
				${embedding}
			)
			ON CONFLICT (id) DO UPDATE SET
				name = EXCLUDED.name,
				summary = EXCLUDED.summary,
				categories = EXCLUDED.categories,
				embedding = EXCLUDED.embedding;
		`;
	}

	async search(id: CourseId): Promise<Course | null> {
		return await this.searchOne`
			SELECT id, name, summary, categories
			FROM mooc.courses
			WHERE id = ${id.value};
		`;
	}

	async searchAll(): Promise<Course[]> {
		return await this.searchMany`
			SELECT id, name, summary, categories
			FROM mooc.courses;
		`;
	}

	protected toAggregate(row: DatabaseCourseRow): Course {
		return Course.fromPrimitives({
			id: row.id,
			name: row.name,
			summary: row.summary,
			categories: row.categories,
		});
	}
}
