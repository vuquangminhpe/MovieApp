import { useState, useEffect } from 'react'

const Skeleton = () => {
  const [currentAnimation, setCurrentAnimation] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnimation((prev) => (prev + 1) % 5)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className='flex items-center justify-center h-screen bg-gray-900'>
      <div className='relative w-40 h-40'>
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${currentAnimation === 0 ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className='relative w-32 h-24 bg-black mx-auto'>
            <div className='absolute top-0 left-0 w-full h-8 bg-gray-200 origin-left animate-clap'>
              <div className='w-full h-full grid grid-cols-4'>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className='border-r-2 border-black' />
                ))}
              </div>
            </div>
            <div className='absolute bottom-2 left-2 text-white text-xs'>SCENE: 01 TAKE: 01</div>
          </div>
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-500 ${currentAnimation === 1 ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className='relative w-full h-full'>
            <div className='absolute inset-0 animate-spotlight'>
              <div className='w-full h-full bg-gradient-to-r from-transparent via-yellow-200/20 to-transparent' />
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-500 ${currentAnimation === 2 ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className='w-32 h-16 bg-white mx-auto rounded-lg shadow-xl animate-ticket'>
            <div className='w-full h-full p-2 flex flex-col justify-between'>
              <div className='w-full h-2 bg-red-500' />
              <div className='w-full h-2 bg-red-500' />
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-500 ${currentAnimation === 3 ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className='flex justify-center space-x-2'>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`text-3xl text-yellow-400 animate-star`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                ★
              </div>
            ))}
          </div>
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-500 ${currentAnimation === 4 ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className='relative w-32 h-32 mx-auto'>
            <div className='absolute inset-0 border-8 border-gray-300 rounded-full'>
              <div className='absolute inset-2 animate-shutter'>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className='absolute w-full h-full origin-center'
                    style={{
                      transform: `rotate(${i * 60}deg)`,
                      clipPath: 'polygon(50% 50%, 45% 0%, 55% 0%)',
                      background: '#FB6E93'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='absolute -bottom-8 left-0 right-0 text-center font-bold' style={{ color: '#FB6E93' }}>
          <div className='flex items-center justify-center h-screen'>
            <div className='text-2xl font-bold' style={{ color: '#FB6E93' }}>
              Waiting
              <span className='inline-block animate-bounce1 ml-[2px]'>.</span>
              <span className='inline-block animate-bounce2 ml-[2px]'>.</span>
              <span className='inline-block animate-bounce3 ml-[2px]'>.</span>
              <style>{`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-6px);
            }
          }
          
          .animate-bounce1 {
            animation: bounce 1s ease-in-out infinite;
          }
          
          .animate-bounce2 {
            animation: bounce 1s ease-in-out infinite;
            animation-delay: 0.2s;
          }
          
          .animate-bounce3 {
            animation: bounce 1s ease-in-out infinite;
            animation-delay: 0.4s;
          }
        `}</style>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes clap {
            0%, 100% { transform: rotate(0deg); }
            10%, 90% { transform: rotate(-30deg); }
          }

          @keyframes spotlight {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
          }

          @keyframes ticket {
            0% { transform: perspective(1000px) rotateY(0deg); }
            100% { transform: perspective(1000px) rotateY(360deg); }
          }

          @keyframes star {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.5); opacity: 1; }
          }

          @keyframes shutter {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .animate-clap {
            animation: clap 2s ease-in-out infinite;
          }

          .animate-spotlight {
            animation: spotlight 3s linear infinite;
          }

          .animate-ticket {
            animation: ticket 3s linear infinite;
          }

          .animate-star {
            animation: star 1s ease-in-out infinite;
          }

          .animate-shutter {
            animation: shutter 3s linear infinite;
          }
        `}</style>
      </div>
    </div>
  )
}

export default Skeleton
