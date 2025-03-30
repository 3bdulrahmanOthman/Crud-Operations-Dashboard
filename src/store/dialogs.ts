"use client";

import { create } from "zustand";

type DialogType = "add" | "edit" | "delete" | "view" | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DialogState<TData = any> {
  open: DialogType;
  data: TData | null;
  setOpen: (dialog: DialogType, data?: TData | null) => void;
  close: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  open: null,
  data: null,

  setOpen: (dialog, data = null) =>
    set({ open: dialog, data }),

  close: () =>
    set({ open: null, data: null }),
}));
