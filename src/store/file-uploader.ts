import { create } from "zustand"
import type { FileRejection } from "react-dropzone"

// Define the file uploader state
interface FileUploaderState {
  // State
  files: File[]
  uploadedUrls: string[]
  status: "idle" | "uploading" | "success" | "error"
  progress: number
  error: Error | null
  rejectedFiles: FileRejection[]

  // Actions
  setFiles: (files: File[]) => void
  setRejectedFiles: (files: FileRejection[]) => void
  startUpload: () => void
  updateProgress: (progress: number) => void
  uploadSuccess: (urls: string[]) => void
  uploadError: (error: Error) => void
  reset: () => void
  removeFile: (url: string) => void
  setUploadedUrls: (urls: string[]) => void
}

export const useFileUploaderStore = create<FileUploaderState>((set) => ({
  // Initial state
  files: [],
  uploadedUrls: [],
  status: "idle",
  progress: 0,
  error: null,
  rejectedFiles: [],

  // Actions
  setFiles: (files) =>
    set({
      files,
      status: "idle",
      error: null,
    }),

  setRejectedFiles: (rejectedFiles) => set({ rejectedFiles }),

  startUpload: () =>
    set({
      status: "uploading",
      progress: 0,
      error: null,
    }),

  updateProgress: (progress) => set({ progress }),

  uploadSuccess: (urls) =>
    set((state) => ({
      status: "success",
      progress: 100,
      files: [],
      uploadedUrls: [...state.uploadedUrls, ...urls],
      error: null,
    })),

  uploadError: (error) =>
    set({
      status: "error",
      error,
    }),

  reset: () =>
    set(() => ({
      files: [],
      status: "idle",
      progress: 0,
      error: null,
      rejectedFiles: [],
    })),

  removeFile: (url) =>
    set((state) => ({
      uploadedUrls: state.uploadedUrls.filter((u) => u !== url),
    })),

  setUploadedUrls: (urls) => set({ uploadedUrls: urls }),
}))

