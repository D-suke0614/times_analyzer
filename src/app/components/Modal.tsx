'use client'

import { Dispatch, SetStateAction } from "react"
import channel_info from '../../../channel_info.json'
import Search from "./Search"

type ModalPropsType = {
  displayed: boolean
  channelIds: string[]
  setDisplayed: Dispatch<SetStateAction<boolean>>
}

const Modal = (props: ModalPropsType) => {
  const { displayed, channelIds, setDisplayed } = { ...props }
  return (
    <>
      {displayed ? 
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000080] pt-44 z-50">
          <Search channelInfo={channel_info} selectedChannelIds={channelIds} onClickHandler={() => setDisplayed(false)} />
          <button onClick={() => setDisplayed(false)}>close</button>
        </div>
      :
        <></>
      }
    </>
  )
}
export default Modal