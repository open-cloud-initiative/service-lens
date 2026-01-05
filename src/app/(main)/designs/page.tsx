import { db } from '@/db'
import { design, designSelectSchema } from '@/db/schema'
import { asc } from 'drizzle-orm'
import { DataTable } from './_components/data-table'

export default async function Page() {
    const findManyDesigns = async () => {
        const rows = await db
            .select()
            .from(design)
            .orderBy(asc(design.title)) // order by is mandatory
            .limit(100) // the number of rows to return
            .offset(0)

        return rows.map((row) => designSelectSchema.parse(row))
    }

    const data = await findManyDesigns()

    return (
        <div className="@container/main flex flex-col gap-4 md:gap-6">
            <DataTable data={data} />
        </div>
    )
}
