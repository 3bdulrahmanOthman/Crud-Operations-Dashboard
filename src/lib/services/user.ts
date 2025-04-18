import api from "../axios";
import { UserProps } from "@/types";
import { cachedApiCall } from "@/lib/cache";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/cache";

export const UserService = {
  async fetchAll(): Promise<UserProps[]> {
    return cachedApiCall(
      "users:all",
      async () => {
        const { data } = await api.get("/users");
        return data;
      },
      [CACHE_TAGS.USERS],
      CACHE_TTL.MEDIUM
    );
  },

  async fetchById(id: UserProps["id"]): Promise<UserProps> {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },

  async create(user: Omit<UserProps, "id">): Promise<UserProps> {
    const { data } = await api.post("/users", user);
    return data;
  },

  async update(user: UserProps): Promise<UserProps> {
    const { data } = await api.put(`/users/${user.id}`, user);
    return data;
  },

  async remove(id: UserProps["id"]): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  async checkEmail(email: UserProps["email"]): Promise<boolean> {
    const { data } = await api.post(`/users/is-available`, { email });
    return data.isAvailable;
  },
};
