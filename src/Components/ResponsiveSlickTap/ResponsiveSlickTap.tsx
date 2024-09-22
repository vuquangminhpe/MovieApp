/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Slider from 'react-slick'

function ResponsiveSlickTap() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    appendDots: (dots: any) => (
      <div style={{ position: 'relative', bottom: '10px' }}>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div className='overflow-x-auto slider-container'>
      <Slider {...settings}>
        <div>
          <img src='image1.jpg' alt='Slide 1' />
        </div>
        <div>
          <img src='image2.jpg' alt='Slide 2' />
        </div>
        <div>
          <img src='image3.jpg' alt='Slide 3' />
        </div>
        <div>
          <img src='image4.jpg' alt='Slide 4' />
        </div>
        <div>
          <img src='image5.jpg' alt='Slide 5' />
        </div>
        <div>
          <img src='image6.jpg' alt='Slide 6' />
        </div>
        <div>
          <img src='image7.jpg' alt='Slide 7' />
        </div>
        <div>
          <img src='image8.jpg' alt='Slide 8' />
        </div>
      </Slider>
    </div>
  )
}

export default ResponsiveSlickTap
