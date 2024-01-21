import type { Metadata } from "next";
import { inter, cairo } from "@/components/ui/fonts";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import ToastProvider from "@/components/toast-provider";
import StoreProvider from "@/store/providers";

export const metadata: Metadata = {
  generator: "Next.js",
  applicationName: "Auto Drop",
  title: "Auto Drop",
  description:
    "A website established in 2023 in order to facilitate and streamline the e-commerce process for merchants",
  keywords:
    "Auto Drop, Auto, Drop, E-commerce, Dropshipping, E-commerce platform, E-commerce website, E-commerce platform for merchants, E-commerce website for merchants, E-commerce platform for sellers, E-commerce website for sellers, E-commerce platform for buyers, E-commerce website for buyers, E-commerce platform for customers, E-commerce website for customers, E-commerce platform for consumers, E-commerce website for consumers, E-commerce platform for vendors, E-commerce website for vendors, E-commerce platform for suppliers, E-commerce website for suppliers, E-commerce platform for retailers, E-commerce website for retailers, E-commerce platform for wholesalers, E-commerce website for wholesalers, E-commerce platform for manufacturers, E-commerce website for manufacturers, E-commerce platform for producers, E-commerce website for producers, E-commerce platform for distributors, E-commerce website for distributors, E-commerce platform for dropshippers, E-commerce website for dropshippers",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  icons: {
    icon: "/autodrop.svg",
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
  },
  category: "E-commerce",
  openGraph: {
    title: "Auto Drop",
    description:
      "A website established in 2023 in order to facilitate and streamline the e-commerce process for merchants",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    siteName: "Auto Drop",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/autodrop.svg`,
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: any;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body
        className={cn(
          `antialiased`,
          locale === "en" ? inter.className : cairo.className
        )}
      >
        <StoreProvider>
          <ToastProvider />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
