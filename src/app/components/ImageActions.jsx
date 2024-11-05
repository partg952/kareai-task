import React from "react";
import axios from "axios";
import { useState } from "react";
import Refresh from "../assets/refresh.png";
import CustomRefresh from "../assets/custom_refresh.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "@nextui-org/react";
import AddIcon from "../assets/add_circle.png";
import Image from "next/image";
import { useContext } from "react";
import { Context } from "../contextProvider";
export default function ImageActions({ setImage, blog }) {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const value = useContext(Context);
  const [feedback, setFeedback] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const actions = [
    {
      buttonName: "regenerate-image",
      buttonIcon: Refresh,
      buttonFunction: () => {
        axios
          .post(
            "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/generate_blog_images",
            { blog: value.finalData.blog, size: "1024x1024" }
          )
          .then((response) =>
            setImage("data:image/jpg;base64," + response.data.b64_json)
          );
      },
    },
    {
      buttonName: "regenerate-image-custom",
      buttonIcon: CustomRefresh,
      buttonFunction: () => {
        onOpen();
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
      <ToastContainer/>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Regenerate Custom Image
              </ModalHeader>
              <ModalBody>
                <Textarea maxRows={4} onValueChange={setFeedback} />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  variant="bordered"
                  isLoading={loading}
                  onPress={() => {
                    if (feedback.length != 0) {
                      setLoading(true);
                      axios
                        .post(
                          "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/generate_images_by_user",
                          { prompt: feedback, size: "1024x1024" }
                        )
                        .then((response) => {
                          setImage(
                            "data:image/jpg;base64," + response.data.b64_json
                          );
                          setLoading(false);
                          onClose();
                        });
                    }
                    else {
                      toast("Please Enter a Prompt to Generate The Image")
                    }
                  }}
                >
                  Generate
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex w-full items-center justify-between sticky top-0 my-2">
        <input
          type="file"
          name=""
          onChange={(e) => {
            setFile(e.target.files[0]);
            var fileReader = new FileReader();
            fileReader.onload = () => {
              setImage(fileReader.result);
            }
            fileReader.readAsDataURL(e.target.files[0]);
            
          }}
          id="file-picker"
          style={{ display: "none" }}
        />
        {actions.map((button) => {
          return (
            <Button
              variant="bordered"
              color="second"
              key={button.buttonName}
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
