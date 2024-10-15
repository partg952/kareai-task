"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import DropdownComp from "../components/DropdownComp";
import CloseIcon from "@mui/icons-material/Close";
import NextButton from "../components/NextButton";
function Company() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [company, setCompany] = useState();
  const [product, setProduct] = useState();
  const [items, selectedItems] = useState([]);
  console.log(items);
  const obj = {
    company: company,
    product: product,
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-sm md:max-w-lg p-2 flex flex-col justify-center items-center">
        <CardBody>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex items-center justify-center flex-col gap-1">
                    Modal Title
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      type="text"
                      variant="bordered"
                      placeholder="Enter the company name..."
                      color="secondary"
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          e.target.value.length != 0 &&
                          !items.includes(e.target.value)
                        ) {
                          console.log(e);
                          selectedItems([...items, e.target.value]);
                          e.target.value = "";
                        }
                      }}
                    />
                    <div className="flex flex-wrap bg-slate-300 p-3 rounded-2xl max-h-40 overflow-y-scroll">
                      {items.map((item, i) => (
                        <Card
                          key={i}
                          className="flex items-center justify-center  border-2 border-solid border-purple-400 rounded-xl m-0.5 h-12 overflow-hidden "
                        >
                          <CardBody className="flex items-center justify-center flex-row overflow-hidden">
                            <p className="text-sm">{item}</p>
                            <Button
                              onPress={() => {
                                const temp = items.filter((x) => x != item);
                                console.log(temp);
                                selectedItems(temp);
                              }}
                              isIconOnly
                              variant="outlined"
                              className="w-1"
                            >
                              <CloseIcon
                                style={{
                                  height: "20px",
                                  width: "20px",
                                }}
                              />
                            </Button>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" variant="light" onPress={onClose}>
                      Done
                    </Button>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <div className="flex justify-between items-center">
            <h3 className="text-xl md:text-3xl">
              <b>Company Info</b>
            </h3>
            <Button
              onPress={onOpen}
              className="bg-purple-400 p-3 rounded-3xl text-white "
            >
              BrandCenter
            </Button>
          </div>
          <p className="my-3">
            Start by Selecting a company or create a new one at BrandCenter in a
            few clicks
          </p>
          <DropdownComp
            title={"Select a Company"}
            modalTitle={"Select a Company"}
            setData={setCompany}
            data={company}
            dropdownOptions={["MagicAI", "Rockstar Games"]}
            modalOptions={["MagicAI", "Rockstar Games"]}
          />
          <DropdownComp
            title={"Select a Product"}
            modalTitle={"Select a Product"}
            setData={setProduct}
            data={product}
            dropdownOptions={["Gta 6"]}
            modalOptions={["Gta 6"]}
          />
          <NextButton destRoute={"/Campaign"} data={obj} />
        </CardBody>
      </Card>
    </div>
  );
}

export default Company;
