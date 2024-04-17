'use client'

import Link from 'next/link'
import React from 'react'

function Error({error}: {error: Error}) {
  console.log(error)
  return (
    <div className='flex flex-col items-center gap-7 mt-10'>
      <h2 className=' font-bold text-xl'>An error has occurred.</h2>
      <Link href={'/'} className='hover:underline'>トップページへ戻る</Link>
    </div>
  )
}

export default Error