import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/lib/api/auth";
import { UserProps } from "@/types";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: UserProps;
    token: string;
  }

  interface User {
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          const { user, accessToken } = await loginUser(
            credentials.email,
            credentials.password
          );

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.avatar,
            role: user.role || "user",
            token: accessToken,
          };
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.token) {
        session = { ...session, token: token.token };
      }
      return session;
    },
  },

  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" as const },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
