/* eslint-disable no-console */
import { AIMessage } from "@langchain/core/messages";
import {
	ChatPromptTemplate,
	HumanMessagePromptTemplate,
	SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOllama } from "@langchain/ollama";
import { Service } from "diod";

import { NextSuggestedCoursesEmail } from "../domain/NextSuggestedCoursesEmail";
import { NextSuggestedCoursesEmailRealSender } from "../domain/NextSuggestedCoursesEmailRealSender";

@Service()
export class ConsoleLogNextSuggestedCoursesEmailRealSender
	implements NextSuggestedCoursesEmailRealSender
{
	async send(email: NextSuggestedCoursesEmail): Promise<void> {
		const chatPrompt = ChatPromptTemplate.fromMessages([
			SystemMessagePromptTemplate.fromTemplate(
				`
Eres un avanzado generador de emails para recomendar siguientes cursos. Tu tarea es generar un email para las 3 sugerencias de cursos que recibirás. Ten en cuenta lo siguiente:
- Solo puedes elegir cursos de la lista disponible.
- Has de basarte en las razones que te vienen para redactar el mensaje.
- Pon directamente el cuerpo, sin asunto.
- Si el nombre incluye apellidos, deja sólo el nombre.
- Añade un saludo inicial y final.
- No dejes ningún placeholder. Ante la duda no lo añadas.
- Explica como cada curso puede ser útil en su día a día.
- Utiliza un tono casual.
- En español de España. Neutral e inclusivo.
- Añade emojis cuando lo consideres oportuno.
- Responde únicamente con el email a enviar.
        `.trim(),
			),
			HumanMessagePromptTemplate.fromTemplate(
				`
Nombre de la persona a enviar el email: {user_name}.

Lista de cursos sugeridos (cada curso se presenta con su nombre, resumen y motivo de sugerencia):

{suggested_courses}

        `.trim(),
			),
		]);

		const chain = RunnableSequence.from([
			chatPrompt,
			new ChatOllama({
				model: "llama3.1:8b",
				temperature: 0.8,
			}),
		]);

		const message: AIMessage = await chain.invoke({
			suggested_courses: email.suggestions
				.map(this.formatSuggestion)
				.join("\n\n"),
			user_name: email.userName,
		});

		console.log(
			`\t\t→ 📧 Sending email to ${email.emailAddress} with message:\n\n`,
			message.content,
		);

		return Promise.resolve();
	}

	formatSuggestion(suggestion: {
		courseName: string;
		courseSummary: string;
		reason: string;
	}): string {
		return `
- Nombre: ${suggestion.courseName}
  Resumen: ${suggestion.courseSummary}
  Motivo: ${suggestion.reason}
		`.trim();
	}
}
