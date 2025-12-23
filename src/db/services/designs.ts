import { asc } from 'drizzle-orm'
import { db } from '..'
import { designs } from '../schema'

export const findMany = async () =>
    db
        .select()
        .from(designs)
        .orderBy(asc(designs.title)) // order by is mandatory
        .limit(4) // the number of rows to return
        .offset(4) // the number of rows to skip
