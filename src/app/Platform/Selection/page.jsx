'use client'
import React from "react";
import {Card,CardBody,Checkbox,CheckboxGroup} from '@nextui-org/react';
import NextButton from "@/app/components/NextButton";
import { useState } from "react";
export default function Selection() {
  const [checkBoxData,setData] = useState([]);
  return (
    <div>
      <Card className=" max-w-sm p-4 md:max-w-lg">
        <CardBody>
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-xl">
              <b>Select Platform</b>
            </h2>
            <h3 className="bg-purple-400 p-3 rounded-3xl text-white">
              Connect Your Accounts
            </h3>
          </div>
          <p className="my-5 w-full">
            Choose the social media platforms you would like to publish your
            post.Feel free to select multiple platforms at once
          </p>
          <CheckboxGroup
            onChange={(e) => {
              setData(e);
            }}
          >
            <Checkbox value="twitter">X</Checkbox>
            <Checkbox value="linkedin">Linkedin</Checkbox>
          </CheckboxGroup>
          <NextButton
            destRoute={"/Platform/Final"}
            data={{ platform: checkBoxData }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
