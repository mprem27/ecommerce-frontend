import React, { useState, useEffect } from 'react'
import { Products } from '../assets/Assets';

const Collections = () => {
  const [showfilter, setShowFilter] = useState(false);
  const [filterproducts, setFilterProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categogy, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const applyFilter = () => {
    let ProductsDupe = Products.slice()
    if (categogy.length > 0) {
      ProductsDupe = ProductsDupe.filter((item) => categogy.includes(item.category))
    }
    if (subcategory.length > 0) {
      ProductsDupe = ProductsDupe.filter((item) => subcategory.includes(item.subcategory))
    }
    setFilterProducts(ProductsDupe)
  }
  useEffect(() => {
    setLoading(true);
    applyFilter();
    setLoading(false);
    console.log(filterproducts)
  }, [categogy, subcategory, Products])

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
        setFilterProducts(ProductsDupe.sort((a, b) =>
          parseInt(a.price.replace(/[^0-9]/g, "")) - parseInt(b.price.replace(/[^0-9]/g, ""))
        ))

        break;
      case "high-low":
        setFilterProducts(ProductsDupe.sort((a, b) =>
          parseInt(b.price.replace(/[^0-9]/g, "")) - parseInt(a.price.replace(/[^0-9]/g, ""))
        ))

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
        </div>
      </div>
       
       
    </div>
  )
}

export
  default Collections;

