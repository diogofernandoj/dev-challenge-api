import { z } from 'zod'

export const createSportSchema = z
    .object({
        name: z
            .string({
                required_error: 'Name is required',
            })
            .trim()
            .min(1, {
                message: 'Name is required',
            }),
        description: z
            .string({
                required_error: 'Description is required',
            })
            .trim()
            .min(1, {
                message: 'Description is required',
            }),
        difficulty_level: z.enum(['EASY', 'MEDIUM', 'HARD'], {
            errorMap: () => ({
                message: 'Difficulty level must be EASY, MEDIUM or HARD.',
            }),
        }),
    })
    .strict({
        message: 'Some provided field is not allowed',
    })
