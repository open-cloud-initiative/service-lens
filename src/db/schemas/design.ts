import { relations } from 'drizzle-orm'
import { bigint, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { tags } from './tag'

export const designs = pgTable('design', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    body: text(),
    description: varchar({ length: 1024 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp('deleted_at'),
})

export const designTag = pgTable('design_tag', {
    designId: uuid()
        .notNull()
        .references(() => designs.id, { onDelete: 'cascade' }),
    tagId: bigint({ mode: 'bigint' })
        .notNull()
        .references(() => tags.id, { onDelete: 'cascade' }),
})

export const designRelations = relations(designs, ({ many }) => ({
    tags: many(tags),
}))

export const designInsertSchema = createInsertSchema(designs, {
    title: (schema) => schema.min(1, 'Title is required').max(255, 'Title must be at most 255 characters'),
    body: (schema) => schema.optional(),
    description: (schema) => schema.max(1024, 'Description must be at most 1024 characters').optional(),
}).pick({
    title: true,
    body: true,
    description: true,
})
export const designSelectSchema = createSelectSchema(designs)

export type TDesign = typeof designs.$inferSelect
export type TNewDesign = typeof designs.$inferInsert
