import { Service } from "diod";

import { DomainUserFinder } from "../../domain/DomainUserFinder";
import { UserRepository } from "../../domain/UserRepository";

@Service()
export class UserCourseSuggestionsUpdater {
	constructor(
		private readonly finder: DomainUserFinder,
		private readonly repository: UserRepository,
	) {}

	async update(userId: string, suggestedCourses: string): Promise<void> {
		const user = await this.finder.find(userId);

		user.updateSuggestedCourses(suggestedCourses);

		await this.repository.save(user);
	}
}
