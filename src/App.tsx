import useRouteElement from './useRouteElement'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ThemeProvider } from './Components/ModeToggle/ThemeProvider/theme-provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LanguageProvider } from './Contexts/app.context'
function App() {
  const useRouterElement = useRouteElement()

  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        {useRouterElement}
        <ToastContainer />
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
