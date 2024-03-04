import { Header } from '@/components/Header'
import '../globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="pt-br" className='dark'>
      <body>
        <Header />
        <div className='mx-40'>
            {children}
        </div>
      </body>
    </html>
  )
}