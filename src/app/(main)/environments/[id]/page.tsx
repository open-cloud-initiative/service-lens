import { Input } from '@/components/ui/input'
import { findEnvironmentById } from '@/db/services/environments'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const environment = await findEnvironmentById({ id })

    return (
        <div className="@container/main flex flex-col gap-4 md:gap-6">
            <Input value={environment.name} readOnly disabled />
        </div>
    )
}
