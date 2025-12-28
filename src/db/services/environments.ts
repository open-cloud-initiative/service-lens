import { db } from '@/db'
import { environmentSelectSchema, environments } from '@/db/schemas/environment'
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
