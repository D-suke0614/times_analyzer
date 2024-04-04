import { WebClient } from '@slack/web-api' 
import React from 'react'

const fetchMessage = async (channelId: string) => {
  const token = process.env.TOKEN
  const client = new WebClient(token)
  const rawResponse = await client.conversations.history({
    token,
    channel: channelId,
    limit: 200
  })
  const response = Response.json(rawResponse)
  const formattedResponse  = await response.json()
  return formattedResponse.messages
}

export default async function Page({params}: {params: {id: string}}) {
  const channelId: string = params.id
  const messages = await fetchMessage(channelId)
  console.log('messages', messages)
  return (
    <div>
      id: {channelId}
      <ul>
        {messages.map((message: any) => (
          <div key={message.ts}>
            <li>message: {message.text}</li>
          </div>
        ))}
      </ul>
      </div>
  )
}
