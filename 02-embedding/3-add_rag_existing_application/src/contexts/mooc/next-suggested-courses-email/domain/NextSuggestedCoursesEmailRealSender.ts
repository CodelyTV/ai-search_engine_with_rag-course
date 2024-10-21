import { NextSuggestedCoursesEmail } from "./NextSuggestedCoursesEmail";

export abstract class NextSuggestedCoursesEmailRealSender {
	abstract send(email: NextSuggestedCoursesEmail): Promise<void>;
}
