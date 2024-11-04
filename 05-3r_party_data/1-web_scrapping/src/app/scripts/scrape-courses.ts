/* eslint-disable no-console */
import "reflect-metadata";

import {
	DistanceStrategy,
	PGVectorStore,
} from "@langchain/community/vectorstores/pgvector";
import { Document } from "@langchain/core/documents";
import { OllamaEmbeddings } from "@langchain/ollama";
import { PoolConfig } from "pg";
import { chromium } from "playwright";

// import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";
// import { compile } from "html-to-text";
//
// async function main(): Promise<void> {
// 	const url = "http://localhost:3012";
// 	const compiledConvert = compile({ wordwrap: 130 });
//
// 	const loader = new RecursiveUrlLoader(url, {
// 		extractor: compiledConvert,
// 		maxDepth: 1,
// 	});
// 	const docs = await loader.load();
// 	console.log(docs);
// }

async function scrapeCourse(url: string): Promise<Document> {
	const browser = await chromium.launch({ headless: true });
	const page = await browser.newPage();

	const courseId = url.split("/").pop()?.replace(".html", "") ?? "";

	try {
		await page.goto(url);

		const content = await page.evaluate(() => {
			const description =
				document.querySelector("[class^='course_course__description']")
					?.textContent ?? "";

			const steps = document.querySelectorAll<HTMLAnchorElement>(
				"[class^='course_course__lessons'] a",
			);

			const formattedSteps = Array.from(steps)
				.slice(0, 20)
				.map((step) => {
					return `* ${step.textContent}: ${step.href}`;
				})
				.join("\n");

			return `
Descripción
---------------
${description}

Vídeos del curso
---------------
${formattedSteps}
`.trim();
		});

		return new Document({
			id: courseId, // has to be an uuid
			pageContent: content,
			metadata: { url },
		});
	} finally {
		await browser.close();
	}
}

async function main(
	courseUrls: string[],
	vectorStorePromise: Promise<PGVectorStore>,
): Promise<void> {
	const documents = await Promise.all(courseUrls.map(scrapeCourse));

	console.log(documents);

	const vectorStore = await vectorStorePromise;

	await vectorStore.addDocuments(documents);
	await vectorStore.end();
}

const courseUrls = [
	"http://localhost:3012/anade-inteligencia-artificial-siguiendo-buenas-practicas.html",
	"http://localhost:3012/asincronia-en-javascript.html",
	"http://localhost:3012/auditoria-holaluz.html",
	"http://localhost:3012/ddd-microservicios-e-infra-en-audiense-genially-y-codely.html",
	"http://localhost:3012/diseno-de-infraestructura-aws-sqs-como-cola-de-mensajeria.html",
	"http://localhost:3012/diseno-de-infraestructura-rabbitmq-como-cola-de-mensajeria.html",
	"http://localhost:3012/modelado-del-dominio-value-objects.html",
	"http://localhost:3012/patrones-de-diseno-criteria.html",
	"http://localhost:3012/tratamiento-de-datos-en-bash-gestiona-archivos-json-xml-yaml.html",
];

const vectorStore = PGVectorStore.initialize(
	new OllamaEmbeddings({
		model: "nomic-embed-text",
		baseUrl: "http://localhost:11434",
	}),
	{
		postgresConnectionOptions: {
			type: "postgres",
			host: "localhost",
			port: 5432,
			user: "codely",
			password: "c0d3ly7v",
			database: "postgres",
		} as PoolConfig,
		tableName: "mooc.courses",
		columns: {
			idColumnName: "id",
			contentColumnName: "content",
			metadataColumnName: "metadata",
			vectorColumnName: "embedding",
		},
		distanceStrategy: "cosine" as DistanceStrategy,
	},
);

main(courseUrls, vectorStore)
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		console.log("Done!");

		process.exit(0);
	});
