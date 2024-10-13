"use client";
import React from "react";
import {
  Button,
  Card,
  CardBody,
  Textarea,
  Switch,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Input
} from "@nextui-org/react";
import { useState,useRef} from "react";

import Image from "next/image";
import StarImage from "../assets/star.png";
import NextButton from "../components/NextButton";
function Content() {
  const [thinking, setThinking] = useState(false);
  const [topics, setTopics] = useState("");
  const [option, setOption] = useState("Professional");
  const [seo,setSeo] = useState(false);
  const [length,setLength] = useState("");
  
  const thinkingButtonClicked = () => {
    setThinking(true);
    setTimeout(() => {
      setTopics(
        "Lead nurturing statergies content marketing automation account-based marketting webinar and virtual events email marketting optimization special media engagement for b2b seo for saas platform"
      );
      setThinking(false);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center">
      <Card className=" w-full max-w-md md:max-w-lg p-2 flex flex-col justify-center items-center">
        <CardBody className="*:my-3">
          <h1 className="text-xl md:text-3xl"><b>Generate Content</b></h1>
          <p>
            Start By Selecting a company and product or create new ones at
            BrandCentre in a few clicks.
          </p>
          <div className="flex items-center justify-between">
            <p>Please provide a list of content topics you'd like to cover.</p>
            <Button
              isIconOnly
              onPress={thinkingButtonClicked}
              variant="outlined"
              isLoading={thinking}
            >
              <Image height={30} src={StarImage} />
            </Button>
          </div>
          <Textarea onChange={e => {
            setTopics(e.target.value);
          }} value={topics} />
          <Switch onChange={e => {
            setSeo(!seo);
          }} color="default" >SEO Optimised?</Switch>
          <div className="flex items-center justify-between">
            <div>
              <p className="my-3">Tone</p>
              <Dropdown>
                <DropdownTrigger> 
                  <Button

                    variant="bordered"
                    className="max-w-lg w-full"
                  >{option}</Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Static Actions"
                  className="w-full max-w-lg"
                >
                  <DropdownItem onPress={() => {
                    setOption("Professional")
                  }}>Professional</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div>
            <p className="my-3">Content Character Length</p>
            <Input type="number" onChange={e => {
              setLength(e.target.value);
            }}/>

            </div>
          </div>
          <NextButton destRoute={"/Review"} data={
            {
              seo:seo,
              contentLength :length,
              topics : topics,
              tone : option
            }
          }/>
        </CardBody>
      </Card>
    </div>
  );
}

export default Content;
