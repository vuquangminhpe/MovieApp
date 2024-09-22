import useRouteElement from './useRouteElement'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function App() {
  const useRouterElement = useRouteElement()
  return <div>{useRouterElement}</div>
}

export default App
