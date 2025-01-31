import { Header } from "@/components/Header";
import { SideMenu } from "@/components/SideMenu";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const revalidate = 1;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-background-light h-screen p-[40px] max-lg:p-0 max-lg:bg-white">
        <Header />
        <div className="flex gap-[40px] justify-between h-auto mb-[40px]">
          <div className="bg-white rounded-[10px] py-[20px] px-[40px] flex-auto w-[1200px]">
            {children}
          </div>
          <SideMenu />
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}
