import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBooking from './pages/MyBooking'
import Favorite from './pages/Favorite'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'

function App() {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')

  return (
    <>
      <Toaster></Toaster>
      {!isAdminRoute && <Navbar></Navbar>}

      <Routes>
        <Route path='/' element={<Home></Home>}> </Route>

        <Route path='/movies' element={<Movies></Movies>}> </Route>

        <Route path='/movies/:id' element={<MovieDetails></MovieDetails>}></Route>
        <Route path='/movies/:id/:date' element={<SeatLayout></SeatLayout>}></Route>
        <Route path='/my-bookings' element={<MyBooking></MyBooking>}></Route>
        <Route path='/favourite' element={<Favorite></Favorite>}></Route>
        <Route path='/movies/:id/:date' element={<SeatLayout></SeatLayout>}></Route>

      </Routes>
      {!isAdminRoute && <Footer></Footer>}

    </>
  )
}

export default App
