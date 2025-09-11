import React from 'react'
import LatestCollections from '../Components/LatestCollections'
import BestSellers from '../Components/BestSellers'
import Policy from '../Components/Policy'
import Hero from '../Components/Hero'

const Home = () => {
    return (
        <div >
            <Hero/>
           <LatestCollections/>
           <BestSellers/>
           <Policy/> 
        </div>
    )
}

export default Home