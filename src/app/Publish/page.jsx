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
import { useEffect } from "react";
import { ContactSupportOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { Context } from "../contextProvider";
import axios from 'axios';
function Publish() {
  const [repeat,setRepeat] = useState(false);
  const [date,setDate] = useState(new Date().getDate());
  const [time,setTime] = useState();
  const value = useContext(Context);
  const getTime = () =>{
    return new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric',second:'numeric', hour12: true });
    
  }

  useEffect(() => {
    axios.post("https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/linkedin_post",{
      blog : value.finalData.blog 
    }).then(res => {
      console.log(res.data);
    })
  },[])
  const [option, setOption] = useState("Every day");
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-sm md:max-w-lg p-2 flex flex-col justify-center items-center my-8">
        <CardBody>
          <h3 className="my-3 text-xl md:text-3xl"><b>When to Publish</b></h3>
          <p>
            Choose date and time to publish your poet.You can change your
            timezone in the profile settings
          </p>
          <div className="flex items-center justify-between my-5">
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
            <Calendar onChange={e => {
                console.log(e.toDate());
                setDate(e.toDate());
            }} />
          </div>
          <p className="mx-auto my-5">Time (UTC) Current System Time : {getTime()}</p>
          <TimeInput className="max-w-lg w-full p-3 text-center" onChange={e => {
            console.log(e.hour+":"+e.minute+":"+e.second);
            let hour = e.hour.toString().length == 1 ? "0"+e.hour.toString() : e.hour.toString();
            let minutes = e.minute.toString().length == 1 ? "0"+e.minute.toString() : e.minute.toString();
            let seconds = e.minute.toString().length == 1 ? "0"+e.minute.toString() : e.minute.toString();
            
            console.log(hour + ":" + minutes + ":" + seconds);
            let finalTime = hour + ":" + minutes + ":" + seconds;
            setTime(finalTime);
          }}/>
          <NextButton destRoute={'/ScheduledPosts'} data={{
            repeat:repeat,
            duration : option,
            date : date,
            time:time
          }}
          additionalFunction={() => {
            
          }}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default Publish;
