import { ConversationsHistoryResponse, WebClient } from '@slack/web-api'
import Link from 'next/link'
import React from 'react'
import times_mapping from '../../../../times_mapping.json'

const fetchConversationsHistories = async (channelId: string) => {
  const token = process.env.TOKEN
  const client = new WebClient(token)

  // 1w = 604800s
  // 先月をUNIX Timestampで取得
  const date = new Date()
  const lastMonth = Math.floor(
    new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()).getTime() / 1000,
  )
  // console.log(lastMonth)

  const rawData: ConversationsHistoryResponse = await client.conversations.history({
    token,
    channel: channelId,
    limit: 200,
    oldest: lastMonth.toString(),
  })
  const response: Response = Response.json(rawData)
  const conversationsHistories = await response.json()
  return conversationsHistories
}

const getChannelCreatorsConversations = (conversationsHistories: any, creator: string) => {
  const filteredResponse = conversationsHistories.messages
    .filter((message: any) => {
      return message.user === creator
    })
    .map((message: any) => {
      const sendDate = new Date(message.ts * 1000).toLocaleString()
      return {
        ...message,
        sendDate,
      }
    })
  return filteredResponse
}

export default async function Page({ params }: { params: { id: string } }) {
  const channelId: string = params.id
  const channelInfo = times_mapping.filter((item) => {
    return item.id === channelId
  })
  const conversationsHistories = await fetchConversationsHistories(channelId)
  const messages = getChannelCreatorsConversations(conversationsHistories, channelInfo[0].creator)
  // console.log('messages', messages)
  return (
    <div>
      <Link href={'/'}>Go to Home</Link>
      id: {channelId}
      投稿数: {messages.length}
      <ul>
        {messages.map((message: any) => (
          <div className='py-5' key={message.ts}>
            <li>
              message: {message.text}
              <div>time: {message.sendDate}</div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}
