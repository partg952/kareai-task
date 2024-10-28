"use client";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import Twitter from "../Twitter";
import Linkedin from "../Linkedin";
import { Context } from "../../contextProvider";
export default function Final() {
  const value = useContext(Context);
  const [twitterData, setTwitterData] = useState();
  const [linkedinData, setLinkedinData] = useState();
  const [facebookData, setFacebookData] = useState();

  useEffect(() => {
    console.log(value != undefined && value.finalData);
    value != undefined &&
      value.finalData.platform.map((platform) => {
        console.log(platform);
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
    <div className="flex items-center justify-center *:m-5">
      {twitterData != undefined && linkedinData != undefined ? (
        <>
          {value.finalData.platform.includes("twitter") && (
            <Twitter text={twitterData} />
          )}
          {value.finalData.platform.includes("linkedin") && (
            <Linkedin text={linkedinData} />
          )}
        </>
      ) : (
        <p>The posts are being created...</p>
      )}
    </div>
  );
}
