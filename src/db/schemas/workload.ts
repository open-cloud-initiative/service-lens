import { pgTable } from '@/db/utils'
import { relations } from 'drizzle-orm'
import { bigint, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { tag } from './tag'

export const workload = pgTable('workload', {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 1024 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp('deleted_at'),
})

export type TWorkload = typeof workload.$inferSelect
export type TNewWorkload = typeof workload.$inferInsert

export const workloadTag = pgTable('workload_tag', {
    workloadId: uuid()
        .notNull()
        .references(() => workload.id, { onDelete: 'cascade' }),
    tagId: bigint({ mode: 'bigint' })
        .notNull()
        .references(() => tag.id, { onDelete: 'cascade' }),
})

export const workloadRelations = relations(workload, ({ many }) => ({
    tags: many(tag),
}))

export const workloadInsertSchema = createInsertSchema(workload, {
    name: (schema) => schema.min(1, 'Name is required').max(255, 'Name must be at most 255 characters'),
    description: (schema) =>
        schema.min(1, 'Description is required').max(1024, 'Description must be at most 1024 characters'),
}).pick({
    name: true,
    description: true,
})
export const workloadSelectSchema = createSelectSchema(workload)
