/* eslint-disable @typescript-eslint/no-explicit-any */
import VisibilitySensor from 'react-visibility-sensor'

function TestScrollLayzy() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (isVisible: any) => {
    console.log('Element is now ', isVisible ? 'visible' : 'hidden')
  }

  return (
    <VisibilitySensor onChange={onChange}>
      {({ isVisible }: any) => (
        <div
          className='h-[600px] bg-red-500 mt-[400px]'
          style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s' }}
        >
          {isVisible ? 'Phần tử này đã hiển thị!' : 'Phần tử này đang ẩn.'}
        </div>
      )}
    </VisibilitySensor>
  )
}

export default TestScrollLayzy
