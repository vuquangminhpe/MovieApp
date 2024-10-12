import { arrow, offset, shift, useFloating, type Placement } from '@floating-ui/react-dom-interactions'
import React, { useRef, useState, useId } from 'react'
import { FloatingPortal } from '@floating-ui/react-dom-interactions'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  content?: string
  placement?: Placement
  authentication?: boolean
  onEvent?: keyof React.DOMAttributes<HTMLDivElement>
  leaveEvent?: keyof React.DOMAttributes<HTMLDivElement>
  show?: boolean
  renderPropsShow?: boolean
  fullWidth?: boolean
}

export default function Popover({
  children,
  className,
  renderPopover,
  content,
  placement,
  authentication = true,
  onEvent = `onMouseEnter`,
  leaveEvent = `onMouseLeave`,
  show = false,
  fullWidth = false
}: Props) {
  const arrowRef = useRef<HTMLElement>(null)
  const id = useId()
  const [open, setOpen] = useState(false)
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [
      offset(6),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    placement: placement
  })

  const showPopover = () => setOpen(true)
  const hidePopover = () => setOpen(false)

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      <div
        content={content}
        className={className}
        ref={reference}
        {...{ [onEvent]: showPopover, [leaveEvent]: hidePopover }}
      >
        {children}
        <FloatingPortal id={id}>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                ref={floating}
                className={`${fullWidth ? 'w-full' : 'w-max'} bg-white shadow-lg rounded-md z-[60]`}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  transformOrigin: `${middlewareData.arrow?.x}px top`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                {authentication && (
                  <div className='relative w-full'>
                    {show && (
                      <span
                        ref={arrowRef}
                        className=' absolute w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-white -translate-y-full'
                        style={{
                          left: middlewareData.arrow?.x,
                          top: middlewareData.arrow?.y
                        }}
                      />
                    )}
                    <div className={`${fullWidth ? 'w-full' : ''}`}>{renderPopover}</div>
                  </div>
                )}
                {!authentication && <div className='w-full'>{renderPopover}</div>}
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </div>
    </div>
  )
}
