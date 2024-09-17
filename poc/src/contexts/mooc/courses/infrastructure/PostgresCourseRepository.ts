import { Primitives } from "@codelytv/primitives-type";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Service } from "diod";

import { PostgresConnection } from "../../../shared/infrastructure/postgres/PostgresConnection";
import { PostgresRepository } from "../../../shared/infrastructure/postgres/PostgresRepository";
import { Course } from "../domain/Course";
import { CourseId } from "../domain/CourseId";
import { CourseRepository } from "../domain/CourseRepository";

type DatabaseCourseRow = {
	id: string;
	name: string;
	summary: string;
	categories: string[];
};

@Service()
export class PostgresCourseRepository
	extends PostgresRepository<Course>
	implements CourseRepository
{
	private readonly embeddingsGenerator: OllamaEmbeddings;

	constructor(connection: PostgresConnection) {
		super(connection);

		this.embeddingsGenerator = new OllamaEmbeddings({
			model: "nomic-embed-text",
			baseUrl: "http://localhost:11434",
		});
	}

	async save(course: Course): Promise<void> {
		const userPrimitives = course.toPrimitives();
		const embedding = await this.generateEmbedding(userPrimitives);

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

	protected toAggregate(row: DatabaseCourseRow): Course {
		return Course.fromPrimitives({
			id: row.id,
			name: row.name,
			summary: row.summary,
			categories: row.categories,
		});
	}

	private async generateEmbedding(
		course: Primitives<Course>,
	): Promise<string> {
		const vectorEmbedding = await this.embeddingsGenerator.embedQuery(
			[
				`Id: ${course.id}`,
				`Name: ${course.name}`,
				`Summary: ${course.summary}`,
				`Categories: ${course.categories.join(", ")}`,
			].join("|"),
		);

		return `[${vectorEmbedding.join(",")}]`;
	}
}
