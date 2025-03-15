import React from 'react'
import { useFetchProductsQuery } from '../store/apis/productsApi';
import ProductListItem from './ProductListItem';

const LatestCollection = () => {
  // accessing data from our redux toolkit query
  const {data, error, isFetching} = useFetchProductsQuery();

  // content to show to user
  let content;
  if (isFetching) {
    content = "";
  } else if (error) {
    content = <div className=''> Error Loading Products... </div>
  } else {
    content = data.map((product) => {
      return <ProductListItem key={product._id} product = { product } />;
    });
  }
  return (
    <div className='flex justify-center items-center mx-5 sm:mx-10 md:mx-20 lg:mx-28'>
      <div className='grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        { content }
      </div>
    </div>
  )
}

export default LatestCollection;