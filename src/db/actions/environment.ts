'use server'

import { db } from '@/db'
import { environmentInsertSchema, environmentTable } from '@/db/schema'
import { z } from 'zod'

type NewEnvironmnet = typeof environmentTable.$inferInsert

export async function createEnvironment(environment: NewEnvironmnet) {
    try {
        const parsedEnvironment = environmentInsertSchema.parse(environment)
        await db.insert(environmentTable).values(parsedEnvironment)
    } catch (err) {
        if (err instanceof z.ZodError) {
            return err.issues
        }
    }
}
