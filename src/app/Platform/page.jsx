'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import {Card,CardBody,Button,Checkbox,CheckboxGroup} from '@nextui-org/react';
import { useContext } from 'react';
import { useRef } from 'react';
import { Context } from '../contextProvider';
import NextButton from '../components/NextButton';
function Platform() {
  const router = useRouter();
  const value = useContext(Context);
  const [checkBoxData,setData] = useState([]);
  return (
    <div className = {'flex justify-center items-center'}>
      <Card className="w-full max-w-lg p-4">
        <CardBody>
          <div className = "flex justify-between items-center">
            <h2 className='text-3xl'><b>Select Platform</b></h2>
            <h3 className = "bg-purple-400 p-3 rounded-3xl text-white">Connect Your Accounts</h3>
          </div>
          <p className = "my-5 w-full">Choose the social media platforms you would like to publish your post.Feel free to select multiple platforms at once</p>
          <CheckboxGroup onChange={e => {
            setData(e)
          }} >
            <Checkbox value='x'>X</Checkbox>
            <Checkbox value='linkedin'>Linkedin</Checkbox>
          </CheckboxGroup>
          <NextButton destRoute={'/Company'} data={{platform:checkBoxData}}/> 
        </CardBody>
      </Card>
    </div>
  )
}

export default Platform;