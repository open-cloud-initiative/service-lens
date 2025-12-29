'use server'

import { db } from '@/db'
import { designInsertSchema, designs, TDesign, TNewDesign } from '@/db/schema'
import { z } from 'zod'
import { deleteDesignById } from '../services/designs'
import { Action } from './schema'

export type TCreateDesignSchema = TNewDesign
export type TCreateDesignAction = Action<TCreateDesignSchema, TDesign>

export const createAction: TCreateDesignAction = async (design) => {
    try {
        const parsedDesign = designInsertSchema.parse(design)
        const newDesign = await db.insert(designs).values(parsedDesign).returning()
        return {
            success: true,
            data: newDesign[0],
        }
    } catch (err) {
        if (err instanceof z.ZodError) {
            return {
                success: false,
                errors: err.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
            }
        }
        return {
            success: false,
            errors: [{ path: 'unknown', message: 'An unknown error occurred' }],
        }
    }
}

export const deleteDesignSchema = z.object({
    id: z.uuid(),
})
export type TDeleteDesignSchema = z.infer<typeof deleteDesignSchema>
export type TDeleteDesignAction = Action<TDeleteDesignSchema, null>

export const deleteAction: TDeleteDesignAction = async ({ id }) => {
    try {
        await deleteDesignById({ id })
    } catch (err) {
        if (err instanceof z.ZodError) {
            return {
                success: false,
                errors: err.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
            }
        }
    }

    return {
        success: true,
        data: null,
    }
}
