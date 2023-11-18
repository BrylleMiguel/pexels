import { ImagesSchemaWithPhotos } from '@/models/images'
import { ZodError, z } from 'zod'
import { cleanEnv, str } from 'envalid'

const env = cleanEnv(process.env, {
  PEXELS_API_KEY: str(),
})

export const fetchImages = async (url: string): Promise<z.infer<typeof ImagesSchemaWithPhotos> | undefined> => {
  try {
    const res = await fetch(url, { headers: { Authorization: env.PEXELS_API_KEY } })

    if (!res.ok) {
      throw new Error(`Failed to fetch images. Status: ${res.status}`)
    }

    const data: z.infer<typeof ImagesSchemaWithPhotos> = await res.json()

    const validatedData = ImagesSchemaWithPhotos.safeParse(data)

    if (!validatedData.success) {
      throw new Error('Invalid data format')
    }

    if (validatedData.success) {
      return data
    }
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Zod validation error:', error.errors)
    } else {
      console.error('An unexpected error occurred:', error)
    }
  }
}
