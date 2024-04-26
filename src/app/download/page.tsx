'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

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
      {isDownloading ? (
        <div className='flex justify-center items-center gap-6 mt-20'>
          <div className='h-10 w-10 animate-spin border-[5px] border-sky-400 rounded-full  border-t-transparent'></div>
          <p className='text-[30px] font-weight'>Downloading...</p>
        </div>
      ) : (
        <div className='mx-auto mt-20 w-fit'>
          <p>
            Slackからtimesチャンネルの情報を取得します。<br/>
            この処理には時間がかかることがあります。
          </p>
          <div className='flex justify-start gap-7 mt-5'>
            <Link className='py-2 px-5 bg-gray-400 rounded-md hover:opacity-75 hover:cursor-pointer' href={'/'}>戻る</Link>
            <button className='py-2 px-5 bg-cyan-500 rounded-md hover:opacity-75' type='button' onClick={fetchChannelList}>
              開始
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
