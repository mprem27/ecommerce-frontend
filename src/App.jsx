
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import header from './Components/Header'
import Header from './Components/Header';
import Footer from './Components/Footer'
import Home from './pages/Home'
import Collections from './pages/Collections'
import Product from './pages/Product'
import About from './pages/About'
import Contact from './pages/Contact'
import Todaysdeals from './pages/Todaysdeals'
import NewsLetter from './Components/NewsLetter';



function App() {
  return (
    <>
      <Header />
      
      <div className='px-4 bg-[#e0f2fe]  sm:px-[5vh] md:-[7vh] lg:-[9vh]'>
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/Collections' element={<Collections />} />
          <Route path='/Product/:Productid' element={<Product />} />
          <Route path='/Todaysdeals' element={<Todaysdeals />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
        </Routes>
      </div>
      <NewsLetter />
      <Footer />
    </>
  )
}

export default App;
