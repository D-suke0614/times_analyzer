'use client'

import { useState } from "react"
import Button from "@/app/components/Button"
import LinkButton from "@/app/components/LinkButton"
import Modal from "@/app/components/Modal"

type PropsType = {
  channelIds: string[]
}

const AnalyzeControl = (props: PropsType) => {
  const { channelIds } = { ...props }
  const [displayed, setDisplayed] = useState<boolean>(false)

  const displayModal = () => {
    setDisplayed(true)
  }

  return(
    <>
      <div className='mt-14 flex gap-4 items-center justify-center'>
        <LinkButton href='/' title='戻る' />
        <Button type='button' title='他のチャンネルを選択' color='success' onClick={displayModal} />
      </div>
      <Modal displayed={displayed} channelIds={channelIds} setDisplayed={setDisplayed}  />
    </>
  )
}

export default AnalyzeControl