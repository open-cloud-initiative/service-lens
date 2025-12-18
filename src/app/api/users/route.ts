import { Design } from '@/db/models/design'

export type CreateDesignRequest = Omit<Design, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateDesignRequest = Partial<Omit<Design, 'id'>> & { id: Design['id'] }
export type DeleteDesignRequest = { id: Design['id'] }

export type ApiRequest<T = void> = {
    offset?: number
    limit?: number
    filter?: Partial<T>
}

export type ApiResponse<T> = {
    items: T[]
    totalCount: number
    offset: number
    limit: number
}
export const ApiResponse = class<T> implements ApiResponse<T> {
    items: T[] = []
    totalCount: number = 0
    offset: number = 0
    limit: number = 0
}

export type GetDesignsRequest = ApiRequest<Design>

export async function GET(request: Request) {
    const body: ApiRequest = await request.json()

    const designs = await Design.findAll({
        offset: body.offset ?? 0,
        limit: body.limit ?? 100,
    })

    const res = new ApiResponse<Design>()
    res.items = designs
    res.totalCount = designs.length
    res.offset = body.offset ?? 0
    res.limit = body.limit ?? 100

    return new Response(JSON.stringify(res), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    })
}

export async function POST(request: Request) {
    const body = await request.json()
    const design = await Design.create({ ...body })

    return new Response(JSON.stringify(design), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    })
}
