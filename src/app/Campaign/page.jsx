"use client";
import React from "react";
import { Card, CardBody, Textarea,Button } from "@nextui-org/react";
import {useState} from 'react';
import Image from "next/image";
import NextButton from "../components/NextButton";
import StartImage from '../assets/star.png'
import DropdownComp from "../components/DropdownComp";
function Campaign() {
  const [thinking,setThinking] = useState(false);
  const thinkButtonClicked = () => {
    setThinking(true)
    setTimeout(() => {
      setThinking(false)
    },2000)
  }


  const options = [
    "test",
    "Sell magic ai generative ai platform",
    "social media",
    "sdfsdf",
    "Demand gen for b2b saas",
    "webtico",
    "arttabot",
    "communication powers",
    "H",
  ];
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-lg p-2 flex flex-col justify-center items-center">
        <CardBody>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl"><b>Create a Campaign</b></h3>
            <p className="bg-purple-400 rounded-3xl p-3 text-white">
              Campaigns
            </p>
          </div>
          <p className="my-5">
            Explain your audience aligning with your content and specific goals
            such as brand awareness,lead generation,education, etc.
          </p>
          <DropdownComp
            modalTitle={"What is the primary objective of the Campaign"}
            title={"What is the primary objective of the Campaign"}
            modalOptions={options}
            dropdownOptions={options}
          />
          <div className="flex justify-between items-center">
            <p className="my-5">
              What is your target audience for this content?
            </p>
            <Button isIconOnly variant="light" isLoading={thinking} onPress={thinkButtonClicked}>
              <Image height={30} src={StartImage}/>
            </Button>
          </div>
          <Textarea defaultValue="Woman aged 25-40 \n Income level of $50,000-$100,000 per year Interest in sustainable fashion active on social media platforms small to medium sized bussiness decision makres in IT departments Ages" />
          <NextButton destRoute={'/Content'}/>
        </CardBody>

      </Card>
    </div>
  );
}

export default Campaign;
