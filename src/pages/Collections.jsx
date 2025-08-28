import React, { useState, useEffect } from 'react'
import { Products, Assets } from '../assets/Assets';
import Title from '../Components/Title';
import ProductCard from '../Components/ProductCard'

const Collections = () => {
  const [showfilter, setShowFilter] = useState(false);
  const [filterproducts, setFilterProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categogy, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');
  const [priceFilter, setPriceFilter] = useState(null);

  const applyFilter = () => {
    let ProductsDupe = Products.slice()
    if (categogy.length > 0) {
      ProductsDupe = ProductsDupe.filter((item) => categogy.includes(item.category))
    }
    if (subcategory.length > 0) {
      ProductsDupe = ProductsDupe.filter((item) => subcategory.includes(item.subcategory))
    }

    if (priceFilter) {
  ProductsDupe = ProductsDupe.filter((item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ""), 10);

    if (priceFilter === "below1000") return price < 1000;
    if (priceFilter === "1500") return price >= 1000 && price <= 1500;
    if (priceFilter === "2000") return price > 1500 && price <= 2000;
    if (priceFilter === "above3000") return price > 3000;

    return true;
  });

}
    setFilterProducts(ProductsDupe)
  }
  useEffect(() => {
    setLoading(true);
    applyFilter();
    setLoading(false);
    console.log(filterproducts)
  }, [categogy, subcategory,priceFilter, Products])

  const toggleCategory = (e) => {
    if (categogy.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item != e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item != e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }
  const sortProduct = () => {
    let ProductsDupe = filterproducts.slice()
    switch (sortType) {
      case "low-high": 
      setFilterProducts(ProductsDupe.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, "")) - parseInt(b.price.replace(/[^0-9]/g, "")) )) 
      break; 
      case "high-low":
         setFilterProducts(ProductsDupe.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, "")) - parseInt(a.price.replace(/[^0-9]/g, "")) )) 
         break;
case "below 1000":
      setFilterProducts(
        ProductsDupe.filter(
          (item) => parseInt(item.price.replace(/[^0-9]/g, "")) < 1000
        )
      );
      break;

    case "1500":
      setFilterProducts(
        ProductsDupe.filter(
          (item) => parseInt(item.price.replace(/[^0-9]/g, "")) >= 1500
        )
      );
      break;

    case "2000":
      setFilterProducts(
        ProductsDupe.filter(
          (item) => parseInt(item.price.replace(/[^0-9]/g, "")) >= 2000
        )
      );
      break;

    case "Above 3000":
      setFilterProducts(
        ProductsDupe.filter(
          (item) => parseInt(item.price.replace(/[^0-9]/g, "")) > 3000
        )
      );
      break;

      default:
        applyFilter();
        break;
    }
  }
  useEffect(() => {
    setLoading(true);
    sortProduct();
    setLoading(false)
  }, [sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-19 pt-10 border-t border-gray-300'>
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters</p>

        <div className={`w-50 border border-gray-400 pl-5 py-3 mt-6 ${showfilter ? "block" : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Categories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

            <p className='flex gap-2'> <input onClick={(e) => toggleCategory(e)} type="checkbox" value={'Men'} className='w-3' /> Men</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleCategory(e)} type="checkbox" value={'Women'} className='w-3' /> Women</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleCategory(e)} type="checkbox" value={'Kids'} className='w-3' /> Kids</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleCategory(e)} type="checkbox" value={'Electronics'} className='w-3' /> Electronics</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleCategory(e)} type="checkbox" value={'Beauty'} className='w-3' /> Beauty</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleCategory(e)} type="checkbox" value={'Home'} className='w-3' /> Home</p>
          </div>

          <p className='mt-3 mb-3 text-sm font-medium'>Sub Categories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'TopWear'} className='w-3' /> TopWear</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'BottomWear'} className='w-3' /> BottomWear</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'Accessories'} className='w-3' /> Accessories</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'EthnicWear'} className='w-3' /> EthnicWear</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'Outerwear'} className='w-3' /> Outerwear</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'Footwear'} className='w-3' /> Footwear</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'Dresses'} className='w-3' /> Dresses</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'Ethnic'} className='w-3' /> Ethnic</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'WinterWear'} className='w-3' /> WinterWear</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'Mobiles'} className='w-3' /> Mobiles</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'Laptops'} className='w-3' /> Laptops</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'Audio'} className='w-3' /> Audio</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'Wearables'} className='w-3' /> Wearables</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'TV'} className='w-3' /> TV</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'Headphones'} className='w-3' /> Headphones</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'Cameras'} className='w-3' /> Cameras</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'SmartHome'} className='w-3' /> SmartHome</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'Networking'} className='w-3' /> Networking</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'Storage'} className='w-3' /> Storage</p>
            <p className='flex gap-2'> <input onClick={(e) => toggleSubCategory(e)} type="checkbox" value={'Tablet'} className='w-3' /> Tablet</p>

          </div>

          <p className='mt-3 mb-3 text-sm font-medium'>Prices</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
            <p className='flex gap-2'><input type="checkbox" onChange={() => setPriceFilter("below1000")} value={'below 1000'} />Below 1000</p>
            <p className='flex gap-2'><input type="checkbox" onChange={() => setPriceFilter("1500")} value={"1500"} />1500</p>
            <p className='flex gap-2'><input type="checkbox" onChange={() => setPriceFilter("2000")} value={'2000'} />2000</p>
            <p className='flex gap-2'><input type="checkbox" onChange={() => setPriceFilter("above3000")} value={'above3000'} />Above 3000</p>


          </div>
        </div>
      </div>

      <div className='flex-row'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title SubHeading={"Collections"} mainTitle={"ALL"} />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-1 gap-30 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>

          {
            loading
              ? <p className='text-center col-span-full text-gray-600'>Loading...</p>
              : filterproducts.length === 0 ?
                <p className='text-center col-span-full text-gray-600'>No Products Found</p>
                :
                filterproducts.map((item, index) => <ProductCard key={item._id || index} id={item._id} name={item.name} price={item.price} image={item.images} />)
          }

        </div>
      </div>
    </div>
  )
}

export
  default Collections;

