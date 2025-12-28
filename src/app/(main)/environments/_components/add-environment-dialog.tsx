'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { addEnvironmentAction } from './add-environment-dialog.action'

export function AddEnvironmentDialog() {
    const router = useRouter()

    const [state, formAction, pending] = useActionState(addEnvironmentAction, {
        errors: [],
        success: false,
    })

    useEffect(() => {
        if (state.success) {
            router.push(`/environments/${state.environmentId}`)
        }
    }, [router, state.success, state.environmentId])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                    <Plus />
                    <span>Add Environment</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Create Environment</DialogTitle>
                    <DialogDescription>Fill in the information below to create a new environment.</DialogDescription>
                </DialogHeader>
                <form id="quick-create-form" action={formAction} className="w-full">
                    <div className="grid gap-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Brunwald Castle"
                            autoComplete="off"
                            disabled={pending}
                            required
                        />
                        {/* {formErrors.map((error, index) => (
                            <FormMessage key={index}>{error.path}</FormMessage>
                        ))} */}
                    </div>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" form="quick-create-form" disabled={pending}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
