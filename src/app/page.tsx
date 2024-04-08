import { WebClient } from '@slack/web-api'
import Link from 'next/link'
import times_mapping from '../../times_mapping.json'
import Search from './components/Search'

const fetchChannelList = async () => {
  // const res = await fetch('http://localhost:3000/api/conversations/list', {
  //   cache: 'no-store',
  //   method: 'POST'
  // })
  // const formattedResponse = await res.json()
  // return formattedResponse

  const token = process.env.TOKEN
  const webClient = new WebClient(token)
  let cursor
  const result = []
  while (cursor !== '') {
    const rawResponse = await webClient.conversations.list({
      token,
      exclude_archived: true,
      limit: 200,
      cursor,
    })
    const response = Response.json(rawResponse)
    const formattedResponse = await response.json()
    const filteredResponse = formattedResponse.channels.filter((channel: any) => {
      return channel.name.includes('times_')
    })
    if (filteredResponse.length) {
      result.push(...filteredResponse)
    }
    cursor = formattedResponse.response_metadata.next_cursor
    // 3秒に１回のリクエストがSlackAPIの仕様の上限（20req/1m）
  }
  return result
}

export default async function Home() {
  // const result = await fetchChannelList()
  return (
    <main className='h-screen'>
      <div className='pt-16'>
        <Search />
      </div>
    </main>
  )
}
