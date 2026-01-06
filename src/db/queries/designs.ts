import 'server-only'

import { db } from '@/db'
import { designs } from '@/db/schema'
import { designInsertSchema, TDesignInsertSchema } from '@/db/schemas/design'
import { count } from 'drizzle-orm'
import { paginationParams } from './pagination'

export type GetDesignsSchema = ReturnType<typeof paginationParams.parse>

export async function getDesigns(input: GetDesignsSchema) {
    try {
        const offset = (input.page - 1) * input.perPage
        const { data, total } = await db.transaction(async (tx) => {
            const data = await tx.select().from(designs).limit(input.perPage).offset(offset)

            const total = await tx
                .select({
                    count: count(),
                })
                .from(designs)
                .execute()
                .then((res) => res[0]?.count ?? 0)

            return {
                data,
                total,
            }
        })

        const pageCount = Math.ceil(total / input.perPage)
        return { data, pageCount }
    } catch {
        return { data: [], pageCount: 0 }
    }
}

export const insertDesign = async (input: TDesignInsertSchema) => {
    const parsed = await designInsertSchema.parseAsync(input)
    const result = await db.insert(designs).values(parsed).returning()
    return result[0]
}
