'use client'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteAction } from '@/db/actions/design'
import { Row } from '@tanstack/react-table'
import { EllipsisVertical } from 'lucide-react'
import { useActionState } from 'react'

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TDesign>({ row }: DataTableRowActionsProps<TDesign>) {
    const { id } = row
    const [state, formAction, pending] = useActionState(deleteAction, null)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                    size="icon"
                >
                    <EllipsisVertical />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Make a copy</DropdownMenuItem>
                <DropdownMenuItem>Favorite</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" disabled={pending} asChild>
                    <form id="delete-form" action={formAction}>
                        <input type="hidden" name="id" value={id} />
                        <button type="submit" form="delete-form">
                            {pending ? 'Deleting...' : 'Delete'}
                        </button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
