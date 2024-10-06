import useRouteElement from './useRouteElement'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ThemeProvider } from './Components/ModeToggle/ThemeProvider/theme-provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const useRouterElement = useRouteElement()

  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      {useRouterElement}
      <ToastContainer />
    </ThemeProvider>
  )
}

export default App
