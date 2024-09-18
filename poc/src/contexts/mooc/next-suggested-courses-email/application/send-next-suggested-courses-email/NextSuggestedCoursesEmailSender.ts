import { Service } from "diod";

import { CoursesByIdsSearcher } from "../../../courses/application/search-by-ids/CoursesByIdsSearcher";
import { CourseSuggestions } from "../../../user-course-suggestions/domain/UserCourseSuggestionsGeneratedDomainEvent";
import { UserFinder } from "../../../users/application/find/UserFinder";
import { NextSuggestedCoursesEmail } from "../../domain/NextSuggestedCoursesEmail";
import { NextSuggestedCoursesEmailRealSender } from "../../domain/NextSuggestedCoursesEmailRealSender";

@Service()
export class NextSuggestedCoursesEmailSender {
	constructor(
		private readonly userFinder: UserFinder,
		private readonly courseSearcher: CoursesByIdsSearcher,
		private readonly sender: NextSuggestedCoursesEmailRealSender,
	) {}

	async send(userId: string, suggestions: CourseSuggestions): Promise<void> {
		const email = await this.createEmail(userId, suggestions);

		await this.sender.send(email);
	}

	private async createEmail(
		userId: string,
		suggestions: {
			courseId: string;
			reason: string;
		}[],
	): Promise<NextSuggestedCoursesEmail> {
		const user = await this.userFinder.find(userId);

		const courses = await this.courseSearcher.search(
			suggestions.map((suggestion) => suggestion.courseId),
		);

		return NextSuggestedCoursesEmail.create(
			user.email,
			courses.map((course) => {
				const suggestion = suggestions.find(
					(suggestion) => suggestion.courseId === course.id,
				);

				return {
					courseName: course.name,
					reason: suggestion?.reason ?? "",
				};
			}),
		);
	}
}
