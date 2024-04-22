'use client'
import React, { useState } from 'react'
import channels from '../../../times_mapping.json'
import { setCookie } from '../actions/cookie/action'

type TChannelInfo = {
  id: string
  name: string
  creator: string
}

const Search = () => {
  const [searchResult, setSearchResult] = useState<TChannelInfo[]>([])
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [currentFocusIdx, setCurrentFocusIdx] = useState<number>(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value
    const filteredChannels: TChannelInfo[] = channels.filter((channel: TChannelInfo) => {
      return value ? channel.name.match(value) : false
    })
    setSearchResult(filteredChannels)
    setCurrentFocusIdx(-1)
  }

  const handleCheckBox = (target: HTMLInputElement) => {
    const value: string = target.value
    let checked: boolean = target.checked
    if (checkedItems.length > 5) return
    if (checked) {
      const newCheckedItems = [...checkedItems]
      newCheckedItems.push(value)
      setCheckedItems(newCheckedItems)
    } else {
      const newCheckedItems = checkedItems.filter((item) => {
        return value !== item
      })
      setCheckedItems(newCheckedItems)
    }
  }

  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!searchResult.length) return
    const element: NodeListOf<HTMLElement> = document.querySelectorAll(
      '[data-selector=channel-item]',
    )
    const maxIdx = searchResult.length - 1
    let targetIdx = currentFocusIdx
    if (e.key === 'ArrowDown' && targetIdx < maxIdx) {
      targetIdx += 1
      element[targetIdx].focus()
    } else if (e.key === 'ArrowUp' && targetIdx > 0) {
      targetIdx -= 1
      element[targetIdx].focus()
    } else if (e.key === 'Enter') {
      const activeElement = document.activeElement
      if (!activeElement?.children.length) return
      const checkboxEl = activeElement.children[0].children[0].children[0] as HTMLInputElement
      if (checkboxEl.disabled) return
      checkboxEl.checked = !checkboxEl.checked
      handleCheckBox(checkboxEl)
    }
    setCurrentFocusIdx(targetIdx)
  }

  const setCookieWithChannelInfo = setCookie.bind(null, checkedItems)

  return (
    <form action={setCookieWithChannelInfo} className='w-80 my-0 mx-auto'>
      <div className='flex items-center'>
        <input
          className='w-96 border-solid border-2 rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 p-1'
          type='text'
          placeholder='search times channel...'
          autoComplete='off'
          onChange={(e) => {
            handleChange(e)
          }}
          onKeyDown={keyDownHandler}
        />
        <button
          className='border-solid border-2 rounded-md bg-white p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-500 disabled:hover:bg-white disabled:hover:text-gray-400'
          type='submit'
          disabled={!checkedItems.length}
        >
          analyze
        </button>
      </div>
      <div
        className={`flex flex-col items-start pt-2 max-h-80 ${searchResult?.length ? 'bg-white overflow-y-scroll border-solid border-2 rounded-md' : ''} `}
      >
        {searchResult ? (
          searchResult.map((result: TChannelInfo) => (
            <div
              data-selector='channel-item'
              tabIndex={1}
              className='w-full hover:bg-gray-300 hover:opacity-50'
              key={result.id}
              onKeyDown={keyDownHandler}
            >
              <div className='w-full px-2 py-1'>
                <label className='text-center flex' htmlFor={result.id}>
                  <input
                    className='mr-2'
                    id={result.id}
                    type='checkbox'
                    value={result.id}
                    defaultChecked={checkedItems.includes(result.id)}
                    onClick={(e) => handleCheckBox(e.currentTarget)}
                    disabled={checkedItems.length > 4}
                  />
                  {result.name}
                </label>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </form>
  )
}

export default Search
