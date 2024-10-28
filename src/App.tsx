import useRouteElement from './useRouteElement'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ThemeProvider } from './Components/ModeToggle/ThemeProvider/theme-provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LanguageProvider } from './Contexts/app.context'
import { HelmetProvider } from 'react-helmet-async'

function App() {
  const useRouterElement = useRouteElement()

  return (
    <HelmetProvider>
      <LanguageProvider>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          {useRouterElement}
          <ToastContainer />
        </ThemeProvider>
      </LanguageProvider>
    </HelmetProvider>
  )
}

export default App
