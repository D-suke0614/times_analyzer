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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value
    const filteredChannels: TChannelInfo[] = channels.filter((channel: TChannelInfo) => {
      return value ? channel.name.match(value) : false
    })
    setSearchResult(filteredChannels)
  }

  const handleCheckBox = (e: React.MouseEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value
    const checked: boolean = e.currentTarget.checked
    if (checked) {
      searchResult.forEach((item) => {
        if (value === item.id) {
          checkedItems.push(value)
        }
      })
    } else {
      const newCheckedItems = checkedItems.filter((item) => {
        return value !== item
      })
      setCheckedItems(newCheckedItems)
    }
  }

  const setCookieWithChannelInfo = setCookie.bind(null, checkedItems)

  return (
    <form action={setCookieWithChannelInfo} className='w-80 my-0 mx-auto'>
      <div className='flex items-center'>
        <input
          className='w-80 border-solid border-2 rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 p-1'
          type='text'
          placeholder='search times channel...'
          autoComplete='off'
          onChange={(e) => {
            handleChange(e)
          }}
        />
        <button className='border-solid border-2 rounded-md bg-white p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-500' type='submit'>
          analyze
        </button>
      </div>
      <div
        className={`flex flex-col items-start pt-2 max-h-80 ${searchResult?.length ? 'bg-white overflow-y-scroll border-solid border-2 rounded-md' : ''} `}
      >
        {searchResult ? (
          searchResult.map((result: TChannelInfo) => (
            <div className='w-full hover:bg-gray-300 hover:opacity-50' key={result.id}>
              <div className='w-full px-2 py-1'>
                <label className='text-center flex' htmlFor={result.id}>
                  <input
                    className='mr-2'
                    id={result.id}
                    type='checkbox'
                    value={result.id}
                    onClick={(e) => handleCheckBox(e)}
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
      {/* <input type="hidden" value={checkedItems} name='channelInfo' /> */}
    </form>
  )
}

export default Search
