import { AppContextProvider } from 'contexts/AppContext'
import Router from 'pages/Router'

function App() {
  return (
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  )
}

export default App
