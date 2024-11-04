import React from "react";
import axios from "axios";
import { useState } from "react";
import Refresh from "../assets/refresh.png";
import CustomRefresh from "../assets/custom_refresh.png";
import { Button } from "@nextui-org/react";
import AddIcon from "../assets/add_circle.png";
import Image from "next/image";
import { useContext } from "react";
import { Context } from "../contextProvider";
export default function ImageActions({ setImage, feedback, blog }) {
  const [file, setFile] = useState();
  const actions = [
    {
      buttonName: "regenerate-image",
      buttonIcon: Refresh,
      buttonFunction: () => {
        axios
          .post(
            "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/generate_blog_images",
            { blog: blog }
          )
          .then(setImage("data:image/jpg;base64," + response.data.b64_json));
      },
    },
    {
      buttonName: "regenerate-image-custom",
      buttonIcon: CustomRefresh,
      buttonFunction: () => {
        axios
          .post(
            "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/generate_images_by_user",
            { feedback: feedback, size: "1024x1024" }
          )
          .then(setImage("data:image/jpg;base64," + response.data.b64_json));
      },
    },
    {
      buttonName: "select-image",
      buttonIcon: AddIcon,
      buttonFunction: () => {
        document.getElementById("file-picker").click();
        
      },
    },
  ];
  return (
    <div>
      <div className="flex w-full items-center justify-between sticky top-0">
        <input
          type="file"
          name=""
          onChange={e => {
            setFile(e.target.files[0]);
            setImage(e.target.files[0]);
          }}
          id="file-picker"
          style={{ display: "none" }}
        />
        {actions.map((button,i) => {
          return (
            <Button
              key = {i}
              variant="bordered"
              color="second"
              isIconOnly
              onPress={button.buttonFunction}
            >
              <Image src={button.buttonIcon} height={10} width={20} />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
