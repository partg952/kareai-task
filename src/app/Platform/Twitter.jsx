import React from "react";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import Bookmark from "../assets/bookmark.svg";
import Comment from "../assets/comment.svg";
import Like from "../assets/like.svg";
import Retweet from "../assets/retweet.svg";
import Share from "../assets/share.svg";
import Analytics from "../assets/analytics.svg";
import XIcon from "@mui/icons-material/X";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import Demo from "../assets/demo.png";
import ImageActions from "../components/ImageActions";
import Image from "next/image";
export default function Twitter({ text, image, setImage }) {
  const iconsStyle = {
    height: "20px",
    width: "20px",
  };
  return (
    <div className="max-w-md">
      <Card className="overflow-hidden">
        <CardHeader className="flex-col">
          <div className="m-2 bg-black w-full flex items-center justify-center rounded-xl p-3 ">
            <XIcon style={{ color: "white" }} />
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex justify-start mx-3 my-1">
            <AccountBoxRoundedIcon
              style={{
                height: "30px",
                width: "30px",
              }}
            />
            <div className="flex *:m-1">
              <p className="text-md">Username</p>
              <p className="text-slate-300">@username</p>
            </div>
          </div>
          <p className="text-xs max-h-20 min-h-20 overflow-y-auto">{text}</p>
          <ImageActions setImage={setImage} />
          <div className="max-h-52 overflow-y-auto">
            {image != undefined ? (
              <Image
                src={image}
                height={200}
                width={200}
                className="w-full rounded-xl my-2"
              />
            ) : (
              <div className="h-52">
                <p>Loading...</p>
              </div>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <div className="flex w-full items-center justify-between">
            <Comment style={iconsStyle} />
            <Retweet style={iconsStyle} />
            <Like style={iconsStyle} />
            <Analytics style={iconsStyle} />
            <div className="flex *:m-1">
              <Bookmark style={iconsStyle} />
              <Share style={iconsStyle} />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
