import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

export class NextSuggestedCoursesEmail extends AggregateRoot {
	constructor(
		readonly emailAddress: string,
		readonly userName: string,
		readonly suggestions: {
			courseName: string;
			courseSummary: string;
			reason: string;
		}[],
	) {
		super();
	}

	static create(
		emailAddress: string,
		userName: string,
		suggestions: {
			courseName: string;
			courseSummary: string;
			reason: string;
		}[],
	): NextSuggestedCoursesEmail {
		return new NextSuggestedCoursesEmail(
			emailAddress,
			userName,
			suggestions,
		);
	}
}
