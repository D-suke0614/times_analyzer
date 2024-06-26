import fs from 'fs'
import { ConversationsListResponse, WebClient } from '@slack/web-api'
import { Channel } from '@slack/web-api/dist/types/response/ConversationsListResponse'
import { NextResponse } from 'next/server'

export const GET = async () => {
  console.log('preparing...')
  const token = process.env.TOKEN
  const client = new WebClient(token)
  let cursor
  const result = []

  /**
   * SlackAPIの使用上限に合わせて、処理を一定間隔ごとにする（チャンネル一覧取得 = Tier2: 20req/1m）
   * @param ms 待機する間隔をmsで指定
   */
  const timeout = (ms: number) => new Promise((done) => setTimeout(done, ms))

  console.log('complete prepared')
  while (cursor !== '') {
    console.log('data fetching...')
    try {
      const response: Response = await client.conversations
        .list({
          exclude_archived: true,
          limit: 200,
          cursor,
        })
        .then((res) => Response.json(res))
      const data: ConversationsListResponse = await response.json()
      cursor = data.response_metadata?.next_cursor

      // 必要な形にしてからfilter
      const filteredData: Channel[] | undefined = data?.channels
        ?.map((channel) => {
          return {
            name: channel.name,
            id: channel.id,
            creator: channel.creator,
          }
        })
        .filter((channel) => {
          return channel.name?.includes('times_')
        })
      if (filteredData?.length) {
        result.push(...filteredData)
      }

      await timeout(3000)
    } catch (err) {
      console.error(err)
    }
  }

  const fileName = 'channel_info.json'
  const jsonResult = JSON.stringify(result, null, 2)
  fs.writeFile(fileName, jsonResult, () => {})
  console.log('complete')
  return NextResponse.json(result)
}
