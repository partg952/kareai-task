'use client'
import React from 'react'
import { Button } from '@nextui-org/react'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Context } from '../contextProvider'
function NextButton({destRoute}) {
  const {progress,setProgress} = useContext(Context);
  const router = useRouter()
  return (
    <div>
        <Button className='bg-purple-400 text-white w-full color-white my-3' onPress={() => {
            setProgress((prev) => prev+16.66);
            router.push(destRoute)
                           
        }}>Next</Button>
    </div>
  )
}

export default NextButton