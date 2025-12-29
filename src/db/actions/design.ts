'use server'

import { deleteDesignById } from '@/db/services/designs'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { TDeleteDesignAction, deleteDesignSchema } from './schema'

// export const createAction: TCreateDesignAction = async (design) => {
//     try {
//         const parsedDesign = designInsertSchema.parse(design)
//         const newDesign = await db.insert(designs).values(parsedDesign).returning()
//         return {
//             success: true,
//             data: newDesign[0],
//         }
//     } catch (err) {
//         if (err instanceof z.ZodError) {
//             return {
//                 success: false,
//                 errors: err.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
//             }
//         }
//         return {
//             success: false,
//             errors: [{ path: 'unknown', message: 'An unknown error occurred' }],
//         }
//     }
// }

export const deleteAction: TDeleteDesignAction = async (_, data) => {
    try {
        const parsedData = deleteDesignSchema.parse(Object.fromEntries(data.entries()))
        await deleteDesignById({ id: parsedData.id })
        revalidatePath('/designs', 'page')
    } catch (err) {
        console.error(err)
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
