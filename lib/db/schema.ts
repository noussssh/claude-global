import { int, sqliteTable, text, real } from "drizzle-orm/sqlite-core";

export const serviceProvidersTable = sqliteTable("service_providers", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  country: text().notNull(),
  address: text().notNull(),
  email: text().notNull().unique(),
  phone: text().notNull(),
  paymentTerms: text("payment_terms"),
  latitude: real(),
  longitude: real(),
  createdAt: int("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: int("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export type ServiceProvider = typeof serviceProvidersTable.$inferSelect;
export type NewServiceProvider = typeof serviceProvidersTable.$inferInsert;