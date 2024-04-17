import { WebClient } from '@slack/web-api'
import Search from './components/Search'

const fetchChannelList = async () => {
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
  // MEMO チャンネル一覧を取得したければ、fetchChannelList()を実行する
  // TODO チャンネル取得後、欲しいデータだけ整形してjsonファイルに保存されるようにする（チャンネル更新みたいなボタンを用意して、クリックされたら更新されるとかでもいいかも）
  // const result = await fetchChannelList()
  return (
    <main>
      <div className='pt-16'>
        <Search />
      </div>
    </main>
  )
}
