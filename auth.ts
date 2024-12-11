import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
          const user = await res.json();
          return user;
        }
        return null;
      },
    }),
    Google,
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        const resUser = await fetch(
          `${process.env.BACKEND_URL}/auth/social_signin`,
          {
            method: "POST",
            body: JSON.stringify({
              email: user?.email,
              firstname: user?.name?.split(" ")[0] || "",
              lastname: user?.name?.split(" ")[1] || "",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const backendUser = await resUser.json();
        user["access"] = backendUser.access;
        user["is_admin"] = backendUser.is_admin;
        return user;
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.name = user?.name;
        token.sub = user?.id;
        token.email = user?.email;
        token.image = user?.image;
        token.access = user?.access;
        token.is_admin = user?.is_admin;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.sub!;
        session.user.name = token.name!;
        session.user.email = token.email!;
        session.user.is_admin = token.is_admin!;
        session.access = token?.access;
      }
      return session;
    },
  },
});
