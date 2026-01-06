import { db } from '@/db/index'
import { designs, TNewDesign } from '@/db/schema'

export async function seedDesign(input: { count: number }) {
    const count = input.count ?? 100

    try {
        const allDesigns: TNewDesign[] = []

        for (let i = 0; i < count; i++) {
            allDesigns.push(generateRandomDesign())
        }

        await db.delete(designs)

        console.log('📝 Inserting designs', allDesigns.length)

        await db.insert(designs).values(allDesigns).onConflictDoNothing()
    } catch (err) {
        console.error(err)
    }
}

export function generateRandomDesign(input?: Partial<TNewDesign>): TNewDesign {
    return {
        title: `Design ${Math.floor(Math.random() * 1000)}`,
        description: `This is a description for design ${Math.floor(Math.random() * 1000)}`,
    }
}
