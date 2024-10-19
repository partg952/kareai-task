import React from "react";
import {Input,Card,CardBody,Button} from '@nextui-org/react';
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
function SelectOptions({items,selectedItems,placeholder,maxOptions}) {
  const [inputValue,setInputValue] = useState("");
  return (
    <div className="my-4">
      <Input
        type="text"
        variant="bordered"
        value = {inputValue}
        onChange={e => {
            setInputValue(e.target.value);
        }}
        placeholder={placeholder}
        color="secondary"
        disabled = {maxOptions!=undefined ? items.length >= maxOptions : false}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            e.target.value.length != 0 &&
            !items.includes(e.target.value)
          ) {
            console.log(e);
            selectedItems([...items, e.target.value]);
            setInputValue("");
          }
        }}
      />
      <div className="flex flex-wrap bg-slate-300 p-3 rounded-2xl max-h-40 min-h-40 overflow-y-scroll m-1 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-slate-300 [&::-webkit-scrollbar-thumb]:bg-gray-300   ">
        {items.map((item, i) => (
          <Card
            key={i}
            className="flex items-center justify-center cursor-pointer  border-2 border-solid border-purple-400 rounded-xl m-0.5 h-12 overflow-hidden [&:hover]:scale-105 transition ease-in-out duration-300"
          >
            <CardBody className="flex items-center justify-center flex-row overflow-hidden">
              <p className="text-sm text-ellipsis">{item}</p>
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
    </div>
  );
}

export default SelectOptions;
