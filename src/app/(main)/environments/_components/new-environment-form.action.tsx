'use server'

import { createEnvironment } from '@/db/actions/environment'
import 'server-only'

type State = {
    name: string
    description: string
}

export async function createEnvironmentAction(prev: { message: string; payload: null }, state: FormData) {
    try {
        const newEnvironment = {
            name: state.get('name') as string,
            description: state.get('description') as string,
        }
        await createEnvironment(newEnvironment)
        return {
            message: 'Todo has successfully been added!',
            payload: null,
        }
    } catch (err) {
        console.error('Error creating environment:', err)
        return { message: 'Uh oh, Todo could not be added :(', payload: null }
    }
}
