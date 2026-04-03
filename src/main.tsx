import './index.css'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import { router } from './app/router.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
<Provider store={store}>
     <RouterProvider router={router}/>
</Provider>
)
