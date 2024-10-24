import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import './SocialLinks.css'

const SocialLinks = () => {
  const socialMedias = [
    {
      icon: <FaFacebook />,
      hoverBg: '#3b5999',
      link: 'https://www.facebook.com/profile.php?id=61566028065722'
    },
    {
      icon: <FaTwitter />,
      hoverBg: '#55acee',
      link: 'https://twitter.com'
    },
    {
      icon: <FaInstagram />,
      hoverBg: '#e4405f',
      link: 'https://instagram.com'
    },
    {
      icon: <FaLinkedin />,
      hoverBg: '#0077b5',
      link: 'https://linkedin.com'
    }
  ]

  return (
    <div>
      <ul>
        {socialMedias.map((media, index) => (
          <li key={index}>
            <a href={media.link} target='_blank' rel='noopener noreferrer'>
              {[...Array(4)].map((_, idx) => (
                <span key={idx}></span>
              ))}
              <span className='social-icon'>{media.icon}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SocialLinks
