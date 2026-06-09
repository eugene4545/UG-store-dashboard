import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Demo account — change these before a real launch
        const DEMO_EMAIL = "demo@eugies.com";
        const DEMO_PASSWORD = "eugies2025";

        if (
          credentials?.email === DEMO_EMAIL &&
          credentials?.password === DEMO_PASSWORD
        ) {
          return { id: "1", name: "Eugene Onuoha", email: DEMO_EMAIL };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
