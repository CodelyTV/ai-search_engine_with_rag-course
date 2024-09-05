CREATE SCHEMA mooc;

CREATE TABLE mooc.users (
	id UUID PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	profile_picture VARCHAR(255) NOT NULL,
	status VARCHAR(255) NOT NULL,
	suggested_courses JSONB
);

CREATE TABLE mooc.user_course_suggestions (
	user_id UUID PRIMARY KEY NOT NULL,
	completed_courses JSONB,
	suggested_courses JSONB
);
