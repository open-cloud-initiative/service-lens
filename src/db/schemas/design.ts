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

export const designInsertSchema = createInsertSchema(designs, {
    title: (schema) => schema.min(1, 'Title is required').max(255, 'Title must be at most 255 characters'),
    body: (schema) => schema.min(1, 'Body is required'),
    description: (schema) =>
        schema.min(1, 'Description is required').max(1024, 'Description must be at most 1024 characters'),
}).pick({
    title: true,
    body: true,
    description: true,
})
export const designSelectSchema = createSelectSchema(designs)

export type TDesign = typeof designs.$inferSelect
export type TNewDesign = typeof designs.$inferInsert
