SELECT ai.create_vectorizer(
	'mooc.courses'::regclass,
	embedding => ai.embedding_ollama('nomic-embed-text', 768),
	chunking => ai.chunking_character_text_splitter('summary', 128, 10),
	formatting => ai.formatting_python_template('Name: $name | Summary: $chunk | Categories: $categories')
);
