import React from "react";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import { Context } from "../contextProvider";
import { useContext } from "react";
import Image from "next/image";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAlt";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CommentRoundedIcon from "@mui/icons-material/Comment";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import Demo from "../assets/demo.png";
function Linkedin({image,text}) {
  const value = useContext(Context);
  return (
    <div className="max-w-md h-fit ">
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex  justify-between *:m-1 my-2">
            <AccountBoxRoundedIcon
              style={{
                height: "40px",
                width: "40px",
              }}
            />
            <div>
              <h1 className="text-md my-2">
                <b>Username</b>
              </h1>
              <p className="text-xs">
                DescriptionLorem ipsum dolor sit amet, consectetur adipiscing
                elit.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="h-full max-h-24 text-xs text-ellipsis overflow-y-scroll">
            <p className="h-full overflow-hidden min-h-24">{text}</p>
          </div>
          <Image
            width={300}
            height={200}
            className="w-full max-h-24 my-1"
            src={Demo}
          />
        </CardBody>
        <CardFooter>
          <div className="flex items-center justify-between w-full * : flex">
            <div className="flex items-center justify-between text-xs *:m-1">
              <ThumbUpAltRoundedIcon />
              <p>Like</p>
            </div>
            <div className="flex items-center justify-between text-xs *:m-1">
              <CommentRoundedIcon />
              <p>Comment</p>
            </div>
            <div className="flex items-center justify-between text-xs *:m-1">
              <RepeatRoundedIcon />
              <p>Repost</p>
            </div>
            <div className="flex items-center justify-between text-xs *:m-1">
              <SendRoundedIcon />
              <p>Send</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Linkedin;
