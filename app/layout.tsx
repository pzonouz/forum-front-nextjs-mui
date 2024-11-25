import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import "./globals.css";
import theme from "./theme";
import { SessionProvider } from "next-auth/react";
import { ResponsiveAppBar } from "./components/Navigation/AppBar";
import { IranXSans } from "./font";
import { CacheProviderWrapper } from "./components/Shared/CacheProvider";

export const metadata: Metadata = {
  title: "انجمن تخصصی برق خودرو",
  description:
    "برق خودرو-تست موتور-دیاگ- تعمیرات ایسیوECU-عیب یابی برق خودرو- دانلود نقشه و فایل ریمپ تیونینگ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl" style={{ margin: 0, padding: 0 }}>
      <body className={IranXSans.className} style={{ margin: 0, padding: 0 }}>
        <AppRouterCacheProvider>
          <SessionProvider>
            <CacheProviderWrapper>
              <ThemeProvider theme={theme}>
                <ResponsiveAppBar />
                {children}
              </ThemeProvider>
            </CacheProviderWrapper>
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
