import React from 'react'
import { useFetchOrdersQuery } from '../store'

const Order = () => {
    const {data, error, isFetching} = useFetchOrdersQuery();
    console.log(data);
  return (
    <div>Order</div>
  )
}

export default Order