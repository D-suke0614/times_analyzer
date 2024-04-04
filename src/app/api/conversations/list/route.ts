import { WebClient } from '@slack/web-api'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   const token = process.env.TOKEN
//   const slackClient = new WebClient(token)
//   const response = await slackClient.conversations.list({
//     token,
//     exclude_archived: true,
//     limit: 100,
//   })
//   const formattedResponse = NextResponse.json(response)
//   return formattedResponse
// }
