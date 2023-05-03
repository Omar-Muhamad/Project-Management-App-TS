import React from 'react';
import logo from '@/assets/images/logo.png'
import Image from 'next/image';

const about = () => {
  return <div className='w-screen h-screen'>
    <Image className='w-full' src={logo} alt="logo"/>
  </div>;
  
};

export default about;
