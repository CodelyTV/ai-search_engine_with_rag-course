/* eslint-disable no-console */
import "reflect-metadata";

import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";
import { compile } from "html-to-text";

async function main(): Promise<void> {
	const url = "http://localhost:3012";
	const compiledConvert = compile({ wordwrap: 130 });

	const loader = new RecursiveUrlLoader(url, {
		extractor: compiledConvert,
		maxDepth: 1,
	});
	const docs = await loader.load();

	// raw HTML page content
	// const extractedContents = docs[0].pageContent;

	console.log(docs);
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		console.log("Done!");

		process.exit(0);
	});
