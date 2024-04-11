import { ConversationsHistoryResponse, WebClient } from '@slack/web-api'
import Link from 'next/link'
import React, { Suspense } from 'react'
import times_mapping from '../../../../times_mapping.json'
import Loading from './loading'
import LineChart from '@/app/components/LineChart'

// 1w = 604800s
/**
 * 何ヶ月分のデータを分析するか
 */
const MONTHS: number = 6

/**
 * 一回のリクエストで取得するデータ
 */
const LIMIT: number = 500

type TTiming = 'latest' | 'oldest'

/**
 *
 * @param num
 * @param timing
 * @returns UnixTimestamp
 */
const getUnixTimestamp = (num: number, timing: TTiming): number => {
  const date: Date = new Date()
  if (timing === 'latest') {
    // 月末の日付を返す
    if (num === 0) {
      // 今月だけ、今日の日付を返す
      return Math.floor(
        new Date(date.getFullYear(), date.getMonth() + num, date.getDate()).getTime() / 1000,
      )
    }
    return Math.floor(new Date(date.getFullYear(), date.getMonth() + num + 1, 0).getTime() / 1000)
  } else {
    // 月初の日付を返す
    return Math.floor(new Date(date.getFullYear(), date.getMonth() + num).getTime() / 1000)
  }
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
    const latestUnixTimestamp = getUnixTimestamp(i === 0 ? i : -i, 'latest')
    const oldestUnixTimestamp = getUnixTimestamp(i === 0 ? i : -i, 'oldest')

    try {
      const rawData: ConversationsHistoryResponse = await client.conversations.history({
        token,
        channel: channelId,
        limit: LIMIT,
        latest: latestUnixTimestamp.toString(),
        oldest: oldestUnixTimestamp.toString(),
      })
      const response: Response = Response.json(rawData)
      const jsonResponse = await response.json()
      conversationsHistories.push(jsonResponse)
    } catch (e) {
      console.error(e)
    }
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
  const conversationsHistories: any[] = await fetchConversationsHistories(channelId, MONTHS)
  const messages = searchChannelCreatorsConversations(
    conversationsHistories,
    channelInfo[0].creator,
  )
  return (
    <div className='mx-aut'>
      <Suspense fallback={<Loading />}>
        <div className='mt-10 text-center'>
          <Link className=' text-lg hover:opacity-50 hover:underline' href={'/'}>
            Analyze other channels...
          </Link>
          <div>期間: 直近{messages.length}ヶ月</div>
        </div>
        <div className='w-2/3 h-2/3 mt-20 mx-auto'>
          <LineChart messages={messages} channelName={channelInfo[0].name} />
        </div>
      </Suspense>
    </div>
  )
}
