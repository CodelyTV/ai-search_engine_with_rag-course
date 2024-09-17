import "reflect-metadata";

import { NextResponse } from "next/server";

import { UserCourseProgressCompleter } from "../../../../contexts/mooc/user-course-progress/application/complete/UserCourseProgressCompleter";
import { CourseSuggestionPrimitives } from "../../../../contexts/mooc/user-course-suggestions/domain/CourseSuggestion";
import { UserFinder } from "../../../../contexts/mooc/users/application/find/UserFinder";
import { container } from "../../../../contexts/shared/infrastructure/dependency-injection/diod.config";

const completer = container.get(UserCourseProgressCompleter);
const userFinder = container.get(UserFinder);

export async function POST(request: Request): Promise<NextResponse> {
	const { courseId, userId } = (await request.json()) as {
		courseId: string;
		userId: string;
	};

	await completer.complete(courseId, userId);

	const user = await userFinder.find(userId);

	const primitives = user.toPrimitives();

	return NextResponse.json({
		name: primitives.name,
		suggestedCourses: JSON.parse(
			primitives.suggestedCourses,
		) as CourseSuggestionPrimitives[],
	});
}
