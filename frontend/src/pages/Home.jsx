import React from 'react'
import { useFetchProductsQuery } from '../store'

const Home = () => {

  const {data, error, isLoading} = useFetchProductsQuery();
  console.log(data);
  return (
    <div>Home</div>
  )
}

export default Home