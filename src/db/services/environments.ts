import { Environment } from '@/db/models/environment'

export type Pagination = {
    offset?: number
    limit?: number
}

export async function createEnvironment({ name, description }: { name: string; description: string }) {
    const w = new Environment({ name, description })
    await w.validate()

    const workload = await w.save()

    return workload.save()
}
