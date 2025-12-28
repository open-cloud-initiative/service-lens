import { z } from 'zod'

export const newEnvironmentSchema = z.object({
    name: z.string().min(1).max(255),
})

export type TNewEnvironmentFormValues = z.infer<typeof newEnvironmentSchema>
export const defaultValues: Partial<TNewEnvironmentFormValues> = {
    name: '',
}
