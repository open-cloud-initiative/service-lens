'use server'

import { createEnvironment } from '@/db/actions/environment'
import 'server-only'
import { z } from 'zod'

export async function createEnvironmentAction(prev: z.ZodIssue[], state: FormData) {
    try {
        const newEnvironment = {
            name: state.get('name') as string,
            description: state.get('description') as string,
        }

        await createEnvironment(newEnvironment)
        return []
    } catch (err) {
        if (err instanceof z.ZodError) {
            return err.issues
        }

        return []
    }
}
