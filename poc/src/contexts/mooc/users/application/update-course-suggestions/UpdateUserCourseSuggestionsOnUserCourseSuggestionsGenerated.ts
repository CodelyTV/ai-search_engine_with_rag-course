import { Service } from "diod";

import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { UserCourseSuggestionsGenerated } from "../../../user-course-suggestions/domain/UserCourseSuggestionsGenerated";

import { UserCourseSuggestionsUpdater } from "./UserCourseSuggestionsUpdater";

@Service()
export class UpdateUserCourseSuggestionsOnUserCourseSuggestionsGenerated
	implements DomainEventSubscriber<UserCourseSuggestionsGenerated>
{
	constructor(private readonly updater: UserCourseSuggestionsUpdater) {}

	async on(event: UserCourseSuggestionsGenerated): Promise<void> {
		await this.updater.update(event.userId, event.suggestions);
	}

	subscribedTo(): DomainEventClass[] {
		return [UserCourseSuggestionsGenerated];
	}

	name(): string {
		return "codely.mooc.update_user_course_suggestions_on_user_course_suggestions_generated";
	}
}
