import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header className=' h-16 bg-slate-700'>
      <Link className='block h-full w-fit hover:opacity-50' href={'/'}>
        <h1 className='text-white w-fit h-full pt-5 pl-10'>Times Analyzer</h1>
      </Link>
    </header>
  )
}

export default Header