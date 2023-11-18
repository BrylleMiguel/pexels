import { fetchImages } from '@/lib/fetchImages'
import { ImagesSchemaWithPhotos } from '@/models/images'
import { PhotoSchema } from '@/models/images'
import { z } from 'zod'

export default async function Images() {
  const res: z.infer<typeof ImagesSchemaWithPhotos> | undefined = await fetchImages('https://api.pexels.com/v1/curated')

  return (
    <div>
      {res?.photos.map((photo: z.infer<typeof PhotoSchema>) => {
        return (
          <img
            key={photo.id}
            src={photo.src.large}
            alt={photo.alt}
            width={300}
            height={300}
            style={{ objectFit: 'cover' }}
          />
        )
      })}
    </div>
  )
}
