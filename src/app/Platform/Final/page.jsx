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
  Textarea
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
  const [isLoading,setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [feedback,setFeedback] = useState("");
  const [facebookData, setFacebookData] = useState();
  const [image, setImage] = useState();
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
              size: "1024x1024",
            }
          )
          .then((res) => {
            console.log(res.data);
            setImage("data:image/jpg;base64," + res.data.b64_json);
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
        data = {{
          image : image,
          twitter_post : twitterData,
          linkedin_post : linkedinData
        }}
      />
      <Button
        variant="bordered"
        color="secondary"
        className="absolute top-0.5 right-8 h-14 w-30 text-md z-50 bg-white  "
        onPress={onOpen}
      >
        Regen Image
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Review and Regenerate Image</ModalHeader>
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
                <Button
                  color="secondary"
                  variant="bordered"
                  isLoading={isLoading}
                  onPress={() => {
                    setLoading(true);
                    axios
                      .post(
                        "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/generate_images_by_user",
                        {
                          prompt: feedback,
                          size: "1024x1024",
                        }
                      )
                      .then((response) => {
                        console.log(response.data);
                        setImage("data:image/jpg;base64," + response.data.b64_json);
                      })
                      .finally(() => {
                        setLoading(false);
                        onClose();
                      });
                  }}
                >
                  Regenerate
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {twitterData != undefined &&
      linkedinData != undefined &&
      image != undefined ? (
        <>
          {value.finalData.platform.includes("twitter") && (
            <Twitter text={twitterData} image={image} setImage={setImage}/>
          )}
          {value.finalData.platform.includes("linkedin") && (
            <Linkedin text={linkedinData} image={image} />
          )}
        </>
      ) : (
        <p>The posts are being created...</p>
      )}
    </div>
  );
}
