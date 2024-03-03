import React from 'react'
import ModeToggle from '../toggleTheme/toggle'

const Navbar = () => {
    return (
        <div className='flex justify-end items-center shadow w-full px-8 py-2 fixed top-0'>
            <ModeToggle />
        </div>
    )
}

export default Navbar
