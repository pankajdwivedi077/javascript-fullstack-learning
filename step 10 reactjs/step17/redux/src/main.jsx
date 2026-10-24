import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { fetchUsers } from './features/users/usersSlice.js'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { extendedApiSlice } from './features/post/postSlice.js'

store.dispatch(fetchUsers())
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate())

createRoot(document.getElementById('root')).render(

    <Provider store={store} >
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </Provider>  

)
