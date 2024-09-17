import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOllama } from "@langchain/ollama";
import { Service } from "diod";
import { z } from "zod";

import { CourseId } from "../../courses/domain/CourseId";
import { CourseRepository } from "../../courses/domain/CourseRepository";
import { CourseSuggestion } from "../domain/CourseSuggestion";
import { CourseSuggestionsGenerator } from "../domain/CourseSuggestionsGenerator";
import { UserCourseSuggestions } from "../domain/UserCourseSuggestions";

@Service()
export class OllamaLlama31CourseSuggestionsGenerator
	implements CourseSuggestionsGenerator
{
	constructor(private readonly courseRepository: CourseRepository) {}

	async generate(
		userCourseSuggestions: UserCourseSuggestions,
	): Promise<CourseSuggestion[]> {
		const primitives = userCourseSuggestions.toPrimitives();

		const completedCourseIds = primitives.completedCourseIds.map(
			(id) => new CourseId(id),
		);

		const similarCourses =
			await this.courseRepository.searchSimilar(completedCourseIds);

		const completedCourses =
			await this.courseRepository.searchByIds(completedCourseIds);

		const outputParser = StructuredOutputParser.fromZodSchema(
			z.array(
				z.object({
					suggestedCourse: z.string().describe("Curso sugerido."),
					reason: z
						.string()
						.describe("Motivo por el que el curso es sugerido."),
				}),
			),
		);

		const promptTemplate = PromptTemplate.fromTemplate(
			`
Eres un avanzado recomendador de cursos. Tu tarea es sugerir al usuario los 3 mejores cursos de la siguiente lista (importante: solo puedes elegir cursos de esta lista):

{available_courses}

Ten en cuenta lo siguiente:
- No sugieras cursos que el usuario ya ha completado.
- Proporciona una razón en castellano para cada curso sugerido. Ejemplo: "Porque has demostrado interés en PHP al completar el curso de DDD en PHP".
- Responde únicamente con el siguiente formato JSON:

{format_instructions}

Cursos que el usuario ya ha completado:
{completed_courses}
    `.trim(),
		);

		const chain = RunnableSequence.from([
			promptTemplate,
			new ChatOllama({
				model: "llama3.1:8b",
				temperature: 0.7,
			}),
			outputParser,
		]);

		const suggestions = await chain.invoke({
			available_courses: similarCourses
				.map((course) => `- ${course.name}`)
				.join("\n"),
			completed_courses: completedCourses
				.map((course) => `- ${course.name}`)
				.join("\n"),
			format_instructions: outputParser.getFormatInstructions(),
		});

		return suggestions.map(
			(suggestion) =>
				new CourseSuggestion(
					suggestion.suggestedCourse,
					suggestion.reason,
				),
		);
	}
}
