"use client";
import React, { useState, useRef } from "react";
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
  Tabs,
  Tab,
} from "@nextui-org/react";
import DropdownComp from "../components/DropdownComp";
import SelectOptions from "../components/SelectOptions";
import NextButton from "../components/NextButton";
import axios from "axios";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Reem_Kufi } from "next/font/google";
function Company() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [company, setCompany] = useState("Select a Company");
  const [product, setProduct] = useState("Select a Product");
  const [companies, setCompanies] = useState([]);
  const filePicker = useRef();
  const [products, setProducts] = useState([]);
  console.log(products);
  const [urls, setUrls] = useState([]);
  const [file, setFile] = useState();
  console.log(file);
  const [fileName, setFileName] = useState("");
  const obj = {
    company: company,
    product: product,
    file: file,
    url: urls.length > 0 ? urls : undefined,
  };

  function convertToBase64(file) {
    const fileReader = new FileReader();
    var base64;
    fileReader.onloadend = (e) => {
      base64 = e.target.result;
      setFile(base64.replace("data:application/pdf;base64,", ""));
    };
    fileReader.readAsDataURL(file);
  }

  function sendCreateVectorRequest() {
    return new Promise((res, rej) => {
      axios
        .post(
          "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/create_vector",
          {
            base64_string: obj.file,
            index_name: obj.company,
            user_email: "koustav@kareai.io",
          }
        )
        .then((response) => {
          console.log(response);
          res("The request is sucessfull!");
        })
        .catch((err) => {
          console.log(err);
          rej("An Error Occured : ", err);
        });
    });
  }
  function sendCreateVectorUrlRequest() {
    return new Promise((res, rej) => {
      const allRequests = urls.map(url => axios
        .post(
          "https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/create_vector_url",
          {
            url: url,
            index_name: obj.company,
            user_email: "koustav@kareai.io",
          }
        ));
      
        Promise.all(allRequests).then((response) => {
          console.log(response);
          res("The request is sucessfull!");
        })
        .catch((err) => {
          console.log(err);
          rej("An Error Occured : ", err);
        });
    });
  }

  return (
    <div className="flex justify-center items-center *:text-xs">
      <Card className="w-full max-w-sm md:max-w-md p-2 flex flex-col justify-center items-center * : text-sm">
        <CardBody>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex items-center justify-center flex-col gap-1">
                    Select Products and Companies
                  </ModalHeader>
                  <ModalBody>
                    <Tabs color="secondary" className="justify-center">
                      <Tab title="Company and Product">
                        <SelectOptions
                          items={companies}
                          selectedItems={setCompanies}
                          placeholder="Enter the company name"
                          maxOptions={1}
                        />
                        <SelectOptions
                          items={products}
                          selectedItems={setProducts}
                          placeholder="Enter the product names"
                        />
                      </Tab>
                      <Tab title="Past Blogs and URL's">
                        <SelectOptions
                          items={urls}
                          selectedItems={setUrls}
                          placeholder={"Enter the URls"}
                          maxOptions={file != undefined ? 0 : undefined}
                        />
                        <h1 className="text-center text-lg">Or</h1>
                        <div className="my-3">
                          <input
                            type="file"
                            ref={filePicker}
                            disabled={urls.length >= 1}
                            accept="application/pdf"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              setFileName(e.target.files[0].name);
                              convertToBase64(e.target.files[0]);
                            }}
                          />
                          <div
                            className="h-40 bg-slate-300 rounded-xl flex items-center justify-center"
                            onClick={() => {
                              filePicker.current.click();
                            }}
                          >
                            <div
                              className={`flex flex-col items-center justify-center ${
                                urls.length > 0 && "text-slate-500"
                              }`}
                            >
                              {file == undefined ? (
                                <>
                                  <UploadFileIcon
                                    style={{
                                      height: "80px",
                                      width: "80px",
                                      marginLeft: "auto",
                                      marginRight: "auto",
                                    }}
                                  />
                                  <h2 className="text-sm">
                                    <b>Click to upload a file.</b>
                                  </h2>{" "}
                                </>
                              ) : (
                                <>
                                  <h1 className="text-center">{fileName}</h1>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="secondary"
                      variant="bordered"
                      onPress={onClose}
                    >
                      Done
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <div className="flex justify-between items-center">
            <h3 className="text-xl md:text-2xl">
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
            selectableOptions={companies}
            isAddable={false}
          />
          <DropdownComp
            title={"Select a Product"}
            modalTitle={"Select a Product"}
            setData={setProduct}
            data={product}
            selectableOptions={products}
            isAddable={true}
          />
          <NextButton
            destRoute={"/Campaign"}
            data={obj}
            additionalFunction={!(urls.length > 0)  ? sendCreateVectorRequest : sendCreateVectorUrlRequest}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default Company;
