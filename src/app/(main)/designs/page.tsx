import { getDesigns } from '@/db/queries/designs'
import { paginationParams } from '@/db/queries/pagination'
import type { SearchParams } from '@/types'
import { DataTable } from './_components/data-table'

interface IndexPageProps {
    searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: IndexPageProps) {
    const params = await searchParams
    const parsedParams = paginationParams.parse(params)
    console.log(parsedParams)
    const { data, pageCount } = await getDesigns(parsedParams)

    return (
        <div className="@container/main flex flex-col gap-4 md:gap-6">
            <DataTable data={data} queryKeys={params} pageCount={pageCount} />
        </div>
    )
}
