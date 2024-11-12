import { CourseId } from "@codelytv/primitives-type/dist/tests/CourseId";

import { Course } from "./Course";

export abstract class CourseRepository {
	abstract save(course: Course): Promise<void>;

	abstract search(id: CourseId): Promise<Course | null>;

	abstract searchByIds(ids: CourseId[]): Promise<Course[]>;

	abstract searchSimilar(ids: CourseId[]): Promise<Course[]>;
}
