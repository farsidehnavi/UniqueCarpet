import type { Metadata } from "next";
import './globals.css'
// import localFont from "next/font/local";

// export const myFont = localFont({
//   src: [
//     {
//       path: "./font.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./../public/secendry.ttf",
//       weight: "400",
//       style: "normal",
//     },
//   ],
// });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
