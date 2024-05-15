'use client'

import Link from 'next/link'
import React from 'react'
import HamburgerMenu from './HamburgerMenu'

// TODO: チャンネル取得する動線ではヘッダーのリンクは非表示に
function Header() {

  return (
    <header className='h-16 bg-slate-700 flex justify-between'>
      <div>
        <Link className='block h-full w-fit hover:opacity-50' href={'/'}>
          <h1 className='text-white w-fit h-full pt-5 pl-10'>Times Analyzer</h1>
        </Link>
      </div>

      <HamburgerMenu />
    </header>
  )
}

export default Header
