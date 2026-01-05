import { pgTable } from '@/db/utils'
import { relations } from 'drizzle-orm'
import { bigint, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { tag } from './tag'

export const environment = pgTable('environment', {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 1024 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp('deleted_at'),
})

export type TEnvironment = typeof environment.$inferSelect
export type TNewEnvironment = typeof environment.$inferInsert

export const environmentTag = pgTable('environment_tag', {
    environmentId: uuid()
        .notNull()
        .references(() => environment.id, { onDelete: 'cascade' }),
    tagId: bigint({ mode: 'bigint' })
        .notNull()
        .references(() => tag.id, { onDelete: 'cascade' }),
})

export const environmentRelations = relations(environment, ({ many }) => ({
    tags: many(tag),
}))

export const environmentInsertSchema = createInsertSchema(environment, {
    name: (schema) => schema.min(1, 'Name is required').max(255, 'Name must be at most 255 characters'),
    description: (schema) =>
        schema.min(1, 'Description is required').max(1024, 'Description must be at most 1024 characters'),
}).pick({
    name: true,
    description: true,
})

export const environmentSelectSchema = createSelectSchema(environment)
