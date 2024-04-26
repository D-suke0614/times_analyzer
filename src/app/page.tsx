import Link from 'next/link'
import channelInfo from '../../channel_info.json'
import Search from './components/Search'

export default async function Home() {
  return (
    <main>
      <div className='pt-16'>
        {channelInfo.length ? <Search channelInfo={channelInfo} /> : 
          <div className=''>
            <Link className='block h-full w-fit mx-auto rounded-md bg-cyan-500 hover:opacity-75' href={'/download'}>
              <span className='block py-4 px-8'>チャンネル情報を取得</span>
            </Link>
          </div>
        }
      </div>
    </main>
  )
}
