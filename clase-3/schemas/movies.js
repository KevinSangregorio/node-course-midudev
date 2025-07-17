const z = require('zod')

const movieSchema = z.object({
  title: z.string({ invalid_type_error: 'Movie title must be a string', required_error: 'Movie title is required' }),
  genre: z.array(z.string()).nonempty('At least one genre is required'),
  year: z.number().int().min(1900, 'Year must be a valid year').max(new Date().getFullYear(), 'Year cannot be in the future'),
  director: z.string().min(1, 'Director is required'),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10, 'Rate must be between 0 and 10').optional(),
  poster: z.url()
})

const validateMovie = (movie) => {
  return movieSchema.safeParse(movie)
}

const validatePartialMovie = (movie) => {
  return movieSchema.partial().safeParse(movie)
}

module.exports = { validateMovie, validatePartialMovie }
