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
import {useState} from 'react';
function DropdownComp({title,modalTitle,modalOptions,dropdownOptions}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [option,selectedOption] = useState(title)
  return (
    <div>
      <div className="flex justify-between items-center">
        <p>{title}</p>
        <Button variant="light" className="my-3" onPress={onOpen}>
          Add new+
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalTitle}
              </ModalHeader>
              <ModalBody>
                {
                  modalOptions.map(item => (
                    <Button>{item}</Button>
                  ))
                }
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="bordered"
                  className="rounded-3xl float-start"
                  onPress={onClose}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="max-w-lg w-full">{option}</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" className="w-full max-w-lg">
          {
            dropdownOptions.map(item => 
            (
              <DropdownItem onPress={() => {
                selectedOption(item);
              }}>{item}</DropdownItem>
            )
            )
          }
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default DropdownComp;
