import React,{useState, useEffect} from 'react'
import { useContext } from 'react'
import { ShopContext } from '../../contexts/ShopContexts'
import { Assets } from '../assets/Assets'
import Title from './Title'
import ProductCard from './ProductCard'

const BestSellers = () => {
    const {products} = useContext(ShopContext)
    const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    if(products.length > 0){
      setLoading(true);
      const bestProducts = products.filter((item)=> (item.bestseller))
      setBestSellers(bestProducts.slice(0,25));
      setLoading(false);
    }

  },[products])
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title SubHeading={"BestSellers"} mainTitle={"GoBok"} />
        <img src={Assets.BestSellers} alt="New collections image" className='w-full h-100% py-2 hover:p-3 transition-all ease-in-out duration-400 '/>
        <p className='w-3/4 m-auto text-xs sm:tex-sm md:text-base text-gary-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis obcaecati temporibus corporis adipisci tempora voluptatum expedita rerum aperiam molestiae, quod hic voluptatem quas a iste id perferendis aliquam repudiandae vlite cumque.</p>
      </div>
        <div className='grid grid-cols-1 place-items-center sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            loading ?
            <p className='text-center col-span-full text-gary-600'>Loading...</p>
            : 
            bestSellers.length === 0?
            <p className='text-center col-span-full text-gary-600'>No Products Found</p>
            : 
            bestSellers.map((item,index) =>
              <ProductCard key={item._id || index} id={item._id} name={item.name} price={item.price} image={item.image}/>
          )
          }
        </div>
    </div>
  )
}

export default BestSellers