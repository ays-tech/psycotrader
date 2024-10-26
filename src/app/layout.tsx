import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { Root } from "@/components/Root/Root";
import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "./_assets/globals.css";
import GoogleAnalytics from './GoogleAnalytics';

export const metadata: Metadata = {
  title: "Psycho Trader",
  description: "Mind Map",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body>
      <GoogleAnalytics />

        <Root>{children}</Root>
    
      </body>
    </html>
  );
}
