import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
    createBrowserRouter,
    createRoutesFromElements, Route, RouterProvider
} from "react-router-dom";
import { StyledEngineProvider } from '@mui/material/styles'
import './index.css'
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import Layout from "./layout/Layout.tsx";
import Companies from "./components/Companies/Companies.tsx";
import Applications from "./components/Applications/Applications.tsx";
import {GlobalStateProvider} from "./AppContext.tsx";
import {CustomThemeProvider} from "./ThemeContext.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/companies' element={<Companies/>}/>
            <Route path='/applications' element={<Applications/>}/>
        </Route>
    )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <StyledEngineProvider injectFirst>
          <CustomThemeProvider>
              <GlobalStateProvider>
                  <RouterProvider router={router}/>
              </GlobalStateProvider>
          </CustomThemeProvider>
      </StyledEngineProvider>
  </StrictMode>,
)
