import React from 'react'

const Navbar = () => {
  return (
      <nav className='  w-full px-8 py-4'>
          <div className='flex justify-start items-center gap-2'>
              <img className=' h-10 w-10 bg-cover' src="/Logo.svg" alt="study_logo" />
           <p className='font-extrabold font-comic text-2xl'>Study Assistant</p>
          </div>
    </nav>
  )
}

export default Navbar