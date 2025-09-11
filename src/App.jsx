
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header';
import Footer from './Components/Footer'
import Home from './pages/Home'
import Collections from './pages/Collections'
import Product from './pages/Product'
import About from './pages/About'
import Contact from './pages/Contact'
import Todaysdeals from './pages/Todaysdeals'
import NewsLetter from './Components/NewsLetter';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify'



function App() {
 
  return (
    <>
      <ToastContainer/>
      <Header />
      
      <div className='px-4 py-20 bg-[#e0f2fe] sm:px-[5vh] md:-[7vh] lg:-[9vh]'>
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/Collections' element={<Collections />} />
          <Route path='/Product/:Productid' element={<Product />} />
          <Route path='/Todaysdeals' element={<Todaysdeals />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />

        </Routes>
      </div>
      <NewsLetter />
      <Footer />
    </>
  )
}

export default App;
