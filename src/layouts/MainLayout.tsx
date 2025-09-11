import type { ReactNode } from "react";
import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer";

function MainLayout({children} : {children: ReactNode}) {
  return (
    <div>
        <Header/>
        <main>
            {children}
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout