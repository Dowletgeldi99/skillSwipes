"use client";

import React from 'react';
import SquarePreview from "@/app/components/SquarePreview";

const Preview = () => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='mb-4 text-2xl font-semibold'>Preview</h1>
            <SquarePreview />
        </div>
    );
};

export default Preview;
