import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductsList from 'pages/ProductsList'
import { routes } from 'utils/urlRoutes'
import Users from 'pages/Users'
import Diagrams from 'pages/Diagrams'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProductsList />} />
        <Route exact path={routes.products.path} element={<ProductsList />} />
        <Route exact path={routes.users.path} element={<Users />} />
        <Route exact path={routes.diagrams.path} element={<Diagrams />} />
      </Routes>
    </Router>
  )
}

export default App
