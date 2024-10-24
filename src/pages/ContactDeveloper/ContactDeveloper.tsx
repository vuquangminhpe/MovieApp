import { useState, useEffect } from 'react'
import MouseAnimate from '@/Components/Custom/MouseAnimate'
import icon_css from '../../Imgs/css.png'
import icon_js from '../../Imgs/js.png'
import icon_html from '../../Imgs/html.png'
import icon_react from '../../Imgs/react.png'
import icon_shadcn from '../../Imgs/shadcn.png'
import icon_tailwinds from '../../Imgs/tailwinds.jpg'
import icon_typescript from '../../Imgs/typescript.png'
import icon_profile1 from '../../Imgs/profile_1.jpg'
import icon_profile2 from '../../Imgs/profile_2.jpg'
import icon_profile3 from '../../Imgs/profile_3.jpg'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/Components/ui/carousel'
import SocialLinks from '@/Components/Custom/SocialLinks'

const All_ICONS = [
  { icon: icon_css },
  { icon: icon_html },
  { icon: icon_js },
  { icon: icon_react },
  { icon: icon_shadcn },
  { icon: icon_tailwinds },
  { icon: icon_typescript }
]

const All_Profiles = [{ icons: icon_profile2 }, { icons: icon_profile1 }, { icons: icon_profile3 }]
export default function ContactDeveloper() {
  const stringNames = `Hi, I'm Minh,a Web Developer`
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
      }, 800)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const textLines = displayedText.split(',').map((line) => line.trim())
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return (
    <div className='bg-slate-900'>
      <div className='w-full min-h-screen relative pt-24'>
        <MouseAnimate className='h-full' />
        <div className='container mx-auto px-6 lg:px-12'>
          <div className='flex justify-between max-lg:flex-col  lg:flex-row items-start lg:items-center lg:gap-16 max-w-7xl mx-auto'>
            <div className='w-full lg:w-2/3 pt-12 lg:pt-20'>
              <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white '>
                <div className='flex flex-col space-y-6 lg:space-y-8'>
                  {textLines.map((line, index) => (
                    <div key={index} className='flex flex-wrap z-[9999] cursor-pointer'>
                      {line.split('').map((item, letterIndex) => (
                        <div
                          key={letterIndex}
                          className={`
                            font-mono
                          hover:-translate-y-2 
                          hover:text-cyan-400 
                          transition-all 
                          ml-2 sm:ml-3 
                          ${item === 'M' ? 'text-red-700' : ''}
                          font-bold
                        `}
                        >
                          {item}
                        </div>
                      ))}
                      {index < textLines.length - 1 && ','}
                    </div>
                  ))}
                  <div className='flex gap-4 mb-5'>
                    <div className='px-4 capitalize border-b-[1px] border-red-950 text-white hover:bg-red-600/20 text-center text-xl transition-all inline-block max-w-[300px] cursor-pointer hover:rounded-sm hover:border-none items-center z-50 hover:text-red-600'>
                      front end developer
                    </div>
                    <div className='text-xl font-bold'>/</div>
                    <div className='px-4 capitalize border-b-[1px] border-[#561a5e] text-white hover:bg-[#c026d3]/20 text-center text-xl transition-all inline-block max-w-[300px] cursor-pointer hover:rounded-sm hover:border-none items-center z-50 hover:text-[#c026d3]'>
                      Learn in FPT Univesity
                    </div>
                  </div>
                  <SocialLinks />
                </div>
              </h1>
            </div>
            <div className='w-full lg:w-1/2 mt-12 lg:mt-0'>
              <div className='relative w-full max-w-md mx-auto lg:ml-16'>
                <img
                  src={All_ICONS[currentIconIndex].icon}
                  alt={`Icon ${currentIconIndex}`}
                  className={`
                  w-full h-auto 
                  rounded-xl 
                  object-contain
                  transition-all duration-500 ease-in-out
                  ${isVisible ? 'opacity-100' : 'opacity-0'}
                `}
                />
              </div>
            </div>
          </div>
          <div className='w-full flex mt-[200px] justify-between max-md:justify-center max-md:flex-col'>
            <div className='text-white text-xl font-mono max-w-[700px] max-md:mb-12'>
              Xin chào, tôi là Vũ Quang Minh - một người đam mê công việc lập trình và không ngừng khám phá vẻ đẹp của
              ngôn ngữ mã. Tôi tin rằng lập trình không chỉ là một kỹ năng mà còn là một cách tiếp cận sáng tạo để giải
              quyết các vấn đề. Bên cạnh đó, tôi cũng rất thích thú với hai hoạt động thể thao: đá bóng và chơi game. Cả
              hai đều mang lại cho tôi niềm vui và cảm giác hứng khởi mỗi khi tham gia. Việc kết hợp giữa sự sáng tạo
              trong lập trình và sự đam mê với thể thao đã giúp tôi duy trì sự cân bằng và động lực trong cuộc sống hàng
              ngày.
            </div>
            <Carousel className='max-w-[400px] max-md:max-w-[80%] max-md:translate-x-8 h-[450px]'>
              <CarouselContent>
                {All_Profiles.map((item: { icons: string }) => (
                  <CarouselItem>
                    <img src={`${item.icons}`} alt='' className='w-full h-[65%] rounded-xl shadow-sm object-cover ' />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}
