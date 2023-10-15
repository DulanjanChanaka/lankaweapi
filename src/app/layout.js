'use client'
import './globals.css'
import { AuthContextProvider} from '../context/AuthContext'
import Navbar from '../components/Navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthContextProvider>
        <Navbar/>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}

