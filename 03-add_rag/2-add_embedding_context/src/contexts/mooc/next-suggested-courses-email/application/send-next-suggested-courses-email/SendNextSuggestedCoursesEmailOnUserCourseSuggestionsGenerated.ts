import { Service } from "diod";

import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { UserCourseSuggestionsGeneratedDomainEvent } from "../../../user-course-suggestions/domain/UserCourseSuggestionsGeneratedDomainEvent";

import { NextSuggestedCoursesEmailSender } from "./NextSuggestedCoursesEmailSender";

@Service()
export class SendNextSuggestedCoursesEmailOnUserCourseSuggestionsGenerated
	implements DomainEventSubscriber<UserCourseSuggestionsGeneratedDomainEvent>
{
	constructor(private readonly sender: NextSuggestedCoursesEmailSender) {}

	async on(event: UserCourseSuggestionsGeneratedDomainEvent): Promise<void> {
		await this.sender.send(event.userId, event.suggestions);
	}

	subscribedTo(): DomainEventClass[] {
		return [UserCourseSuggestionsGeneratedDomainEvent];
	}

	name(): string {
		return "codely.mooc.send_next_suggested_courses_email_on_user_course_suggestions_generated";
	}
}
