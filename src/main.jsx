import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
    
        <App />
    
    </NextUIProvider>
  </StrictMode>,
)
