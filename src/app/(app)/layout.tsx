import "../globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="pt-br">
      <body className="bg-background-light h-screen p-[40px]">
        <div className="flex gap-[40px] justify-between h-auto mb-[40px]">
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