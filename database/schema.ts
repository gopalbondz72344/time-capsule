import {
    varchar,
    text,
    date,
    pgTable,
    uuid,
    timestamp,
    json,
    pgEnum
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
    "LOCKED",
    "UNLOCKED",
]);

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    lastActivityDate: date("last_activity_date").defaultNow(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
    }).defaultNow(),
});

export const capsules = pgTable("capsules", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    userEmail: text("user_email").notNull().references(() => users.email, { onDelete: "cascade" }),
    createdAt: date("created_at").defaultNow(),
    endDate: date("end_at").defaultNow(),
    ImageUpload: json("images").notNull(), // Use JSON for storing an array of file IDs
    VideoUpload: json("videos").notNull(),
    riddles: json("riddles").notNull(),
    status: STATUS_ENUM("status").default("LOCKED")
});

