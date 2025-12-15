import { betterAuth } from 'better-auth'
import { organization } from 'better-auth/plugins'
import { Pool } from 'pg'

export const auth = betterAuth({
    plugins: [
        organization({
            teams: { enabled: true },
        }),
    ],
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    emailAndPassword: {
        enabled: true,
    },
    database: new Pool({
        connectionString: 'postgres://postgres:password@localhost:5432/default',
    }),
})
