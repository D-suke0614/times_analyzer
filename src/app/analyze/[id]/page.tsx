import { ConversationsHistoryResponse, WebClient } from '@slack/web-api'
import Link from 'next/link'
import React, { Suspense } from 'react'
import times_mapping from '../../../../times_mapping.json'
import Loading from './loading'
import LineChart from '@/app/components/LineChart'

// 1w = 604800s

/**
 *
 * @param num
 * @returns UnixTimestamp
 */
const getUnixTimestamp = (num: number = -1): number => {
  const date: Date = new Date()
  return Math.floor(
    new Date(date.getFullYear(), date.getMonth() + num, date.getDate()).getTime() / 1000,
  )
}

/**
 *
 * @param channelId
 * @param months
 * @returns 指定した期間のトーク履歴を取得
 */
const fetchConversationsHistories = async (channelId: string, months: number) => {
  const token: string | undefined = process.env.TOKEN
  const client: WebClient = new WebClient(token)
  const conversationsHistories = []

  for (let i = 0; i < months; i++) {
    const latestUnixTimestamp = getUnixTimestamp(i === 0 ? i : -i)
    const oldestUnixTimestamp = getUnixTimestamp(-(i + 1))

    const rawData: ConversationsHistoryResponse = await client.conversations.history({
      token,
      channel: channelId,
      limit: 500,
      latest: latestUnixTimestamp.toString(),
      oldest: oldestUnixTimestamp.toString(),
    })
    const response: Response = Response.json(rawData)
    const jsonResponse = await response.json()
    conversationsHistories.push(jsonResponse)
  }
  return conversationsHistories
}

/**
 *
 * @param conversationsHistories
 * @param channelCreator
 * @returns 取得したトーク履歴から、チャンネル作成者の送信した内容だけを取得
 */
const searchChannelCreatorsConversations = (
  conversationsHistories: any[],
  channelCreator: string,
) => {
  const channelCreatorsConversations = conversationsHistories.map((conversationsHistory) => {
    return conversationsHistory.messages
      .filter((message: any) => {
        return message.user === channelCreator
      })
      .map((message: any) => {
        const sendDate: string = new Date(message.ts * 1000).toLocaleString()
        return {
          ...message,
          sendDate,
        }
      })
  })
  return channelCreatorsConversations
}

export default async function Page({ params }: { params: { id: string } }) {
  const channelId: string = params.id
  // paramsから表示しているtimesチャンネルの情報を特定
  const channelInfo = times_mapping.filter((item) => {
    return item.id === channelId
  })
  // 何ヶ月分のデータを分析するか
  const months = 6
  const conversationsHistories: any[] = await fetchConversationsHistories(channelId, months)
  const messages = searchChannelCreatorsConversations(
    conversationsHistories,
    channelInfo[0].creator,
  )
  return (
    <div className='mx-aut'>
      <div className='mt-20 text-center'>
        <Link className=' text-lg hover:opacity-50 hover:underline' href={'/'}>Analyze other channels...</Link>
        <div>
          期間: 直近{messages.length}ヶ月
        </div>
      </div>
      <div className='w-2/3 h-2/3 mt-20 mx-auto'>
        <Suspense fallback={<Loading />}>
          <LineChart messages={messages} channelName={channelInfo[0].name} />
        </Suspense>
      </div>
    </div>
  )
}
