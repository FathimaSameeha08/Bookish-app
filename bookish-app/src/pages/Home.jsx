import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Banners from '../components/Banners'
import Intro from '../components/Intro'
import Footer from '../components/Footer'

function Home() {
 
  return (
<div>
  <Header classname="sticky-header"/>
  <Intro/> <br /> 
  <Banners/>
  <Footer/>
</div>
    )
}

export default Home