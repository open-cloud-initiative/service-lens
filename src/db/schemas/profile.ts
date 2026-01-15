import { pgTable } from '@/db/utils'
import { relations } from 'drizzle-orm'
import { bigint, index, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const profile = pgTable(
    'profile',
    {
        id: bigint({ mode: 'bigint' }).primaryKey(),
        name: varchar({ length: 255 }).notNull(),
        value: varchar({ length: 1024 }).notNull(),
        createdAt: timestamp('created_at').defaultNow(),
        updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date()),
        deletedAt: timestamp('deleted_at'),
    },
    (table) => [
        index('tag_name_index').on(table.name),
        uniqueIndex('tag_name_value_unique_index').on(table.name, table.value), // Ensure unique combination of name and value
    ],
)

export type TProfile = typeof profile.$inferSelect
export type TNewProfile = typeof profile.$inferInsert

export const profileInsertSchema = createInsertSchema(profile, {
    name: (schema) => schema.min(1, 'Name is required').max(255, 'Name must be at most 255 characters'),
    value: (schema) => schema.min(1, 'Value is required').max(1024, 'Value must be at most 1024 characters'),
}).pick({
    name: true,
    value: true,
})
export const profileSelectSchema = createSelectSchema(profile)

export const profileQuestion = pgTable('profile_question', {
    id: bigint({ mode: 'bigint' }).primaryKey(),
    question: varchar({ length: 1024 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp('deleted_at'),
})

export type TProfileQuestion = typeof profileQuestion.$inferSelect
export type TNewProfileQuestion = typeof profileQuestion.$inferInsert

export const profileQuestionAnswer = pgTable('profile_question_answer', {
    id: bigint({ mode: 'bigint' }).primaryKey(),
    profileQuestionId: bigint({ mode: 'bigint' })
        .notNull()
        .references(() => profileQuestion.id),
    answer: varchar({ length: 2048 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp('deleted_at'),
})

export type TProfileQuestionAnswer = typeof profileQuestionAnswer.$inferSelect
export type TNewProfileQuestionAnswer = typeof profileQuestionAnswer.$inferInsert

export const profileRelations = relations(profile, ({ many }) => ({
    questions: many(profileQuestion),
}))

export const profileQuestionRelations = relations(profileQuestion, ({ many, one }) => ({
    profile: one(profile, {
        fields: [profileQuestion.id],
        references: [profile.id],
    }),
    answers: many(profileQuestionAnswer),
}))

export const profileQuestionAnswerRelations = relations(profileQuestionAnswer, ({ one }) => ({
    question: one(profileQuestion, {
        fields: [profileQuestionAnswer.profileQuestionId],
        references: [profileQuestion.id],
    }),
}))
