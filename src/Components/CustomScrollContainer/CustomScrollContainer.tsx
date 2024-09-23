import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

interface CustomScrollbarProps {
  children: React.ReactNode
  height?: string | number
  width?: string | number
}

const CustomScrollContainer = ({ children, height = 400, width = '100%' }: CustomScrollbarProps) => {
  const renderThumb = ({ style, ...props }: React.HTMLProps<HTMLDivElement>) => {
    const thumbStyle: React.CSSProperties = {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '4px',
      cursor: 'pointer'
    }
    return <div style={{ ...style, ...thumbStyle }} {...props} />
  }

  const renderTrackVertical = ({ style, ...props }: React.HTMLProps<HTMLDivElement>) => {
    const trackStyle: React.CSSProperties = {
      position: 'absolute',
      width: '8px',
      right: '2px',
      bottom: '2px',
      top: '2px',
      borderRadius: '4px',
      background: 'rgba(255, 255, 255, 0.3)'
    }
    return <div style={{ ...style, ...trackStyle }} {...props} />
  }

  return (
    <div
      style={{
        position: 'relative',
        height,
        width,
        borderRadius: '4px'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '30%',
          height: '100%',
          background:
            'linear-gradient(to left, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <Scrollbars
        renderThumbVertical={renderThumb}
        renderTrackVertical={renderTrackVertical}
        autoHide={false}
        style={{ width, height }}
      >
        {children}
      </Scrollbars>
    </div>
  )
}

export default CustomScrollContainer
