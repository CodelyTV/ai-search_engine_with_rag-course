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
						.describe("Motivo por qué el curso es sugerido."),
				}),
			),
		);

		const chain = RunnableSequence.from([
			PromptTemplate.fromTemplate(
				`
* Actúas como un recomendador de cursos avanzado.
* Solo debes sugerir cursos de la siguiente lista (IMPORTANTE: no incluyas cursos que no estén en la lista):
${similarCourses.map((course) => `\t- ${course.name}`).join("\n")}
* Devuelve una lista con los 3 cursos recomendados.
* No puedes añadir cursos que el usuario ya ha completado.
* Añade también el motivo de la sugerencia (IMPORTANTE: Ha de ser en castellano)
* Ejemplo de respuesta de la razón de la sugerencia: "Porque haciendo el curso de DDD en PHP has demostrado interés en PHP".
* Devuelve sólo la lista de cursos con sus razones, sin añadir información adicional.
* Siempre respondes utilizando el siguiente JSON Schema (importante que las claves de "suggestedCourse" y "reason" van entre comillas dobles):
{format_instructions}
* Los cursos completados por el usuario son:
{completed_courses}
                 `.trim(),
			),
			new ChatOllama({
				model: "llama3.1:8b",
				temperature: 0,
			}),
			outputParser,
		]);

		const suggestions = await chain.invoke({
			completed_courses: completedCourses
				.map((course) => `* ${course.name}`)
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
