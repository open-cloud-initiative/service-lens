import { FieldDescription } from '@/components/ui/field'
import { ActionGroup } from '../_components/actions-group'

export default async function Page() {
    return (
        <>
            <div className="w-full flex justify-end">
                <ActionGroup />
            </div>
            <div className="@container/main flex flex-col gap-4 md:gap-6">
                <FieldDescription>Title</FieldDescription>
                <h1 className="text-4xl font-extrabold tracking-tight text-balance scroll-m-20">Designs Page</h1>
            </div>
        </>
    )
}
