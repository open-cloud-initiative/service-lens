import { betterAuth } from 'better-auth'
import { organizationClient } from 'better-auth/client/plugins'
import { Pool } from 'pg'

export const auth = betterAuth({
    plugins: [organizationClient()],
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    emailAndPassword: {
        enabled: true,
    },
    database: new Pool({
        connectionString: 'postgres://postgres:password@localhost:5432/default',
    }),
})
