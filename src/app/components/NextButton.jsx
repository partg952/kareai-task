'use client'
import React from 'react'
import { Button } from '@nextui-org/react'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Context } from '../contextProvider'
function NextButton({destRoute,data}) {
  const value = useContext(Context);
  const router = useRouter()
  console.log(data);
  return (
    <div>
        <Button className='bg-purple-400 text-white w-full color-white my-3' onPress={() => {
            value.setProgress((prev) => prev+16.66);
            value.addData({...value.finalData,data})
            console.log(value.finalData);
            router.push(destRoute)
                           
        }}>Next</Button>
    </div>
  )
}

export default NextButton