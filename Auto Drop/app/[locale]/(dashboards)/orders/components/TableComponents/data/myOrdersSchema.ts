import { z } from "zod"

export const myOrderSchema = z.object({
  id: z.string(),
  sender: z.string(),
  orderStatus: z.any(),
  date: z.string(),
  orderNumber: z.number(),
  orderSource: z.number(),
  amount: z.number(),
})

export type myOrder = z.infer<typeof myOrderSchema>
