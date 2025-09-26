import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import { RouterProvider } from 'react-router'
import CalendarPage from './components/Calander'
import AppLayout from './components/AppLayout'
import ProjectsPage from './components/Project/ProjectPage'
import ProjectDetailsPage from './components/Project/ProjectDetail'


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children:[
      {
      path:"/",
      element: <Dashboard/>
      }, 
    {
    path: "/calendar",
    element: <CalendarPage/>
    },
{
  path:"/projects",
  element: <ProjectsPage/>
}, 
{
  path: "/project/deatil/:id",
  element: <ProjectDetailsPage/>
}
    ]
  }
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
  </StrictMode>,
)
