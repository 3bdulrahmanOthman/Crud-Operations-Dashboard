import { createUploadthing, type FileRouter } from "uploadthing/next"
import { ratelimit } from "@/lib/rate-limit"
import { UploadThingError } from "uploadthing/server"

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique route key
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      
      const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1"
      // const session = await getServerSession(authOptions);
      // if (!session?.user) throw new UploadThingError("Unauthorized");

      const { success } = await ratelimit.limit(ip)

      if (!success) {
        throw new UploadThingError("Rate limit exceeded")
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: 0 }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId)
      console.log("File URL:", file.ufsUrl)
      
      // Save upload record to database if needed
      // await db.fileUploads.create({
      //   data: {
      //     userId: metadata.userId,
      //     fileUrl: file.url,
      //     fileName: file.name,
      //     fileSize: file.size,
      //     uploadedAt: new Date()
      //   }
      // })

      return { uploadedBy: metadata.userId, url: file.ufsUrl }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

