import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { GLOBAL_CSS, ErrorBoundary } from './App.jsx'
import './index.css'

/* Inject the scoped stylesheet into <head> before React mounts.
   It used to live inside <App/>, which meant a render crash took the
   background and typography down with it — turning an error into a blank
   white page. Hoisting it here keeps the page on-brand even if something
   below throws. */
if (!document.getElementById('g28-global-css')) {
  const style = document.createElement('style')
  style.id = 'g28-global-css'
  style.textContent = GLOBAL_CSS
  document.head.appendChild(style)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
