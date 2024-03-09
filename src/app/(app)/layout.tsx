import { Header } from '@/components/Header'
import '../globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="pt-br" className='dark'>
      {/* <head>
        <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet"></link>
      </head> */}
      <body>
        <Header />
        <div className='mx-80'>
            {children}
        </div>
      </body>
    </html>
  )
}