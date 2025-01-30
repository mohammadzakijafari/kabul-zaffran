import React from 'react'
import { useFetchProductsQuery } from '../store'
import LatestCollection from '../components/LatestCollection';
import Slider from '../components/SliderSection';

const Home = () => {

  return (
    <div>
      <Slider />
      <LatestCollection />
    </div>
  )
}

export default Home