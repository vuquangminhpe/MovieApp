import React from 'react'
import Header from '../../Components/pages/Header'
import Footer from '../../Components/pages/Footer'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow '>{children}</main>
      <Footer />
    </div>
  )
}
