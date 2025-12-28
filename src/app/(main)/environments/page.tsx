import { findEnvironments } from '@/db/services/environments'
import { DataTable } from './_components/data-table'

export default async function Page() {
    const data = await findEnvironments()

    return (
        <div className="@container/main flex flex-col gap-4 md:gap-6">
            <DataTable data={data} />
        </div>
    )
}
