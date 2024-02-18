CREATE TABLE `class_schedules` (
	`id` text PRIMARY KEY NOT NULL,
	`weekday` integer NOT NULL,
	`start_at` integer NOT NULL,
	`end_at` integer NOT NULL,
	`class_id` text NOT NULL,
	FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `classes` (
	`id` text PRIMARY KEY NOT NULL,
	`subject` text NOT NULL,
	`cost` integer NOT NULL,
	`proffy_id` text NOT NULL,
	FOREIGN KEY (`proffy_id`) REFERENCES `proffies`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `proffies` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`avatar_url` text NOT NULL,
	`bio` text NOT NULL,
	`whatsapp` text NOT NULL
);
