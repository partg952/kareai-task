"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  Textarea,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useRef } from "react";
import Image from "next/image";
import NextButton from "../components/NextButton";
import StartImage from "../assets/star.png";
import DropdownComp from "../components/DropdownComp";
import { useContext } from "react";
import Wand from '../assets/wand.svg';
import { Context } from "../contextProvider";
import axios from "axios";
function Campaign() {
  const [thinking, setThinking] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [objective, setObjective] = useState("Select a Campaign");
  const [audience, setAudience] = useState();
  console.log(objective);
  const value = useContext(Context);
  const [options, setOptions] = useState([]);
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
                    resolve("The axios request was success!!");
                  })
                  .catch((err) => {
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
              <Wand style = {{
                height : "20px",
                width : "20px"
              }}/>
            </Button>
          </div>
          <p
            onClick={onOpen}
            className="min-h-12 cursor-pointer p-3 text-small bg-slate-200 rounded-xl max-h-16 overflow-auto"
          >
            {audience}
          </p>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Edit The Target Audience
                  </ModalHeader>
                  <ModalBody>
                   <Textarea maxRows={6} value={audience} onValueChange={setAudience}/>
                  </ModalBody>
                  <ModalFooter>
                   
                    <Button color="secondary" variant = 'bordered'  onPress={onClose}>
                      Done
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <NextButton
            destRoute={"/Content"}
            data={{
              targetAudience:audience,
              objective: objective,
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default Campaign;
