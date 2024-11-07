import React from "react";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import { Context } from "../contextProvider";
import { useContext } from "react";
import Image from "next/image";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAlt";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CommentRoundedIcon from "@mui/icons-material/Comment";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ImageActions from "../components/ImageActions";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import Demo from "../assets/demo.png";
function Linkedin({ image, text, setImage }) {
  const value = useContext(Context);
  return (
    <div className="max-w-md ">
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="w-full flex items-center justify-center bg-linkedin-blue p-2 rounded-xl "><LinkedInIcon style={{fontSize:"30px",color:"white"}}/></div>
        </CardHeader>
        <CardBody>
          <div className="flex  justify-start *:m-1 my-1 mx-3">
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
              
            </div>
          </div>
          <div className="h-full max-h-14 text-xs text-ellipsis overflow-y-auto">
            <p className="h-full overflow-hidden">{text}</p>
          </div>
          <ImageActions setImage={setImage} />
          <div className="max-h-56 overflow-y-auto">
            {image != undefined ? (
              <Image
                src={image}
                height={200}
                width={200}
                className="w-full  my-2"
              />
            ) : (
              <div className="h-52">
                <p>Loading...</p>
              </div>
            )}
          </div>
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
