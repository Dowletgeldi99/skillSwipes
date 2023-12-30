"use client"

import React from 'react';
import Link from "next/link";

const Header = () => {
    return (
        <div className='px-4 py-2 flex justify-between bg-[#f0f0ff]'>
            <Link href='/'>
                Editor
            </Link>
            <Link href='/preview'>
                Preview
            </Link>
        </div>
    );
};

export default Header;
