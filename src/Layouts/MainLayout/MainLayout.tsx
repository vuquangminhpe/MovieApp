import React from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'

interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
