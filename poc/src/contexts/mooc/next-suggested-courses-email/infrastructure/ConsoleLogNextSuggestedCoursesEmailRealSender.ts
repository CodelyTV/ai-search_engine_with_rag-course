/* eslint-disable no-console */
import { Service } from "diod";

import { NextSuggestedCoursesEmail } from "../domain/NextSuggestedCoursesEmail";
import { NextSuggestedCoursesEmailRealSender } from "../domain/NextSuggestedCoursesEmailRealSender";

@Service()
export class ConsoleLogNextSuggestedCoursesEmailRealSender
	implements NextSuggestedCoursesEmailRealSender
{
	async send(email: NextSuggestedCoursesEmail): Promise<void> {
		const message = "Empty";

		console.log(
			`\t\t→ 📧 Sending email to ${email.emailAddress} with message`,
			message,
		);

		return Promise.resolve();
	}
}
