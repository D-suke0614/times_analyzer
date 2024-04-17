'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

interface TimesProviderProps {
  children: ReactNode
}

interface TimesContextType {
  id: string
  setId: Dispatch<SetStateAction<string>>
}

const TimesContext = createContext<TimesContextType>({
  id: '',
  setId: () => {},
})

export const TimesProvider = ({ children }: TimesProviderProps) => {
  const [id, setId] = useState('')
  return <TimesContext.Provider value={{ id, setId }}>{children}</TimesContext.Provider>
}

// コンテキストを使用するためのカスタムフック
export const useId = () => useContext(TimesContext)
