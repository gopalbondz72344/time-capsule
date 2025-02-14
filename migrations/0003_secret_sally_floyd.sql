ALTER TABLE "capsules" ADD COLUMN "user_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "capsules" ADD COLUMN "riddles" json NOT NULL;--> statement-breakpoint
ALTER TABLE "capsules" ADD CONSTRAINT "capsules_user_email_users_email_fk" FOREIGN KEY ("user_email") REFERENCES "public"."users"("email") ON DELETE cascade ON UPDATE no action;