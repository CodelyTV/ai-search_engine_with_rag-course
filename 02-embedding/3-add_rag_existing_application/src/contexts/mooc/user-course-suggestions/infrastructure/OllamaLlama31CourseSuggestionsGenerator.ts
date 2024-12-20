import { StructuredOutputParser } from "@langchain/core/output_parsers";
import {
	ChatPromptTemplate,
	HumanMessagePromptTemplate,
	SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOllama } from "@langchain/ollama";
import { Service } from "diod";
import { z } from "zod";

import { Course } from "../../courses/domain/Course";
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

		const availableCourses = await this.courseRepository.searchAll();
		// const availableCourses = await
		// this.courseRepository.searchSimilar(completedCourseIds);

		const completedCourses =
			await this.courseRepository.searchByIds(completedCourseIds);

		const outputParser = StructuredOutputParser.fromZodSchema(
			z.array(
				z.object({
					courseId: z.string().describe("Id del curso sugerido."),
					courseName: z
						.string()
						.describe("Nombre del curso sugerido."),
					reason: z
						.string()
						.describe("Motivo por el que se sugiere el curso."),
				}),
			),
		);

		const chatPrompt = ChatPromptTemplate.fromMessages([
			SystemMessagePromptTemplate.fromTemplate(
				`
Eres un avanzado recomendador de cursos. Tu tarea es sugerir al usuario los 3 mejores cursos de una lista proporcionada. Ten en cuenta lo siguiente:
- Solo puedes elegir cursos de la lista disponible.
- No sugieras cursos que el usuario ya ha completado.
- Tus sugerencias son en castellano neutro e inclusivo.
- Proporciona una razón en castellano para cada curso sugerido. Ejemplo: "Porque has demostrado interés en PHP al completar el curso de DDD en PHP".
- Intenta añadir en las razones cursos similares que el usuario ya ha completado.
- Devuelves un array de objetos, cada uno con las propiedades "courseId" (string), "courseName" (string) y "reason" (string).
- Responde únicamente con el siguiente formato JSON (no añadas \`\`\`json ni nada similar a la respuesta):
{format_instructions}
        `.trim(),
			),
			HumanMessagePromptTemplate.fromTemplate(
				`
Lista de cursos disponibles (cada curso se presenta con su nombre, resumen y categorías):

{available_courses}

Cursos que el usuario ya ha completado:

{completed_courses}
        `.trim(),
			),
		]);

		const chain = RunnableSequence.from([
			chatPrompt,
			new ChatOllama({
				model: "llama3.1:8b",
				temperature: 0,
			}),
			outputParser,
		]);

		const suggestions = await chain.invoke({
			available_courses: availableCourses
				.map(this.formatCourse)
				.join("\n\n"),
			completed_courses: completedCourses
				.map(this.formatCourse)
				.join("\n\n"),
			format_instructions: outputParser.getFormatInstructions(),
		});

		return suggestions.map(
			(suggestion) =>
				new CourseSuggestion(suggestion.courseId, suggestion.reason),
		);
	}

	formatCourse(course: Course): string {
		return `
- Id: ${course.id.value}
  Nombre: ${course.name}
		`.trim();
	}
}
