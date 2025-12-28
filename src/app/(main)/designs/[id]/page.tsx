import { ActionGroup } from '../_components/actions-group'

export default async function Page() {
    return (
        <>
            <div className="w-full flex justify-end">
                <ActionGroup />
            </div>
            <div className="@container/main flex flex-col gap-4 md:gap-6">
                <h1>Designs Page</h1>
            </div>
        </>
    )
}
