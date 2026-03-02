'use server'

import { insertLens } from '@/db/queries/lenses'
import { lensInsertSchema, TLens } from '@/db/schema'
import { lensSpecSchema } from '@/lib/spec'
import { redirect } from 'next/navigation'
import 'server-only'
import * as z from 'zod'
import { AddLensModalFormState } from './add-lens-modal.schema'

export async function createLensAction(_: AddLensModalFormState, data: FormData) {
    const values = {
        name: data.get('name') as string,
        spec: data.get('spec') as File,
    }

    const buffer = await values.spec.arrayBuffer()
    const json = new TextDecoder().decode(buffer)
    const spec = lensSpecSchema.safeParse(JSON.parse(json))

    const result = lensInsertSchema.safeParse({raw: spec.data, name: spec.data?.name})

    if (!result.success) {
        const errors = z.treeifyError(result.error)

        return {
            values,
            errors,
            success: false,
        }
    }

    let lens: TLens | null = null

    try {
        lens = await insertLens(result.data)
    } catch (error) {
        return {
            success: false,
        }
    }

    if (!lens) {
        return {
            success: false,
        }
    }

    return redirect(`/lenses/${lens?.id}`)
}
