import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"
import { UploadThingError } from "uploadthing/server"

export async function rateLimit({
  id,
  limit = 10,
  timeframe = 60, // in seconds
}: {
  id: string
  limit?: number
  timeframe?: number
}) {
  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(limit, `${timeframe}s`),
    analytics: true,
    prefix: "uploader/ratelimit",
  })

  const { success, limit: rateLimitInfo, reset, remaining } = await ratelimit.limit(id)

  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000)
    throw new UploadThingError(`Rate limit exceeded. Try again in ${retryAfter} seconds. Remaining: ${remaining}/${rateLimitInfo}`)
  }

  return { success, remaining, limit: rateLimitInfo }
}

