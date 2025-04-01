import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { uploadFiles } from "@/lib/uploadthing"
import type { OurFileRouter } from "@/app/api/uploadthing/core" // Assuming the file router is defined here

export type UploadStatus = "idle" | "preparing" | "uploading" | "success" | "error"

export interface FileUpload {
  id: string
  file: File
  progress: number
  status: UploadStatus
  url?: string
  error?: string
}

interface UploadState {
  uploads: Record<string, FileUpload>
  recentUploads: string[] // URLs of recently uploaded files

  // Actions
  addFiles: (files: File[], endpoint: keyof OurFileRouter) => Promise<string[]>
  removeFile: (id: string) => void
  clearUploads: () => void
  resetUploadState: (id: string) => void
}

export const useUploadStore = create<UploadState>()(
  devtools(
    persist(
      (set, get) => ({
        uploads: {},
        recentUploads: [],

        addFiles: async (files, endpoint) => {
          // Create upload entries with unique IDs
          const fileUploads: Record<string, FileUpload> = {}
          const fileIds: string[] = []

          files.forEach((file) => {
            const id = `${Date.now()}-${file.name}-${Math.random().toString(36).substring(2, 9)}`
            fileUploads[id] = {
              id,
              file,
              progress: 0,
              status: "preparing",
            }
            fileIds.push(id)
          })

          // Update state with new uploads
          set((state) => ({
            uploads: {
              ...state.uploads,
              ...fileUploads,
            },
          }))

          try {
            // Start the upload process
            const res = await uploadFiles({
              endpoint,
              files,
              onUploadProgress: ({ progress }) => {
                // Update progress for all files in this batch
                set((state) => {
                  const updatedUploads = { ...state.uploads }
                  fileIds.forEach((id) => {
                    if (updatedUploads[id]) {
                      updatedUploads[id] = {
                        ...updatedUploads[id],
                        progress,
                        status: "uploading",
                      }
                    }
                  })
                  return { uploads: updatedUploads }
                })
              },
              onUploadBegin: ({ file }) => {
                // Find the ID for this file
                const id = fileIds.find((id) => get().uploads[id]?.file.name === file.name)
                if (id) {
                  set((state) => ({
                    uploads: {
                      ...state.uploads,
                      [id]: {
                        ...state.uploads[id],
                        status: "uploading",
                      },
                    },
                  }))
                }
              },
            })

            // Update state with successful uploads
            const uploadedUrls: string[] = []

            res.forEach((result, index) => {
              const id = fileIds[index]
              if (id && result.url) {
                uploadedUrls.push(result.url)
                set((state) => ({
                  uploads: {
                    ...state.uploads,
                    [id]: {
                      ...state.uploads[id],
                      status: "success",
                      progress: 100,
                      url: result.url,
                    },
                  },
                  recentUploads: [result.url, ...state.recentUploads].slice(0, 20),
                }))
              }
            })

            return uploadedUrls
          } catch (error) {
            // Update state with error
            set((state) => {
              const updatedUploads = { ...state.uploads }
              fileIds.forEach((id) => {
                if (updatedUploads[id]) {
                  updatedUploads[id] = {
                    ...updatedUploads[id],
                    status: "error",
                    error: error instanceof Error ? error.message : "Upload failed",
                  }
                }
              })
              return { uploads: updatedUploads }
            })

            return []
          }
        },

        removeFile: (id) => {
          set((state) => {
            const { [id]: _, ...restUploads } = state.uploads
            return { uploads: restUploads }
          })
        },

        clearUploads: () => {
          set({ uploads: {} })
        },

        resetUploadState: (id) => {
          set((state) => ({
            uploads: {
              ...state.uploads,
              [id]: {
                ...state.uploads[id],
                status: "idle",
                progress: 0,
                error: undefined,
              },
            },
          }))
        },
      }),
      {
        name: "upload-store",
        partialize: (state) => ({ recentUploads: state.recentUploads }),
      },
    ),
  ),
)

