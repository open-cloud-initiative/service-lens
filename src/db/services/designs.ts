import { asc, eq } from 'drizzle-orm'
import { db } from '..'
import { design } from '../schema'

export const findMany = async () =>
    db
        .select()
        .from(design)
        .orderBy(asc(design.title)) // order by is mandatory
        .limit(4) // the number of rows to return
        .offset(4) // the number of rows to skip

export const deleteDesignById = async ({ id }: { id: string }) => db.delete(design).where(eq(design.id, id))
export const findOneById = async ({ id }: { id: string }) => db.select().from(design).where(eq(design.id, id)).limit(1)
