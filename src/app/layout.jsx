import Navbar from './components/Navbar'
import './globals.css'

export const metadata = {
  title: 'My Bookstore',
  description: 'Homework Week 14 - My Bookstore'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-bodyColor w-full h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
