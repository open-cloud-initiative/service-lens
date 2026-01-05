import { db } from '@/db'
import { design } from '@/db/schema'
import { count } from 'drizzle-orm'
import { paginationParams } from './pagination'

export type GetDesignsSchema = ReturnType<typeof paginationParams.parse>

export async function getDesigns(input: GetDesignsSchema) {
    try {
        const offset = (input.page - 1) * input.perPage
        console.log('Offset:', offset)
        console.log('Limit:', input.perPage)

        const { data, total } = await db.transaction(async (tx) => {
            const data = await tx.select().from(design).limit(input.perPage).offset(offset)

            const total = await tx
                .select({
                    count: count(),
                })
                .from(design)
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
