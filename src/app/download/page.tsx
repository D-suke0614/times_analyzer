'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Button from '../components/Button'
import LinkButton from '../components/LinkButton'

function Page() {
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const router = useRouter()

  const fetchChannelList: () => Promise<void> = async () => {
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
            Slackからtimesチャンネルの情報を取得します。
            <br />
            この処理には時間がかかることがあります。
          </p>
          <div className='flex justify-start gap-7 mt-5'>
            <LinkButton href='/' title='戻る' />
            <Button type='button' color='success' title='開始' onClick={fetchChannelList} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
