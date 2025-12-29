import { asc, eq } from 'drizzle-orm'
import { db } from '..'
import { designs } from '../schema'

export const findMany = async () =>
    db
        .select()
        .from(designs)
        .orderBy(asc(designs.title)) // order by is mandatory
        .limit(4) // the number of rows to return
        .offset(4) // the number of rows to skip

export const deleteDesignById = async ({ id }: { id: string }) => db.delete(designs).where(eq(designs.id, id))
export const findOneById = async ({ id }: { id: string }) =>
    db.select().from(designs).where(eq(designs.id, id)).limit(1)
