"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Context } from "../contextProvider";
function NextButton({ destRoute, data, additionalFunction,styles }) {
  const [isLoading, setLoading] = useState(false);
  const value = useContext(Context);
  const router = useRouter();
  data != undefined && console.log("the data sent by the section : ", data);
  console.log("data in the ultimate obj : ", value.finalData);
  return (
    <div>
      <Button
        
        isLoading={isLoading}
        className={`bg-purple-400 text-white w-full color-white my-3 ${styles}`}
        onPress={() => {
          value.addData({ ...value.finalData, ...data });
          setLoading(true);
          if (additionalFunction != undefined) {
            additionalFunction()
              .then(() => {
                setLoading(false);
                router.push(destRoute);
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          } else {
            setLoading(false);
            router.push(destRoute);
          }
        }}
      >
        Next
      </Button>
    </div>
  );
}

export default NextButton;
