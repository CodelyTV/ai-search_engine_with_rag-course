CREATE SCHEMA mooc;

CREATE TABLE mooc.courses (
	id VARCHAR(4) PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	summary TEXT,
	categories jsonb NOT NULL
);