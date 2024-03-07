"use client";
import { ThemeProvider } from "@/components/ui/theme-provider";

import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster"
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster/>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
