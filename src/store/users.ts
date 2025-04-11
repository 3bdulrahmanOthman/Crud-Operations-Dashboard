import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { UserProps } from "@/types";
import { UserService } from "@/lib/services/user";

interface UserState {
  users: UserProps[];
  isLoading: boolean;
  fetchUserById: (id: UserProps["id"]) => Promise<UserProps | null>;
  addUser: (user: Omit<UserProps, "id">) => Promise<void>;
  updateUser: (user: UserProps) => Promise<void>;
  deleteUser: (id: UserProps["id"]) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  immer((set) => ({
    users: [],
    isLoading: false,

    fetchUserById: async (id) => {
      try {
        return await UserService.fetchById(id);
      } catch (error) {
        console.error(`❌ Error fetching user ${id}:`, error);
        return null;
      }
    },

    addUser: async (user) => {
      set({ isLoading: true });
      try {
        const newUser = await UserService.create(user);
        set((state) => {
          state.users.push(newUser);
          state.isLoading = false;
        });
      } catch (error) {
        console.error("❌ Error adding user:", error);
        set({ isLoading: false });
        throw error;
      }
    },

    updateUser: async (user) => {
      set({ isLoading: true });
      try {
        const updatedUser = await UserService.update(user);
        set((state) => {
          const index = state.users.findIndex((u) => u.id === user.id);
          if (index !== -1) state.users[index] = updatedUser;
          state.isLoading = false;
        });
      } catch (error) {
        console.error("❌ Error updating user:", error);
        set({ isLoading: false });
        throw error;
      }
    },

    deleteUser: async (id) => {
      set({ isLoading: true });
      try {
        await UserService.remove(id);
        set((state) => {
          state.users = state.users.filter((u) => u.id !== id);
          state.isLoading = false;
        });
      } catch (error) {
        console.error("❌ Error deleting user:", error);
        set({ isLoading: false });
        throw error;
      }
    },
  }))
);
