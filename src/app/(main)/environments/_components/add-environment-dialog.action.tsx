'use server'

import { db } from '@/db'
import { environmentInsertSchema, environments } from '@/db/schema'
import 'server-only'
import { z } from 'zod'

export type AddEnvironmentActionState = {
    errors: z.ZodIssue[]
    success: boolean
    environmentId?: string
}

export async function addEnvironmentAction(prev: AddEnvironmentActionState, state: FormData) {
    try {
        const newEnvironment = {
            name: state.get('name') as string,
        }

        const parsedEnvironment = environmentInsertSchema.parse(newEnvironment)
        const [environment] = await db
            .insert(environments)
            .values(parsedEnvironment)
            .returning({ insertedId: environments.id })

        return { errors: [], success: true, environmentId: environment.insertedId }
    } catch (err) {
        console.error('Error adding environment:', err)
        if (err instanceof z.ZodError) {
            return { errors: err.issues, success: false }
        }

        return { errors: [], success: false }
    }
}
