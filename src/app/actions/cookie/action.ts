'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function setCookie(channelInfo: string[], fd: FormData) {
  cookies().delete('channelInfo')
  cookies().set('channelInfo', JSON.stringify(channelInfo))
  redirect('/analyze')
}
