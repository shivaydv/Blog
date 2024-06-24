import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'

const Test = ({src}:{src:string}) => {
  return (
    <MDXRemote source={src}/>
  )
}

export default Test