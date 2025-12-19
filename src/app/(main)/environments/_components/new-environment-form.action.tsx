'use server'

import { createEnvironment } from '@/db/actions/environment'
import 'server-only'

export async function createEnvironmentAction(data: FormData) {
    return await createEnvironment({
        name: data.get('name') as string,
        description: data.get('description') as string,
    })
}
