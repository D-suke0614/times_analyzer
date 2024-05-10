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
          <div className="w-full text-right">
            <button className="mr-32 space-y-2 p-2 hover:opacity-50" onClick={() => setDisplayed(false)}>
              <span className="block w-8 h-0.5 bg-white duration-300 translate-y-2.5 rotate-45"></span>
              <span className="block w-8 h-0.5 bg-white duration-300 -rotate-45"></span>
            </button>
          </div>
          <Search channelInfo={channel_info} selectedChannelIds={channelIds} onSubmitHandler={() => setDisplayed(false)} />
        </div>
      :
        <></>
      }
    </>
  )
}
export default Modal