import React, { useRef, useEffect, useState, useCallback } from 'react'

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  color: string
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FDCB6E', '#6C5CE7', '#55E6C1']
const NUM_POINTS = 50
const MAX_DISTANCE = 150

const MouseAnimate: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [points, setPoints] = useState<Point[]>([])
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  const initializePoints = useCallback((width: number, height: number) => {
    return Array.from({ length: NUM_POINTS }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }))
  }, [])

  const updatePoints = useCallback((width: number, height: number, currentPoints: Point[]) => {
    return currentPoints.map((point) => {
      const newX = point.x + point.vx
      const newY = point.y + point.vy

      if (newX < 0 || newX > width) point.vx *= -1
      if (newY < 0 || newY > height) point.vy *= -1

      return {
        ...point,
        x: Math.max(0, Math.min(newX, width)),
        y: Math.max(0, Math.min(newY, height))
      }
    })
  }, [])

  const drawCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, currentPoints: Point[]) => {
      ctx.clearRect(0, 0, width, height)

      currentPoints.forEach((point, i) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = point.color
        ctx.fill()

        for (let j = i + 1; j < currentPoints.length; j++) {
          const otherPoint = currentPoints[j]
          const dx = point.x - otherPoint.x
          const dy = point.y - otherPoint.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < MAX_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(otherPoint.x, otherPoint.y)
            ctx.strokeStyle = `rgba(${parseInt(point.color.slice(1, 3), 16)}, ${parseInt(point.color.slice(3, 5), 16)}, ${parseInt(point.color.slice(5, 7), 16)}, ${1 - distance / MAX_DISTANCE})`
            ctx.stroke()
          }
        }
      })

      // Connect to mouse position
      currentPoints.forEach((point) => {
        const dx = point.x - mousePosRef.current.x
        const dy = point.y - mousePosRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < MAX_DISTANCE) {
          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(mousePosRef.current.x, mousePosRef.current.y)
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / MAX_DISTANCE})`
          ctx.stroke()
        }
      })
    },
    []
  )

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setPoints((prevPoints) => {
      const updatedPoints = updatePoints(canvas.width, canvas.height, prevPoints)
      drawCanvas(ctx, canvas.width, canvas.height, updatedPoints)
      return updatedPoints
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [updatePoints, drawCanvas])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setPoints(initializePoints(canvas.width, canvas.height))
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePosRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate, initializePoints])

  return <canvas ref={canvasRef} style={{ background: '#000033', position: 'fixed', top: 0, left: 0 }} />
}

export default MouseAnimate
