"use client";
import React, { useState } from "react";
import {Card,CardBody,Button} from '@nextui-org/react';
import { Context } from "../contextProvider";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import DropdownComp from "../components/DropdownComp";
import NextButton from "../components/NextButton";
function Company() {
  const { progress, setProgress } = useContext(Context);
  const [company,setCompany] = useState();
  const [product,setProduct] = useState();

  const obj = {
    "company" : company,
    "product" : product
  };

  const router = useRouter();
  return (
    <div  className="flex justify-center items-center">
      <Card className="w-full max-w-lg p-2 flex flex-col justify-center items-center">
        <CardBody>
          <div className="flex justify-between items-center">
            <h3 className="text-3xl"><b>Company Info</b></h3>
            <p className="bg-purple-400 p-3 rounded-3xl text-white ">
              BrandCenter
            </p>
          </div>
          <p className="my-3">
            Start by Selecting a company or create a new one at BrandCenter in a
            few clicks
          </p>
          <DropdownComp title={"Select a Company"} modalTitle={"Select a Company"} setData={setCompany} data={company}  dropdownOptions={['MagicAI','Rockstar Games']} modalOptions={['MagicAI','Rockstar Games']}/>
          <DropdownComp title={'Select a Product'} modalTitle={'Select a Product'} setData={setProduct} data={product} dropdownOptions={['Gta 6']} modalOptions={['Gta 6']}/>
          <NextButton destRoute={'/Campaign'} data={obj}/>
        </CardBody>
      </Card>
    </div>
  );
}

export default Company;
