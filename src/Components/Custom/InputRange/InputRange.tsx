import { useState } from 'react'

interface Props {
  valueScore?: number
  nameScore: string
  typeScore?: number
  min?: number
  max?: number
  onChange?: (value: number) => void
}

export default function InputRange({ valueScore = 10, nameScore, min = 0, max = 100, typeScore = 1, onChange }: Props) {
  const [value, setValue] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    setValue(newValue)
    onChange?.(newValue)
  }

  const getTrackBackground = () => {
    const percentage = ((value - min) / (max - min)) * 100
    return `${percentage}%`
  }

  const marks = Array.from({ length: 11 }, (_, i) => ({
    value: (max / valueScore) * i,
    label: i * typeScore
  }))
  console.log(value)

  return (
    <div className='relative pt-3 mt-7 pb-2'>
      <div className='mb-4'>{nameScore}</div>
      <div className='relative'>
        <div className='h-1 w-full bg-gray-200 rounded absolute top-1/2 -translate-y-1/2' />

        <div
          className='h-1 bg-blue-500 rounded absolute top-1/2 -translate-y-1/2'
          style={{ width: getTrackBackground() }}
        />

        <div className='relative'>
          {marks.map((mark, index) => (
            <div
              key={index}
              className='absolute top-1/2 -translate-y-1/2 w-0.5 h-2.5 bg-gray-300'
              style={{
                left: `${(mark.value / max) * 100}%`,
                transform: 'translateX(-50%) translateY(-50%)'
              }}
            />
          ))}
        </div>

        <input
          type='range'
          min={min}
          step={10}
          max={max}
          value={value}
          onChange={handleChange}
          className='w-full absolute top-1/2 -translate-y-1/2 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:border-blue-600'
        />
      </div>

      <div className='relative mt-2'>
        {marks.map((mark, index) => (
          <div
            key={index}
            className='absolute text-xs text-gray-500'
            style={{
              left: `${(mark.value / max) * 100}%`,
              transform: 'translateX(-50%)'
            }}
          >
            {mark.label}
          </div>
        ))}
      </div>
    </div>
  )
}
