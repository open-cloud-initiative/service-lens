'use server'

import { db } from '@/db'
import { designInsertSchema, designs } from '@/db/schema'
import type { TNewDesign } from '@/db/schemas/design'
import { z } from 'zod'

export async function createDesign(design: TNewDesign) {
    try {
        const parsedDesign = designInsertSchema.parse(design)
        const newDesign = await db.insert(designs).values(parsedDesign)
        return newDesign
    } catch (err) {
        if (err instanceof z.ZodError) {
            return err.issues
        }
    }
}
