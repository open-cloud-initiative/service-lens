CREATE TABLE "service_lens_lens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"raw" json NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "service_lens_profile_question" (
	"id" bigint PRIMARY KEY NOT NULL,
	"question" varchar(1024) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "service_lens_profile_question_answer" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"profileQuestionId" bigint NOT NULL,
	"answer" varchar(2048) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "service_lens_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "service_lens_profile_question_answer" ADD CONSTRAINT "service_lens_profile_question_answer_profileQuestionId_service_lens_profile_question_id_fk" FOREIGN KEY ("profileQuestionId") REFERENCES "public"."service_lens_profile_question"("id") ON DELETE no action ON UPDATE no action;