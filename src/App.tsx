import useRouteElement from './useRouteElement'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ThemeProvider } from './Components/ModeToggle/ThemeProvider/theme-provider'

function App() {
  const useRouterElement = useRouteElement()

  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      {useRouterElement}
    </ThemeProvider>
  )
}

export default App
