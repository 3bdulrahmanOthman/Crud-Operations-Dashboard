import { useSession, signOut } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();
  return {
    user: session?.user || null,
    token: session?.token || null,
    loading: status === "loading",
    logout: () => signOut(),
  };
}
