import { db } from '@/db'
import { environments, environmentSelectSchema } from '@/db/schemas/environment'
import { eq } from 'drizzle-orm'

export type Pagination = {
    offset?: number
    limit?: number
}

export async function findEnvironmentById({ id }: { id: string }) {
    const rows = await db.select().from(environments).where(eq(environments.id, id)).limit(1)
    const parsed = environmentSelectSchema.parse(rows[0])

    return parsed
}

export async function findenvironment(pagination?: Pagination) {
    const query = db.select().from(environments).orderBy(environments.createdAt)

    if (pagination?.limit !== undefined) {
        query.limit(pagination.limit)
    }

    if (pagination?.offset !== undefined) {
        query.offset(pagination.offset)
    }

    const rows = await query
    const parsed = environmentSelectSchema.array().parse(rows)

    return parsed
}
