"use client";
import React from "react";
import { Card, CardBody, Textarea, Switch, Button } from "@nextui-org/react";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Context } from "../contextProvider";
import StarterKit from "@tiptap/starter-kit";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { Router } from "next/router";
import axios from "axios";
import { FlashAutoTwoTone } from "@mui/icons-material";
import NextButton from "../components/NextButton";
function Review() {
  const [feedback, setFeedback] = useState("");
  const [isLoading,setLoading] = useState(false)
  const [blog, setBlog] = useState();
  const [on, setOn] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { progress, setProgress, finalData, addData } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    axios.post(
      "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/gen_blog",
      {
        index_name : finalData.company,
        company:finalData.company,
        product : finalData.product,
        campaign : finalData.objective,
        audience : finalData.targetAudience,
        topics : finalData.topics,
        tone : finalData.tone,
        limit:parseInt(finalData.contentLength)
      }
    ).then(res => {
      setBlog(res.data);
    });
  }, []);
  return (
    <div className="flex items-center justify-center">
      <NextButton destRoute={'/Platform'} styles={"absolute top-1 right-48 w-24 h-14 text-md  "} data={{
        blog:blog
      }}/>
      <Button variant="bordered" color="secondary" className = "absolute top-4 right-20 h-14 w-24 text-md z-50 bg-white  " onPress={onOpen}>Review</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader >
                Review and Regenerate your Blog
              </ModalHeader>
              <ModalBody>
                <Textarea
                  onChange={(e) => {
                    setFeedback(e.target.value);
                  }}
                  contentEditable={true}
                  value={feedback}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="bordered" isLoading = {isLoading} onPress={() => {
                  setLoading(true)
                  axios.post(
                    "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/rewrite_blog" , {
                      feedback : feedback,
                      blog : blog
                    }
                  ).then(response =>{
                    console.log(response.data); 
                    setBlog(response.data) 
                  }).finally(() => {
                    setLoading(false)
                    onClose()
                  });
                }}>
                  Regenerate
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {blog != undefined && (
        <MdEditor
          language="en-US"
          modelValue={blog}
          onChange={setBlog}
          style={{
            height: "80vh",
            width: "100vw",
          }}
        />
      )}
    </div>
  );
}

export default Review;
