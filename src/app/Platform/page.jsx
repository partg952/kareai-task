'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import styles from './platform.module.scss';
import {Card,CardBody,Button,Checkbox,CheckboxGroup} from '@nextui-org/react';
import { useContext } from 'react';
import { context } from '../contextProvider';
function Platform() {
  const router = useRouter();
  const contextValue = useContext(context);
  console.log(contextValue)
  return (
    <div className = {styles.platformWrapper}>
      <Card className="w-full max-w-lg p-4">
        <CardBody>
          <div className = "flex justify-between items-center">
            <h2><b>Select Platform</b></h2>
            <h3 className = "bg-purple-400 p-3 rounded-3xl text-white">Connect Your Accounts</h3>
          </div>
          <p className = "my-5 w-full">Choose the social media platforms you would like to publish your post.Feel free to select multiple platforms at once</p>
          <CheckboxGroup>
            <Checkbox value='x'>X</Checkbox>
            <Checkbox value='linkedin'>Linkedin</Checkbox>
          </CheckboxGroup>
          <Button onClick={() => {
            
            router.push("/Company")
            }} className = 'my-5 bg-purple-400 text-white w-full' >Next</Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default Platform;