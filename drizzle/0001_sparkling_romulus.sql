CREATE TABLE `contactSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`company` varchar(255),
	`message` text NOT NULL,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	`status` enum('new','read','responded') NOT NULL DEFAULT 'new',
	CONSTRAINT `contactSubmissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `emailSignups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`subscribedAt` timestamp NOT NULL DEFAULT (now()),
	`unsubscribedAt` timestamp,
	`status` enum('active','unsubscribed') NOT NULL DEFAULT 'active',
	CONSTRAINT `emailSignups_id` PRIMARY KEY(`id`),
	CONSTRAINT `emailSignups_email_unique` UNIQUE(`email`)
);
