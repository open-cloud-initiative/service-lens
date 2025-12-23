import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const designs = pgTable('design', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    body: text().notNull(),
    description: varchar({ length: 1024 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp('deleted_at'),
})

export const designInsertSchema = createInsertSchema(designs).pick({
    title: true,
    body: true,
    description: true,
})
export const designSelectSchema = createSelectSchema(designs)

export type TDesign = typeof designs.$inferSelect
export type TNewDesign = typeof designs.$inferInsert
