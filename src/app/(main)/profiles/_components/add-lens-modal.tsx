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
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadList,
    FileUploadTrigger,
} from '@/components/ui/file-upload'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload, Plus, X } from 'lucide-react'
import * as React from 'react'
import { useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { createEnvironmentAction } from './add-lens-modal.action'

const formSchema = z.object({
    files: z
        .array(z.custom<File>())
        .min(1, 'Please select at least one file')
        .max(2, 'Please select up to 2 files')
        .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
            message: 'File size must be less than 5MB',
            path: ['files'],
        }),
})

type FormValues = z.infer<typeof formSchema>

export function AddLensModal() {
    const [state, formAction, pending] = useActionState(createEnvironmentAction, null)

    const [files, setFiles] = React.useState<File[]>([])

    const onFileReject = React.useCallback((file: File, message: string) => {
        toast(message, {
            description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
        })
    }, [])

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            files: [],
        },
    })

    const onSubmit = React.useCallback((data: FormValues) => {
        toast('Submitted values:', {
            description: (
                <pre className="mt-2 w-80 rounded-md bg-accent/30 p-4 text-accent-foreground">
                    <code>
                        {JSON.stringify(
                            data.files.map((file) =>
                                file.name.length > 25 ? `${file.name.slice(0, 25)}...` : file.name,
                            ),
                            null,
                            2,
                        )}
                    </code>
                </pre>
            ),
        })
    }, [])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="default">
                    <Plus />
                    <span>Add Profile</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Create Lens</DialogTitle>
                    <DialogDescription>Fill in the information below to create a new lens.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md">
                        <FormField
                            control={form.control}
                            name="files"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Attachments</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            accept="image/*"
                                            maxFiles={2}
                                            maxSize={5 * 1024 * 1024}
                                            onFileReject={(_, message) => {
                                                form.setError('files', {
                                                    message,
                                                })
                                            }}
                                            multiple
                                        >
                                            <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                                                <CloudUpload className="size-4" />
                                                Drag and drop or
                                                <FileUploadTrigger asChild>
                                                    <Button variant="link" size="sm" className="p-0">
                                                        choose files
                                                    </Button>
                                                </FileUploadTrigger>
                                                to upload
                                            </FileUploadDropzone>
                                            <FileUploadList>
                                                {field.value?.map((file, index) => (
                                                    <FileUploadItem key={index} value={file}>
                                                        <FileUploadItemPreview />
                                                        <FileUploadItemMetadata />
                                                        <FileUploadItemDelete asChild>
                                                            <Button variant="ghost" size="icon" className="size-7">
                                                                <X />
                                                                <span className="sr-only">Delete</span>
                                                            </Button>
                                                        </FileUploadItemDelete>
                                                    </FileUploadItem>
                                                ))}
                                            </FileUploadList>
                                        </FileUpload>
                                    </FormControl>
                                    <FormDescription>Upload up to 2 images up to 5MB each.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" form="add-environment-form" disabled={pending}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
