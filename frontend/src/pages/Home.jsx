import React from 'react'
import { useFetchOrdersQuery, useFetchProductsQuery } from '../store'
import LatestCollection from '../components/LatestCollection';
import Slider from '../components/SliderSection';

const Home = () => {
  // const {data, error, isFetching} = useFetchOrdersQuery();
  // console.log(data);
  return (
    <div>
      <Slider />
      <LatestCollection />
    </div>
  )
}

export default Home