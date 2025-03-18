import React from 'react'
import { useFetchOrdersQuery } from '../store'

const Order = () => {
    const {data, error, isFetching} = useFetchOrdersQuery();
    console.log(data);
  return (
    <div className='border-t pt-14 mx-20'>
      <div className='text-3xl px-5'>
        <h1 className=''> My Orders </h1>
      </div>


      {/* --------------------------- Cart Section --------------------------- */}
      <div className='flex justify-end my-20 mx-5'>
        <div className='w-full sm:w-[450px]'>
        </div>
      </div>
    </div>
  )
}

export default Order