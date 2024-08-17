import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Calculator from './Calculator'

const App = () => {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calculator />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
