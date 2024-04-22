export type TTiming = 'latest' | 'oldest'

export type TMessage = {
  user: string
  type: 'message'
  ts: string
  client_msg_id: string
  text: string
  team: string
  blocks: []
}

export type TConversationsHistories = {
  ok: true | false
  latest: string
  oldest: string
  messages: [TMessage]
  has_more: true | false
  pin_count: number
  channel_actions_ts: number
  channel_actions_count: number
  response_metadata: []
}
export type TConversationsHistoriesObj = {
  [key: string]: TConversationsHistories[]
}

export type ChannelInfoType = {
  id: string
  name: string
  creator: string
}

export type TChannelCreatorsConversations = {
  channelInfo: ChannelInfoType
  conversations: TMessage[][]
}[]
