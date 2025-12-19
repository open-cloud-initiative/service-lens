'use server'

import { db } from '@/db'
import { environmentTable } from '@/db/schema'

type NewEnvironmnet = typeof environmentTable.$inferInsert

export async function createEnvironment(environment: NewEnvironmnet) {
    await db.insert(environmentTable).values(environment)
}
