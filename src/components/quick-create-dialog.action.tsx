'use server'

import { db } from '@/db'
import { designInsertSchema, designs } from '@/db/schema'
import 'server-only'
import { z } from 'zod'

export async function createDesignAction(
    prev: { errors: z.ZodIssue[]; success: boolean; designId?: string } | undefined,
    state: FormData,
) {
    try {
        const newDesign = {
            title: state.get('title') as string,
        }

        const parsedDesign = designInsertSchema.parse(newDesign)
        const [design] = await db.insert(designs).values(parsedDesign).returning({ insertedId: designs.id })

        return { errors: [], success: true, designId: design.insertedId }
    } catch (err) {
        if (err instanceof z.ZodError) {
            return { errors: err.issues, success: false }
        }

        return { errors: [], success: false }
    }
}
