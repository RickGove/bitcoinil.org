import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { HashRouter as Router } from 'react-router-dom'

console.log('BASE_URL:', import.meta.env.BASE_URL || '/', {
  env: import.meta.env.BASE_URL,
  def: '/'
})

ReactDOM.render(
  <Router basename={import.meta.env.BASE_URL || '/'}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
)
