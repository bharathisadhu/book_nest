import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/services/AuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "BookNest",
  description: "Read for Peace",
  favicon: "/BookNest.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <AuthProvider>
          <div className="container mx-auto">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
