import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("founder"),
  organizationId: uuid("organization_id").references(() => organizations.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const startupIdeas = pgTable("startup_ideas", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  conceptDescription: text("concept_description").notNull(),
  problem: text("problem").notNull(),
  solution: text("solution").notNull(),
  targetMarket: text("target_market").notNull(),
  startupStage: varchar("startup_stage", { length: 100 }).notNull(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const validations = pgTable("validations", {
  id: uuid("id").defaultRandom().primaryKey(),
  startupIdeaId: uuid("startup_idea_id")
    .notNull()
    .references(() => startupIdeas.id),
  status: varchar("status", { length: 50 }).notNull().default("completed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const validationReports = pgTable("validation_reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  validationId: uuid("validation_id")
    .notNull()
    .references(() => validations.id),
  summary: text("summary").notNull(),
  risks: text("risks").notNull(),
  marketPotential: text("market_potential").notNull(),
  nextSteps: text("next_steps").notNull(),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
});