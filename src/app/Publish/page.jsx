"use client";
import React from "react";
import {Card,CardBody,Switch,Dropdown,DropdownItem,DropdownTrigger,DropdownMenu,Button,Calendar,Modal,ModalHeader,ModalFooter,ModalContent,ModalBody,useDisclosure,TimeInput,} from "@nextui-org/react";
import NextButton from "../components/NextButton";
import { useState } from "react";
import { useEffect } from "react";
import { ContactSupportOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { Context } from "../contextProvider";
import axios from "axios";
function Publish() {
  const [repeat, setRepeat] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const value = useContext(Context);
  const getTime = () => {
    return new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  };

  useEffect(() => {
    axios
      .post(
        "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/linkedin_post",
        {
          blog: value.finalData.blog,
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  }, []);
  const [option, setOption] = useState("Every day");
  return (
    <div className="flex items-center justify-center *:my-5">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select a Date
              </ModalHeader>
              <ModalBody>
                <div className="w-full flex items-center justify-center ">
                  <Calendar
                    className="text-xs mx-auto"
                    onChange={(e) => {
                      console.log(e.toDate());
                      setDate(e.toDate());
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="bordered"
                  color="secondary"
                  className="rounded-3xl float-start"
                  onPress={onClose}
                >
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Card className="w-full max-w-sm md:max-w-md flex flex-col justify-center items-center p-1">
        <CardBody>
          <h3 className="my-5 text-xl md:text-xl">
            <b>When to Publish</b>
          </h3>
          <p className="text-sm">
            Choose date and time to publish your poet.You can change your
            timezone in the profile settings
          </p>
         
          <div className="w-full flex items-center justify-center">
            <Button
              color="secondary"
              className="size-2 w-full text-sm my-5"
              onPress={onOpen}
              
            >
              {date!=undefined ? date.toString() : "Add Date"}
            </Button>
          </div>
          <p className="mx-auto my-5 text-sm">
            Time (UTC) Current System Time : {getTime()}
          </p>
          <TimeInput
            className="max-w-lg w-full p-3 text-center"
            onChange={(e) => {
              console.log(e.hour + ":" + e.minute + ":" + e.second);
              let hour =
                e.hour.toString().length == 1
                  ? "0" + e.hour.toString()
                  : e.hour.toString();
              let minutes =
                e.minute.toString().length == 1
                  ? "0" + e.minute.toString()
                  : e.minute.toString();
              let seconds =
                e.minute.toString().length == 1
                  ? "0" + e.minute.toString()
                  : e.minute.toString();

              console.log(hour + ":" + minutes + ":" + seconds);
              let finalTime = hour + ":" + minutes + ":" + seconds;
              setTime(finalTime);
            }}
          />
          <NextButton
            destRoute={"/ScheduledPosts"}
            data={{
              repeat: repeat,
              duration: option,
              date: date,
              time: time,
            }}
            additionalFunction={() => {
              const all_db_paths = [
               {
                path : "add_company",
                body : {
                  user_email : "koustav@kareai.io",
                  company_name : value.finalData.company
                }
               },
               {
                path : "add_product",
                body : {
                  user_email : "koustav@kareai.io",
                  product_name : value.finalData.product
                }
               },
               {
                path : "add_campaign",
                body : {
                  user_email : "koustav@kareai.io",
                  product_name : value.finalData.product,
                  campaign : value.finalData.objective
                }
               },
               {
                path : "add_blog",
                body : {
                  user_email : "koustav@kareai.io",
                  company : value.finalData.company,
                  product : value.finalData.product,
                  campaign : value.finalData.objective,
                  topics :value.finalData.topics,
                  audience : value.finalData.targetAudience,
                  content : value.finalData.blog
                }
               },
               {
                path : "add_post",
                body : {
                  user_email : "koustav@kareai.io",
                  
                } 
               }
              ];
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default Publish;
