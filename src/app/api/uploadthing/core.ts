import { createUploadthing, type FileRouter } from "uploadthing/next"
import { rateLimit } from "@/lib/rate-limit"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { UploadThingError } from "uploadthing/server"

const f = createUploadthing()

// Define file routes with different configurations
export const ourFileRouter = {
  // Avatar uploads - single image, square aspect ratio
  avatar: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions)
      if (!session?.user) throw new UploadThingError("Unauthorized")

      await rateLimit({ id: `avatar_${session?.user.id}`, limit: 5 })

      return { userId: session?.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Avatar upload complete for userId:", metadata.userId)
      console.log("File URL:", file.ufsUrl)

      return { uploadedBy: metadata.userId, url: file.ufsUrl }
    }),

  // Product image uploads - multiple images
  productImage: f({ image: { maxFileSize: "2MB", maxFileCount: 4 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions)
      if (!session?.user) throw new UploadThingError("Unauthorized")

      await rateLimit({ id: `product_${session?.user.id}`, limit: 5 })

      return { userId: session?.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Product image upload complete for userId:", metadata.userId)
      console.log("File URL:", file.ufsUrl)

      return { uploadedBy: metadata.userId, url: file.ufsUrl }
    }),

  // Category image uploads - single image, specific dimensions
  categoryImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions)
      if (!session?.user) throw new UploadThingError("Unauthorized")

      await rateLimit({ id: `category_${session?.user.id}`, limit: 5 })

      return { userId: session?.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Category image upload complete for userId:", metadata.userId)
      console.log("File URL:", file.ufsUrl)

      return { uploadedBy: metadata.userId, url: file.ufsUrl }
    }),

  // Document uploads - PDF, DOC, etc.
  document: f({
    pdf: { maxFileSize: "8MB", maxFileCount: 5 },
    text: { maxFileSize: "8MB", maxFileCount: 5 },
    image: { maxFileSize: "4MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      const session = await getServerSession(authOptions)
      if (!session?.user) throw new UploadThingError("Unauthorized")

      await rateLimit({ id: `document_${session?.user.id}`, limit: 5 })

      return { userId: session?.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Document upload complete for userId:", metadata.userId)
      console.log("File URL:", file.ufsUrl)

      return { uploadedBy: metadata.userId, url: file.ufsUrl }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

