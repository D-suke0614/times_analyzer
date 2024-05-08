'use client'

import Link from "next/link"

type LinkButtonPropsType = {
  href: string
  text: string
}

const LinkButton = (props: LinkButtonPropsType) => {
  const { href, text } = {...props}
  return (
    <>
      <Link className="py-2 px-5 bg-gray-400 rounded-md hover:opacity-75" href={href}>{text}</Link>
    </>
  )
}

export default LinkButton