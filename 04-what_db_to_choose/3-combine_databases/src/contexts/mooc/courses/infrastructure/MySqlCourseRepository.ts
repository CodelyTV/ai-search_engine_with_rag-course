/* eslint-disable no-console */
import { Primitives } from "@codelytv/primitives-type";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Service } from "diod";

import { MariaDBConnection } from "../../../shared/infrastructure/mariadb/MariaDBConnection";
import { PostgresConnection } from "../../../shared/infrastructure/postgres/PostgresConnection";
import { Course } from "../domain/Course";
import { CourseId } from "../domain/CourseId";
import { CourseRepository } from "../domain/CourseRepository";

type DatabaseCourseRow = {
	id: string;
	name: string;
	summary: string;
	categories: string[];
	published_at: Date;
};

@Service()
export class MySqlCourseRepository implements CourseRepository {
	private readonly embeddingsGenerator: OllamaEmbeddings;

	constructor(
		private readonly connection: MariaDBConnection,
		private readonly postgresConnection: PostgresConnection,
	) {
		this.embeddingsGenerator = new OllamaEmbeddings({
			model: "nomic-embed-text",
			baseUrl: "http://localhost:11434",
		});
	}

	async save(course: Course): Promise<void> {
		const primitives = course.toPrimitives();
		const embedding =
			await this.generateCourseDocumentEmbedding(primitives);

		await this.connection.execute(`
			INSERT INTO mooc__courses (id, name, summary, categories, published_at)
			VALUES (
				'${primitives.id}',
				'${primitives.name}',
				'${primitives.summary}',
				'${JSON.stringify(primitives.categories)}',
				'${primitives.publishedAt.toISOString().slice(0, 19).replace("T", " ")}'
			)
			ON DUPLICATE KEY UPDATE
				name = VALUES(name),
				summary = VALUES(summary),
				categories = VALUES(categories),
				published_at = VALUES(published_at);
		`);

		await this.postgresConnection.sql`
			INSERT INTO mooc.courses (id, embedding)
			VALUES (${primitives.id}, ${embedding})
			ON CONFLICT (id) DO UPDATE SET embedding = EXCLUDED.embedding;
		`;
	}

	async search(id: CourseId): Promise<Course | null> {
		const row = await this.connection.searchOne<DatabaseCourseRow>(`
			SELECT id, name, summary, categories, published_at
			FROM mooc__courses
			WHERE id = '${id.value}';
		`);

		return row ? this.toAggregate(row) : null;
	}

	async searchSimilar(ids: CourseId[]): Promise<Course[]> {
		const coursesToSearchSimilar = await this.searchByIds(ids);

		if (coursesToSearchSimilar.length === 0) {
			return [];
		}

		const embeddings = await this.generateCoursesQueryEmbeddings(
			coursesToSearchSimilar.map((course) => course.toPrimitives()),
		);

		const plainIds = ids.map((id) => id.value);

		const idRows = (await this.postgresConnection.sql`
			SELECT id
			FROM mooc.courses
			WHERE id != ALL(${plainIds}::text[])
			ORDER BY embedding <=> ${embeddings}
			LIMIT 10;
		`) as { id: string }[];

		return await this.searchByIds(
			idRows.map((row) => new CourseId(row.id)),
		);
	}

	async searchByIds(ids: CourseId[]): Promise<Course[]> {
		const plainIds = ids.map((id) => id.value);

		const rows = await this.connection.searchAll<DatabaseCourseRow>(`
			SELECT id, name, summary, categories, published_at
			FROM mooc__courses
			WHERE id IN (${plainIds.map((id) => `'${id}'`).join(", ")});
		`);

		return rows.map(this.toAggregate);
	}

	protected toAggregate(row: DatabaseCourseRow): Course {
		return Course.fromPrimitives({
			id: row.id,
			name: row.name,
			summary: row.summary,
			categories: row.categories,
			publishedAt: row.published_at,
		});
	}

	private async generateCourseDocumentEmbedding(
		course: Primitives<Course>,
	): Promise<string> {
		const [vectorEmbedding] = await this.embeddingsGenerator.embedDocuments(
			[this.serializeCourseForEmbedding(course)],
		);

		return JSON.stringify(vectorEmbedding);
	}

	private async generateCoursesQueryEmbeddings(
		courses: Primitives<Course>[],
	): Promise<string> {
		const vectorEmbedding = await this.embeddingsGenerator.embedQuery(
			courses
				.map((course) => this.serializeCourseForEmbedding(course))
				.join("\n"),
		);

		return JSON.stringify(vectorEmbedding);
	}

	private serializeCourseForEmbedding(course: Primitives<Course>): string {
		return [
			`Name: ${course.name}`,
			`Summary: ${course.summary}`,
			`Categories: ${course.categories.join(", ")}`,
		].join("|");
	}
}
