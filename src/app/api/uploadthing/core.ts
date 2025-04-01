import { createUploadthing, type FileRouter } from "uploadthing/next"
import { rateLimit } from "@/lib/rate-limit"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { UploadThingError } from "uploadthing/server"

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async ({  }) => {
      // const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1"
      const session = await getServerSession(authOptions);
      if (!session?.user) throw new UploadThingError("Unauthorized");

      await rateLimit({id: `product_${session?.user.id}`, limit: 5});

      return { userId: session?.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)
      console.log("File URL:", file.ufsUrl)
      
      // Save upload record to database if needed
      // await db.fileUploads.create({
      //   data: {
      //     userId: metadata.userId,
      //     fileUrl: file.ufsUrl,
      //     fileName: file.name,
      //     fileSize: file.size,
      //     uploadedAt: new Date()
      //   }
      // })

      return { uploadedBy: metadata.userId, url: file.ufsUrl }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter;

