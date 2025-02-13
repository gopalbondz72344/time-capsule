ALTER TABLE "capsules" RENAME COLUMN "files" TO "images";--> statement-breakpoint
ALTER TABLE "capsules" ADD COLUMN "videos" json NOT NULL;