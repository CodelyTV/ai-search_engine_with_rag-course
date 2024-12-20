import { Primitives } from "@codelytv/primitives-type";

import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

import { CourseId } from "./CourseId";

export class Course extends AggregateRoot {
	constructor(
		readonly id: CourseId,
		readonly name: string,
		readonly summary: string,
		readonly categories: string[],
		readonly publishedAt: Date,
	) {
		super();
	}

	static fromPrimitives(primitives: Primitives<Course>): Course {
		return new Course(
			new CourseId(primitives.id),
			primitives.name,
			primitives.summary,
			primitives.categories,
			primitives.publishedAt,
		);
	}

	create(
		id: string,
		name: string,
		summary: string,
		categories: string[],
	): Course {
		const publishedAt = new Date();

		return Course.fromPrimitives({
			id,
			name,
			summary,
			categories,
			publishedAt,
		});
	}

	toPrimitives(): Primitives<Course> {
		return {
			id: this.id.value,
			name: this.name,
			summary: this.summary,
			categories: this.categories,
			publishedAt: this.publishedAt,
		};
	}
}
