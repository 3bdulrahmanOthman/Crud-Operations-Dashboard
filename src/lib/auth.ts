import { AuthOptions, DefaultSession, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/lib/services/auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      role?: string | null;
    } & DefaultSession["user"];
    token: string;
  }

  interface User {
    token: string;
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string | null;
    token: string;
  }
}

export const authOptions: AuthOptions = {
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

          return user
            ? {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.avatar,
                role: user.role || "user",
                token: accessToken,
              }
            : null;
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
        token.id = user.id;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.token = token.token;
      session.user = {
        id: token.id,
        role: token.role,
        ...session.user,
      };
      return session;
    },
  },
  pages: {
    signIn: '/signin',
    error: '/signin'
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 4 * 60 * 60, updateAge: 15 * 60 },
  jwt: { maxAge: 4 * 60 * 60 },
};
