'use server'

import { db } from '@/db'
import { design, designInsertSchema } from '@/db/schema'
import 'server-only'
import { z } from 'zod'

export type CreateDesignActionState = {
    errors: z.ZodIssue[]
    success: boolean
    designId?: string
}

export async function createDesignAction(prev: CreateDesignActionState, state: FormData) {
    try {
        const newDesign = {
            title: state.get('title') as string,
        }

        const parsedDesign = designInsertSchema.parse(newDesign)
        const [item] = await db.insert(design).values(parsedDesign).returning({ insertedId: design.id })

        return { errors: [], success: true, designId: item.insertedId }
    } catch (err) {
        if (err instanceof z.ZodError) {
            return { errors: err.issues, success: false }
        }

        return { errors: [], success: false }
    }
}
