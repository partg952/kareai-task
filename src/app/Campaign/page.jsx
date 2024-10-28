"use client";
import React, { useEffect } from "react";
import { Card, CardBody, Textarea, Button } from "@nextui-org/react";
import { useState, useRef } from "react";
import Image from "next/image";
import NextButton from "../components/NextButton";
import StartImage from "../assets/star.png";
import DropdownComp from "../components/DropdownComp";
import { useContext } from "react";
import { Context } from "../contextProvider";
import axios from "axios";
function Campaign() {
  const [thinking, setThinking] = useState(false);
  const [objective, setObjective] = useState("Select a Campaign");
  const [audience, setAudience] = useState(
    "Woman aged 25-40 \n Income level of $50,000-$100,000 per year Interest in sustainable fashion active on social media platforms small to medium sized bussiness decision makres in IT departments Ages"
  );
  console.log(objective);
  const value = useContext(Context);
  const [options, setOptions] = useState([
    "test",
    "Sell magic ai generative ai platform",
    "social media",
    "sdfsdf",
    "Demand gen for b2b saas",
    "webtico",
    "arttabot",
    "communication powers",
    "H",
  ]);
  const textRef = useRef();

  const thinkButtonClicked = () => {
    setThinking(true);
    axios
      .post(
        "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/audience",
        {
          company: value.finalData.company,
          product: value.finalData.product,
          campaign: objective,
        }
      )
      .then((res) => {
        console.log(res.data);
        setAudience(res.data);
        setThinking(false);
      });
  };

  return (
    <div className="flex items-center justify-center * : text-xs">
      <Card className="w-full max-w-sm md:max-w-lg p-2 max-h-100 flex flex-col justify-center items-center">
        <CardBody>
          <div className="flex items-center justify-between">
            <h3 className="text-xl md:text-2xl">
              <b>Create a Campaign</b>
            </h3>
            <p className="bg-purple-400 rounded-3xl p-3 text-white">
              Campaigns
            </p>
          </div>
          <p className="my-1">
            Explain your audience aligning with your content and specific goals
            such as brand awareness,lead generation,education, etc.
          </p>

          <DropdownComp
            modalTitle={"What is the primary objective of the Campaign"}
            title={"What is the primary objective of the Campaign"}
            selectableOptions={options}
            data={objective}
            setData={setObjective}
            isAddable={true}
            thinking={true}
            additionalThinkingFunction={() => {
              return new Promise((resolve, reject) => {
                axios
                  .post(
                    "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/campaign",
                    {
                      company: value.finalData.company,
                      product: value.finalData.product,
                    }
                  )
                  .then((res) => {
                    console.log(res.data);
                    setObjective(res.data.replace('"', ""));
                    resolve("The axios request was success!!")
                  }).catch(err => {
                    console.log(err);
                    reject(err);
                  });
              });
            }}
          />
          <div className="flex justify-between items-center">
            <p className="my-1">
              What is your target audience for this content?
            </p>
            <Button
              isIconOnly
              variant="light"
              className="my-1"
              isLoading={thinking}
              onPress={thinkButtonClicked}
            >
              <Image height={30} src={StartImage} />
            </Button>
          </div>
          <Textarea
            maxRows={4}
            ref={textRef}
            value={audience}
            className="text-sm max-h-min"
            onChange={(e) => {
              setAudience(e.target.value);
            }}
          />
          <NextButton
            destRoute={"/Content"}
            data={{
              targetAudience: textRef.current != undefined && audience,
              objective: objective,
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default Campaign;
