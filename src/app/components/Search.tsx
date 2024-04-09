'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import channels from '../../../times_mapping.json'

type TSearchResult = {
  id: string
  name: string
  creator: string
}

const Search = () => {
  const [searchResult, setSearchResult] = useState<TSearchResult[]>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const filteredChannels = channels.filter((channel) => {
      return value ? channel.name.match(value) : false
    })
    setSearchResult(filteredChannels)
  }
  return (
    <div className='w-80 my-0 mx-auto'>
      <form action='' className='flex justify-center'>
        <input
          className='w-80 border-solid border-2 rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 p-1'
          type='text'
          placeholder='search times channel...'
          name='keyword'
          autoComplete='off'
          onChange={(e) => {
            handleChange(e)
          }}
        />
      </form>
      <div
        className={`flex flex-col items-start pt-2 max-h-80 ${searchResult?.length ? 'bg-white overflow-y-scroll border-solid border-2 rounded-md' : ''} `}
      >
        {searchResult ? (
          searchResult.map((result: TSearchResult) => (
            <div className='w-full hover:bg-gray-300 hover:opacity-50' key={result.id}>
              <Link className='w-full px-2 py-1 block' href={`/analyze/${result.id}`}>
                {result.name}
              </Link>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Search
