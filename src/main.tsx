import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index.tsx'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
       <Provider store={store}>
        
      <RouterProvider router={router}></RouterProvider>
       <Toaster />
     
    </Provider>

   
  </StrictMode>,
)
