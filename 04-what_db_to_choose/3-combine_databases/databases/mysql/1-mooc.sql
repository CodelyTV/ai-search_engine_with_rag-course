CREATE TABLE mooc__courses (
	id CHAR(4) PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	summary TEXT,
	categories JSON NOT NULL,
	published_at DATE NOT NULL
);