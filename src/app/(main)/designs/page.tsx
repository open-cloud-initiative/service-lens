import { fetchDesigns } from '@/hooks/use-designs'

export default async function Page({ children }: Readonly<{ children: React.ReactNode }>) {
    const { designs } = await fetchDesigns()

    return (
        <ul>
            {designs?.map((design) => (
                <li key={design?.id}>
                    <h2>{design?.title}</h2>
                    <p>{design?.body}</p>
                </li>
            ))}
        </ul>
    )
}
