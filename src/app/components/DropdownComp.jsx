import React from "react";
import {
  Card,
  CardBody,
  Button,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Dropdown,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import SelectOptions from "./SelectOptions";
import { usePathname } from "next/navigation";
import Image from "next/image";
import StartImage from "../assets/star.png";
import { useState, useEffect } from "react";
function DropdownComp({
  title,
  modalTitle,
  selectableOptions,
  setData,
  data,
  isAddable,
  thinking,
  additionalThinkingFunction,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isThinking, setThinking] = useState(false);
  const [option, selectedOption] = useState(data);
  const pathname = usePathname();
  const [options, addOptions] = useState([...selectableOptions]);
  useEffect(() => {
    addOptions([...selectableOptions]);
  }, [selectableOptions]);
  useEffect(() => {
    console.log(data);
    selectedOption(data);
    !options.includes(data) && addOptions([...options, data]);
  }, [data]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <p>{title}</p>
        {isAddable && (
          <Button variant="light" className="" onPress={onOpen}>
            Add new+
          </Button>
        )}
        {thinking && (
          <Button
            isIconOnly
            variant="light"
            isLoading={isThinking}
            onPress={() => {
              setThinking(true);
              additionalThinkingFunction().finally(() => {
                setThinking(false);
              });
            }}
          >
            <Image height={30} src={StartImage} />
          </Button>
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalTitle}
              </ModalHeader>
              <ModalBody>
                <SelectOptions
                  items={options}
                  selectedItems={addOptions}
                  placeholder={"Enter the products..."}
                />
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
      <Dropdown>
        <DropdownTrigger>
          {!(pathname == "/Campaign") ? (
            <Button
              variant="bordered"
              className="max-w-lg w-full"
            >
              {option}
            </Button>
          ) : (
            <h1
              variant="bordered"
              className="max-w-lg w-full cursor-pointer border-2 border-solid border-slate-300 p-3 rounded-xl my-3"
            >
              {option}
            </h1>
          )}
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" className="w-full max-w-lg">
          {options != undefined &&
            options.map((item, i) => (
              <DropdownItem
                key={i}
                onPress={() => {
                  selectedOption(item);
                  setData(item);
                }}
              >
                {item}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default DropdownComp;
