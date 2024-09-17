import {
	DomainEvent,
	DomainEventAttributes,
} from "../../../shared/domain/event/DomainEvent";

export type UserCourseSuggestionsGeneratedDomainEventPrimitives = {
	userId: string;
	suggestions: string;
};

export class UserCourseSuggestionsGeneratedDomainEvent extends DomainEvent {
	static eventName = "codely.mooc.user_course_suggestions.generated";

	constructor(
		public readonly userId: string,
		public readonly suggestions: string,
		eventId?: string,
		occurredOn?: Date,
	) {
		super(
			UserCourseSuggestionsGeneratedDomainEvent.eventName,
			userId,
			eventId,
			occurredOn,
		);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes,
	): UserCourseSuggestionsGeneratedDomainEvent {
		return new UserCourseSuggestionsGeneratedDomainEvent(
			aggregateId,
			attributes.suggestions as string,
			eventId,
			occurredOn,
		);
	}

	toPrimitives(): UserCourseSuggestionsGeneratedDomainEventPrimitives {
		return {
			userId: this.userId,
			suggestions: this.suggestions,
		};
	}
}
