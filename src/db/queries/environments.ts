import 'server-only'

import { db } from '@/db'
import { designs, environmentInsertSchema, environments, TEnvironmentInsertSchema } from '@/db/schema'
import { count } from 'drizzle-orm'
import { paginationParams } from './pagination'

export type getEnvironmentsSchema = ReturnType<typeof paginationParams.parse>

export async function getEnvironments(input: getEnvironmentsSchema) {
    try {
        const offset = (input.page - 1) * input.perPage
        const { data, total } = await db.transaction(async (tx) => {
            const data = await tx.select().from(environments).limit(input.perPage).offset(offset)

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

export const insertEnvironment = async (input: TEnvironmentInsertSchema) => {
    const parsed = await environmentInsertSchema.parseAsync(input)
    const result = await db.insert(environments).values(parsed).returning()
    return result[0]
}
