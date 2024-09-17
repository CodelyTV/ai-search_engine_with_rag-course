import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

import {
	CourseSuggestion,
	CourseSuggestionPrimitives,
} from "./CourseSuggestion";
import { UserCourseSuggestionsGeneratedDomainEvent } from "./UserCourseSuggestionsGeneratedDomainEvent";

export type UserCourseSuggestionsPrimitives = {
	userId: string;
	completedCourses: string[];
	suggestions: CourseSuggestionPrimitives[];
};

export class UserCourseSuggestions extends AggregateRoot {
	constructor(
		public readonly userId: string,
		public completedCourses: string[],
		public suggestions: CourseSuggestion[],
	) {
		super();
	}

	static fromPrimitives(
		primitives: UserCourseSuggestionsPrimitives,
	): UserCourseSuggestions {
		return new UserCourseSuggestions(
			primitives.userId,
			primitives.completedCourses,
			primitives.suggestions.map((suggestions) =>
				CourseSuggestion.fromPrimitives(suggestions),
			),
		);
	}

	static create(userId: string): UserCourseSuggestions {
		return new UserCourseSuggestions(userId, [], []);
	}

	addCompletedCourse(courseName: string): void {
		this.completedCourses.push(courseName);
	}

	updateSuggestions(suggestions: CourseSuggestion[]): void {
		this.suggestions = suggestions;

		this.record(
			new UserCourseSuggestionsGeneratedDomainEvent(
				this.userId,
				JSON.stringify(
					suggestions.map((suggestion) => suggestion.toPrimitives()),
				),
			),
		);
	}

	toPrimitives(): UserCourseSuggestionsPrimitives {
		return {
			userId: this.userId,
			completedCourses: this.completedCourses,
			suggestions: this.suggestions.map((suggestion) =>
				suggestion.toPrimitives(),
			),
		};
	}

	hasCompleted(courseName: string): boolean {
		return this.completedCourses.includes(courseName);
	}
}
