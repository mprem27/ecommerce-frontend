import React,{useState, useEffect} from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useContext } from 'react'
import { ShopContext } from '../../contexts/ShopContexts'
import { Assets } from '../assets/Assets'

const LatestCollections = () => {
  const {products} = useContext(ShopContext)
  const [latestProducts,setLatestProducts] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    if(products && products.length > 0){
      setLoading(true);
      setLatestProducts(products.slice(0,10));
      setLoading(false);
    }

  },[products])
  return (
    <div className='my-2'>
      <div className='text-center py-8 text-3xl'>
        <Title SubHeading={"Collections"} mainTitle={"New"} />
        <img src={Assets.collectionsimage} alt="New collections image" className='w-full py-2 hover:p-3 transition-all ease-in-out duration-400 '/>
        <p className='w-3/4 m-auto text-xs sm:tex-sm md:text-base text-gary-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis obcaecati temporibus corporis adipisci tempora voluptatum expedita rerum aperiam molestiae, quod hic voluptatem quas a iste id perferendis aliquam repudiandae vlite cumque.</p>
      </div>
        <div className='grid grid-cols-1 place-items-center sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            loading ?
            <p className='text-center col-span-full text-gary-600'>Loading...</p>
            : 
            latestProducts.length === 0?
            <p className='text-center col-span-full text-gary-600'>No Products Found</p>
            : 
            latestProducts.map((item,index) =>
              <ProductCard key={item._id || index} id={item._id} name={item.name} price={item.price} image={item.image}/>
          )
          }
        </div>
    </div>
  )
}

export default LatestCollections