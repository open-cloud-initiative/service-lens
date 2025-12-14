import NextAuth from 'next-auth'

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        // Example: GitHub Provider
        // GitHubProvider({
        //   clientId: process.env.GITHUB_ID,
        //   clientSecret: process.env.GITHUB_SECRET,
        // }),
    ],
    // Add more NextAuth configuration options here
})

export { handler as GET, handler as POST }
