import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

export class NextSuggestedCoursesEmail extends AggregateRoot {
	constructor(
		readonly emailAddress: string,
		readonly suggestions: { courseName: string; reason: string }[],
	) {
		super();
	}

	static create(
		emailAddress: string,
		suggestions: { courseName: string; reason: string }[],
	): NextSuggestedCoursesEmail {
		return new NextSuggestedCoursesEmail(emailAddress, suggestions);
	}
}
