import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        if (res.ok) {
          return await res.json();
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.access = user?.access;
        token.email = user?.email;
        token.firstName = user?.firstName;
        token.lastName = user?.lastName;
        token.image = user?.image;
        token.access = user?.access;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token?.id;
        session.user.email = token?.email;
        session.user.firstName = token?.firstName;
        session.user.lastName = token?.lastName;
        session.user.image = token?.image;
        session.access = token?.access;
      }
      return session;
    },
  },
});
