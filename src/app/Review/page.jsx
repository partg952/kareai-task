"use client";
import React from "react";
import { Card, CardBody, Textarea, Switch,Button } from "@nextui-org/react";
import { useState ,useContext} from "react";
import {useRouter} from 'next/navigation';
import {Context} from '../contextProvider';
import { Router } from "next/router";
function Review() {
  const [value, setValue] = useState("");
  const [on,setOn] = useState(false);
  const {progress,setProgress,finalData,addData} = useContext(Context);
  const router = useRouter();
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-lg p-2 flex flex-col justify-center items-center *:my-3">
        <CardBody>
          <h3 className="my-3 text-2xl">Review your Content</h3>
          <p className="my-3">
            Start by selecting a company and product or create new ones at
            BrandCentre in a few clicks
          </p>
          <Textarea onChange={e => {
            setValue(e.target.value);
          }} contentEditable = {true} value={value} />
          <Switch onChange={(e) => {
            setTimeout(() => {
                setValue("are you ready to revoltunise your business process with cutting-edge solutions from rockstar games ? Introducing our latest campaign ,demand gen for b2b saas,featuring the groundbreaking gta 6.this isnt just a game its a robust platform designed to solve real world challenged for small to medium sized tech businesses as an it manager you know the importance of streamlining operations yet you're faced with the daily hurdles of ineffecient software")
                setOn(true)
            },2000)
            
            }} color="default" className="my-3">Send a copy to my email address</Switch>
          <Button className="w-full max-w-lg bg-purple-400 rounded-3xl text-white" isDisabled = {!on} onPress={() =>  {
              addData({...finalData,...{
                reviewContent:value,
                sendEmail:on
              }});
              router.push("/Publish")
              
          } }>Next</Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default Review;
