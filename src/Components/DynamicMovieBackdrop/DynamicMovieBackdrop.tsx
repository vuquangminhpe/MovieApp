import React, { useState, useEffect, useRef } from 'react'
import ColorThief from 'colorthief'

interface DynamicMovieBackdropProps {
  children: React.ReactNode
  imageUrl: string
}

type RGBColor = [number, number, number]

const DynamicMovieBackdrop: React.FC<DynamicMovieBackdropProps> = ({ children, imageUrl }) => {
  const [palette, setPalette] = useState<RGBColor[]>([])
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = imageUrl

    img.onload = () => {
      const colorThief = new ColorThief()
      try {
        const colors = colorThief.getPalette(img, 5) as RGBColor[] // Get a palette of 5 colors
        setPalette(colors)
      } catch (error) {
        console.error('Error extracting color:', error)
        setPalette([])
      }
    }
  }, [imageUrl])

  const generateOverlay = (colors: RGBColor[]): string => {
    if (!colors || colors.length === 0) return 'bg-gray-900/70'

    // Use the first two colors in the palette
    const [r1, g1, b1] = colors[0]
    const [r2, g2, b2] = colors[1]

    return `bg-gradient-to-t from-[rgba(${r1},${g1},${b1},0.7)] via-[rgba(${r2},${g2},${b2},0.5)] to-[rgba(${r1},${g1},${b1},0.3)]`
  }

  return (
    <div className='relative w-full h-full overflow-hidden flex items-center'>
      <img ref={imgRef} src={imageUrl} alt='' className='absolute w-full h-full object-cover object-top z-0' />
      <div className={`absolute inset-0 ${generateOverlay(palette)} mix-blend-multiply z-10`}></div>
      <div className='relative z-20 container'>{children}</div>
    </div>
  )
}

export default DynamicMovieBackdrop
