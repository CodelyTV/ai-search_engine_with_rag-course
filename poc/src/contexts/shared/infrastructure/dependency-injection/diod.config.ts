import { ContainerBuilder } from "diod";

import { UserCourseProgressCompleter } from "../../../mooc/user-course-progress/application/complete/UserCourseProgressCompleter";
import { GenerateUserCourseSuggestionsOnUserCourseProgressCompleted } from "../../../mooc/user-course-suggestions/application/generate/GenerateUserCourseSuggestionsOnUserCourseProgressCompleted";
import { UserCourseSuggestionsGenerator } from "../../../mooc/user-course-suggestions/application/generate/UserCourseSuggestionsGenerator";
import { CourseSuggestionsGenerator } from "../../../mooc/user-course-suggestions/domain/CourseSuggestionsGenerator";
import { UserCourseSuggestionsRepository } from "../../../mooc/user-course-suggestions/domain/UserCourseSuggestionsRepository";
import { OllamaMistralCourseSuggestionsGenerator } from "../../../mooc/user-course-suggestions/infrastructure/OllamaMistralCourseSuggestionsGenerator";
import { PostgresUserCourseSuggestionsRepository } from "../../../mooc/user-course-suggestions/infrastructure/PostgresUserCourseSuggestionsRepository";
import { UserFinder } from "../../../mooc/users/application/find/UserFinder";
import { UpdateUserCourseSuggestionsOnUserCourseSuggestionsGenerated } from "../../../mooc/users/application/update-course-suggestions/UpdateUserCourseSuggestionsOnUserCourseSuggestionsGenerated";
import { UserCourseSuggestionsUpdater } from "../../../mooc/users/application/update-course-suggestions/UserCourseSuggestionsUpdater";
import { DomainUserFinder } from "../../../mooc/users/domain/DomainUserFinder";
import { UserRepository } from "../../../mooc/users/domain/UserRepository";
import { PostgresUserRepository } from "../../../mooc/users/infrastructure/PostgresUserRepository";
import { EventBus } from "../../domain/event/EventBus";
import { InMemoryEventBus } from "../domain-event/InMemoryEventBus";
import { PostgresConnection } from "../postgres/PostgresConnection";

const builder = new ContainerBuilder();

// Shared
builder
	.register(PostgresConnection)
	.useInstance(
		new PostgresConnection(
			"localhost",
			5432,
			"codely",
			"c0d3ly7v",
			"postgres",
		),
	);

builder.register(EventBus).use(InMemoryEventBus);

// User
builder.register(UserRepository).use(PostgresUserRepository);

builder.registerAndUse(UserFinder);
builder.registerAndUse(DomainUserFinder);

builder
	.registerAndUse(UpdateUserCourseSuggestionsOnUserCourseSuggestionsGenerated)
	.addTag("subscriber");
builder.registerAndUse(UserCourseSuggestionsUpdater);

// UserCourseSuggestions
builder
	.register(CourseSuggestionsGenerator)
	.use(OllamaMistralCourseSuggestionsGenerator);
builder
	.register(UserCourseSuggestionsRepository)
	.use(PostgresUserCourseSuggestionsRepository);
builder.registerAndUse(UserCourseSuggestionsGenerator);
builder
	.registerAndUse(GenerateUserCourseSuggestionsOnUserCourseProgressCompleted)
	.addTag("subscriber");

builder.registerAndUse(UserCourseProgressCompleter);

export const container = builder.build();
