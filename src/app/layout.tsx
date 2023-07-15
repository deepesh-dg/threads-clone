import StateProvider from "@/state/StateProvider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Threads - By Hitesh Choudhary",
    description: "Threads - By Hitesh Choudhary",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <StateProvider>
                    {/* <Header /> */}
                    <main id="main" className="py-2">
                        {children}
                    </main>
                    {/* <Footer /> */}
                </StateProvider>
            </body>
        </html>
    );
}
