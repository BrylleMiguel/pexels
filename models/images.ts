import { z } from 'zod'

const ImageListSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  prev_page: z.string().optional(),
  next_page: z.string().optional(),
  total_results: z.number(),
})

export const PhotoSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  src: z.object({
    large2x: z.string(),
    large: z.string(),
    portrait: z.string(),
    landscape: z.string(),
  }),
  alt: z.string(),
  blurredDataUrl: z.string().optional(),
})

export const ImagesSchemaWithPhotos = ImageListSchema.extend({
  photos: z.array(PhotoSchema),
})
