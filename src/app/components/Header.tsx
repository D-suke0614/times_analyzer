import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header className='h-16 bg-slate-700 flex justify-between'>
      <div>
        <Link className='block h-full w-fit hover:opacity-50' href={'/'}>
          <h1 className='text-white w-fit h-full pt-5 pl-10'>Times Analyzer</h1>
        </Link>
      </div>
      <div>
        <Link className='block h-full w-fit text-white hover:opacity-50' href={'/download'}>
          <span className='block pt-5 pr-10'>チャンネル情報を更新</span>
        </Link>
      </div>
    </header>
  )
}

export default Header
