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
  Input,
} from "@nextui-org/react";
import { useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import StarImage from "../assets/star.png";
import NextButton from "../components/NextButton";
import { useContext } from "react";
import { Context } from "../contextProvider";
function Content() {
  const [thinking, setThinking] = useState(false);
  const [topics, setTopics] = useState("");
  const [option, setOption] = useState("Professional");
  const value = useContext(Context);
  const [seo, setSeo] = useState(true);
  const [length, setLength] = useState("");

  const thinkingButtonClicked = () => {
    setThinking(true);
    axios
      .post(
        "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/topics",
        {
          company: value.finalData.company,
          product: value.finalData.product,
          campaign: value.finalData.objective,
          audience: value.finalData.targetAudience,
        }
      )
      .then((res) => {
        setTopics(res.data);
        setThinking(false);
      });
  };

  return (
    <div className="flex items-center justify-center *:text-xs">
      <Card className="w-full max-w-sm max-h-dvh md:max-w-lg p-2 flex flex-col justify-center items-center">
        <CardBody className="*:my-2">
          <h1 className="text-xl md:text-2xl">
            <b>Generate Content</b>
          </h1>
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
          <div className="">
            <Textarea
              size="sm"
              maxRows={4}
              onChange={(e) => {
                setTopics(e.target.value);
              }}
              value={topics}
            />
          </div>
          <Switch
            onChange={(e) => {
              setSeo(!seo);
            }}
            color="default"
            
            value={seo}
          >
            SEO Optimised?
          </Switch>
          <div className="flex items-center justify-between">
            <div>
              <p className="my-3">Tone</p>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="max-w-lg w-full">
                    {option}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Static Actions"
                  className="w-full max-w-lg"
                >
                  <DropdownItem
                    onPress={() => {
                      setOption("Professional");
                    }}
                  >
                    Professional
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div>
              <p className="my-3">Content Character Length</p>
              <Input
                defaultValue={6000}
                type="number"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
            </div>
          </div>
          <NextButton
            destRoute={"/Review"}
            data={{
              seo: seo,
              contentLength: length,
              topics: topics,
              tone: option,
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default Content;
