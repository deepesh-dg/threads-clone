import StateProvider from "@/state/StateProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import { Container, Header } from "@/components";

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
                    <Container>
                        <div className="flex flex-wrap min-h-screen -mx-2">
                            <div className="fixed md:relative inset-x-0 md:inset-auto bottom-0 w-full md:w-1/3 lg:w-1/4 px-2 border-r border-primary/10 z-50">
                                <Header />
                            </div>
                            <div className="w-full md:w-2/3 lg:w-3/4 px-2">
                                <main id="main" className="flex flex-wrap justify-center pb-[68px] md:pb-0 my-2">
                                    {children}
                                </main>
                            </div>
                        </div>
                    </Container>
                    {/* <Footer /> */}
                </StateProvider>
            </body>
        </html>
    );
}
