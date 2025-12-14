// Proxy disabled.
// Rename this file to `proxy.ts` to enable it.
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Runs before requests complete.
 * Use for rewrites, redirects, or header changes.
 * Refer to Next.js Proxy docs for more examples.
 */
export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
    if (!session) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    return NextResponse.next()
}

/**
 * Matcher runs for all routes.
 * To skip assets or APIs, use a negative matcher from docs.
 */
export const config = {
    matcher: '/:path*',
}
