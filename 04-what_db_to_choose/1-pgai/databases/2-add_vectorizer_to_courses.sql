SELECT ai.create_vectorizer(
			   mooc.courses::regclass,
			   destination => <embedding_table_name>,
			   embedding => ai.embedding_openai(<model_name>, <dimensions>),
			   chunking => ai.chunking_recursive_character_text_splitter(<column_name>)
	   );
