import './App.css'
import {useRoutes} from 'hookrouter';
import Routes from './Routes'

function App () {
    const routeResult = useRoutes(Routes)
    return routeResult
}

export default App;
