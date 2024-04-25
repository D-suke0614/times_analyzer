'use client'

import { useRouter } from 'next/navigation'
import React, { Suspense } from 'react'
import { useState } from 'react'

function Page() {
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const router = useRouter()

  const fetchChannelList = async () => {
    setIsDownloading(true)
    const res = await fetch('/api/download')
    router.push('/')
  }
  return (
    <div>
      <button type='button' onClick={fetchChannelList}>チャンネル情報を取得する</button>
      {
        isDownloading ? 
        <div className='flex justify-center items-center gap-6 mt-20'>
        <div className='h-10 w-10 animate-spin border-[5px] border-sky-400 rounded-full  border-t-transparent'></div>
        <p className='text-[30px] font-weight'>Downloading...</p>
      </div>
        : <></>
        
      }
    </div>
  )
}

export default Page