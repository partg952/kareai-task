"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalContent,
  ModalHeader,
  Button,
  Textarea,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useContext } from "react";
import Twitter from "../Twitter";
import Linkedin from "../Linkedin";
import NextButton from "@/app/components/NextButton";
import { Context } from "../../contextProvider";

export default function Final() {
  const value = useContext(Context);
  const [twitterData, setTwitterData] = useState();
  const [linkedinData, setLinkedinData] = useState();
  const [isLoading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [feedback, setFeedback] = useState("");
  const [facebookData, setFacebookData] = useState();
  const [twitterImage, setTwitterImage] = useState();
  const [linkedinImage, setLinkedinImage] = useState();
  useEffect(() => {
    console.log(value != undefined && value.finalData);
    value != undefined &&
      value.finalData.platform.map((platform) => {
        console.log(platform);
        axios
          .post(
            "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/generate_blog_images",
            {
              blog: value.finalData.blog,
              size: "7",
            }
          )
          .then((res) => {
            console.log(res.data);
            setTwitterImage("data:image/jpg;base64," + res.data.b64_json);
            setLinkedinImage("data:image/jpg;base64," + res.data.b64_json);
          });
        axios
          .post(
            `https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/${platform}_post`,
            { blog: value.finalData.blog }
          )
          .then((res) => {
            console.log(res.data);
            switch (platform) {
              case "twitter":
                setTwitterData(res.data);
              case "linkedin":
                setLinkedinData(res.data);
            }
          });
      });
  }, []);
  return (
    <div className="flex flex-wrap items-center justify-center *:m-5">
      <NextButton
        destRoute={"/Publish"}
        styles={"absolute top-2 right-48 w-24 h-14 text-md  "}
        data={{
          twitterImage: twitterImage,
          linkedinImage: linkedinImage,
          twitter_post: twitterData,
          linkedin_post: linkedinData,
        }}
      />
     
      
      {twitterData != undefined &&
      linkedinData != undefined ? (
        <>
          {value.finalData.platform.includes("twitter") && (
            <Twitter
              text={twitterData}
              image={twitterImage}
              setImage={setTwitterImage}
            />
          )}
          {value.finalData.platform.includes("linkedin") && (
            <Linkedin
              text={linkedinData}
              image={linkedinImage}
              setImage={setLinkedinImage}
            />
          )}
        </>
      ) : (
        <p>The posts are being created...</p>
      )}
    </div>
  );
}
