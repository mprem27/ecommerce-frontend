import React,{useState, useEffect} from 'react'
import {Assets } from '../assets/Assets'
import Title from '../Components/Title'
import { useContext } from 'react'
import { ShopContext } from '../../contexts/ShopContexts'
import ProductCard from '../Components/ProductCard'


const Todaysdeals = () => {
    const {products} = useContext(ShopContext)
 const [todaysProducts, setTodaysProducts] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    if(products.length > 0){
      setLoading(true);
      const todaysDeals = products.filter((item)=> (item.todaysDeals))
      setTodaysProducts(todaysDeals.slice(0,10));
      setLoading(false);
    }

  },[products])
  return (
    <div className='py-1 pb-5'>
      <div className='text-center border-t py-8 text-3xl'>
        <Title SubHeading={"Deals"} mainTitle={"Today's"} />
        <p className='w-3/4 m-auto text-xs sm:tex-sm md:text-base text-gary-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis obcaecati temporibus corporis adipisci tempora voluptatum expedita rerum aperiam molestiae, quod hic voluptatem quas a iste id perferendis aliquam repudiandae vlite cumque.</p>
      </div>
        <div className='grid grid-cols-1 place-items-center sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            loading ?
            <p className='text-center col-span-full text-gary-600'>Loading...</p>
            : 
            todaysProducts.length === 0?
            <p className='text-center col-span-full text-gary-600'>No Products Found</p>
            : 
            todaysProducts.map((item,index) =>
              <ProductCard key={item._id || index} id={item._id} name={item.name} price={item.price} image={item.images} />
          )
          }
        </div>
    </div>
  )
}

export default Todaysdeals;