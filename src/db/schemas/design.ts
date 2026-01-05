import { pgTable } from '@/db/utils'
import { relations } from 'drizzle-orm'
import { bigint, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { tag } from './tag'

export const design = pgTable('design', {
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

export type TDesign = typeof design.$inferSelect
export type TNewDesign = typeof design.$inferInsert

export const designTag = pgTable('design_tag', {
    designId: uuid()
        .notNull()
        .references(() => design.id, { onDelete: 'cascade' }),
    tagId: bigint({ mode: 'bigint' })
        .notNull()
        .references(() => tag.id, { onDelete: 'cascade' }),
})

export const designRelations = relations(design, ({ many }) => ({
    tags: many(tag),
}))

export const designInsertSchema = createInsertSchema(design, {
    title: (schema) => schema.min(1, 'Title is required').max(255, 'Title must be at most 255 characters'),
    body: (schema) => schema.optional(),
    description: (schema) => schema.max(1024, 'Description must be at most 1024 characters').optional(),
}).pick({
    title: true,
    body: true,
    description: true,
})
export const designSelectSchema = createSelectSchema(design)
