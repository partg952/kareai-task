"use client";
import React from "react";
import {
  Card,
  CardBody,
  Switch,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Button,
  Calendar,
  TimeInput
} from "@nextui-org/react";
import NextButton from "../components/NextButton";
import { useState } from "react";
function Publish() {
  const getTime = () =>{
    return new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric',second:'numeric', hour12: true })
  }


  const [option, setOption] = useState("Every day");
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-lg p-2 flex flex-col justify-center items-center">
        <CardBody>
          <h3 className="my-3 text-2xl">When to Publish</h3>
          <p>
            Choose date and time to publish your poet.You can change your
            timezone in the profile settings
          </p>
          <div className="flex items-center justify-between my-5">
            <Switch>Repeat</Switch>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="outlined">{option}</Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onPress={() => setOption("Every day")}>
                  Every day
                </DropdownItem>
                <DropdownItem onPress={() => setOption("Every week")}>
                  Every week
                </DropdownItem>
                <DropdownItem onPress={() => setOption("Every Month")}>
                  Every month
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="max-w-lg w-full flex items-center justify-center">
            <Calendar />
          </div>
          <p className="mx-auto my-5">Time (UTC) Current System Time : {getTime()}</p>
          <TimeInput className="max-w-lg w-full p-3 text-center"/>
          <NextButton destRoute={'/ScheduledPosts'}/>
        </CardBody>
      </Card>
    </div>
  );
}

export default Publish;
