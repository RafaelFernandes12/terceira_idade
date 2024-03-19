import "../globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="pt-br">
      <body className="bg-background-light p-[40px] h-screen">
        <div className="flex gap-[40px] justify-between h-full">
          <div className="bg-white rounded-[10px] py-[20px] px-[40px] flex-auto max-w-auto">
            {children}
          </div>
          <div className="bg-white rounded-[10px] py-[20px] px-[40px] flex-auto max-w-[360px]">
            <p>CPSI Web</p>
            <p>Aqui vai o componente do menu lateral</p>
          </div>
        </div>
      </body>
    </html>
  );
}