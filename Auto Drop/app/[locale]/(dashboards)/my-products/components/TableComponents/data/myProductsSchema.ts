import { z } from "zod"

export const myProductsSchema = z.object({
  id: z.string(),
  productName: z.string(),
  prodInfo: z.any(),
  sellPrice: z.string(),
  category: z.string(),
  platform: z.string(),
  inventory: z.string(),
})

export type myProduct = z.infer<typeof myProductsSchema>
