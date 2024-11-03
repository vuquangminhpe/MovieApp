import React from 'react'
import Header from '../../Components/pages/Header'
import Footer from '../../Components/pages/Footer'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='z-50'>
        <Header />
      </div>
      <main className='flex-grow z-10'>{children}</main>
      <Footer />
    </div>
  )
}
