import { Inter, Cairo, Poppins } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  fallback: ["Arial", "sans-serif"],
});
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  fallback: ["Arial", "sans-serif"],
});
export const cairo = Cairo({
  subsets: ["arabic"],
  fallback: ["Arial", "sans-serif"],
});
