import { z } from 'zod'

export const PaginationSchema = z.object({
    limit: z.coerce.number().min(0).max(100).default(10),
    offset: z.coerce.number().min(0).default(0),
    order: z.enum(['asc', 'desc']).default('asc'),
    orderBy: z.string().default('id'),
})

export type PaginationSchema = z.infer<typeof PaginationSchema>

export const PaginatedResultSchema = <T extends z.ZodTypeAny>(result: T) => {
    return z.object({
        items: z.array(result),
        total: z.number(),
        limit: z.number(),
        offset: z.number(),
    })
}

export type PaginatedResultSchema<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof PaginatedResultSchema<T>>>
