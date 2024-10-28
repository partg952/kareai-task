"use client";
import React, { useState } from "react";
import axios from "axios";
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
  const [facebookData, setFacebookData] = useState();
  const [image,setImage] = useState()
  useEffect(() => {
    console.log(value != undefined && value.finalData);
    value != undefined &&
      value.finalData.platform.map((platform) => {
        console.log(platform);
        axios.post("https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/generate_blog_images",{
          blog : value.finalData.blog,
          size : "1024x1024"
        }).then(res => {
          console.log(res.data);
          setImage("data:image/jpg;base64,"+res.data.b64_json)
        })
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
        destRoute={"/Platform/Selection"}
        styles={"absolute top-1 right-48 w-24 h-14 text-md  "}
        
      />
      {twitterData != undefined && linkedinData != undefined && image!=undefined ? (
        <>
          {value.finalData.platform.includes("twitter") && (
            <Twitter text={twitterData} image = {image} />
          )}
          {value.finalData.platform.includes("linkedin") && (
            <Linkedin text={linkedinData} image = {image} />
          )}
        </>
      ) : (
        <p>The posts are being created...</p>
      )}
    </div>
  );
}
