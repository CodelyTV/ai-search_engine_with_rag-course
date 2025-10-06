CREATE SCHEMA mooc;

CREATE TABLE mooc.users (
	id uuid PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	profile_picture VARCHAR(255) NOT NULL,
	status VARCHAR(255) NOT NULL,
	suggested_courses jsonb
);

CREATE TABLE mooc.user_course_suggestions (
	user_id uuid PRIMARY KEY NOT NULL,
	completed_course_ids jsonb,
	suggested_courses jsonb
);

CREATE TABLE mooc.courses (
	id CHAR(4) PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	summary TEXT,
	categories jsonb NOT NULL,
	published_at DATE NOT NULL,
	embedding vector(768)
);
