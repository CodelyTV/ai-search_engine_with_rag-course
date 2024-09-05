import { CourseSuggestion } from "./CourseSuggestion";
import { UserCourseSuggestions } from "./UserCourseSuggestions";

export abstract class CourseSuggestionsGenerator {
	generate(
		userCourseSuggestions: UserCourseSuggestions,
	): Promise<CourseSuggestion[]>;
}
