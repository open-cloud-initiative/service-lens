'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createEnvironmentAction } from './new-environment-form.action'

const FormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    description: z.string().min(2, { message: 'Description must be at least 2 characters.' }),
})

export const initialState = [] as z.infer<typeof FormSchema>[]

export function NewEnvironmentForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    })

    const [state, formAction, pending] = useActionState(createEnvironmentAction, { message: '', payload: null })

    return (
        <Form {...form}>
            <form action={formAction} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input id="name" type="text" placeholder="Indy Jones" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input id="description" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
                    Save
                </Button>
            </form>
        </Form>
    )
}
