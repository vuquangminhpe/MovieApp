import { useState, useEffect } from 'react'
import MouseAnimate from '@/Components/Custom/MouseAnimate'
import icon_css from '../../Imgs/css.png'
import icon_js from '../../Imgs/js.png'
import icon_html from '../../Imgs/html.png'
import icon_react from '../../Imgs/react.png'
import icon_shadcn from '../../Imgs/shadcn.png'
import icon_tailwinds from '../../Imgs/tailwinds.jpg'
import icon_typescript from '../../Imgs/typescript.png'
const All_ICONS = [
  { icon: icon_css },
  { icon: icon_html },
  { icon: icon_js },
  { icon: icon_react },
  { icon: icon_shadcn },
  { icon: icon_tailwinds },
  { icon: icon_typescript }
]
export default function ContactDeveloper() {
  const stringNames = `Hi, I am Minh, a Web Developer`
  const [displayedText, setDisplayedText] = useState('')
  const [currentIconIndex, setCurrentIconIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let currentIndex = 0

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + stringNames[currentIndex])
      currentIndex += 1

      if (currentIndex >= stringNames.length) {
        clearInterval(interval)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [stringNames])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentIconIndex((prevIndex) => (prevIndex === All_ICONS.length - 1 ? 0 : prevIndex + 1))
        setIsVisible(true)
      }, 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const textLines = displayedText.split(',').map((line) => line.trim())

  return (
    <div className='bg-[#0F172A]'>
      <div className='w-full h-[800px] object-cover relative z-10'>
        <MouseAnimate className='h-full' />
      </div>
      <div className='flex'>
        <h1 className='text-[100px] text-white translate-x-[170px] font-bold relative font-mono z-[9999] cursor-pointer flex -translate-y-[600px] text-wrap w-[900px]'>
          <div className='flex flex-col space-y-2'>
            {textLines.map((line, index) => (
              <div key={index} className='flex'>
                {line.split('').map((item: string) => (
                  <div
                    className={`hover:-translate-y-2 hover:text-[#22d3ee] transition-all ml-3 ${item === 'M' ? 'text-red-700' : ''} font-bold text-white`}
                  >
                    {item}
                  </div>
                ))}
                {index < textLines.length - 1 && ','}
              </div>
            ))}
          </div>
        </h1>
        <div className='absolute right-0 top-[40%] -translate-x-[300px] w-[400px] h-[400px]  flex justify-center items-center'>
          <img
            src={All_ICONS[currentIconIndex].icon}
            alt={`Icon ${currentIconIndex}`}
            className={`w-full rounded-xl h-full transition-all duration-500 ease-in-out
            ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>
    </div>
  )
}
