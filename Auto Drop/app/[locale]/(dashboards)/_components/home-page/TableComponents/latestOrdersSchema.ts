import { z } from "zod";

export const latestOrdersSchema = z.object({
  CustomerName: z.string(),
  orderStatus: z.string(),
  date: z.string(),
  amount: z.string(),
  details: z.string(),
});

export type latestOrder = z.infer<typeof latestOrdersSchema>;
