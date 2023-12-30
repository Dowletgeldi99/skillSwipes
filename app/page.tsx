"use client"

import React from 'react';
import SquareEditor from "@/app/components/SquareEditor";

const Home: React.FC = () => {
  return (
      <div className='flex flex-col items-center'>
          <h1 className='mb-4 text-2xl font-semibold'>Square Editor</h1>
          <SquareEditor />
      </div>
  );
};

export default Home;
