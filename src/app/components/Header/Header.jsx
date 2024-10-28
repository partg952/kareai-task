"use client";
import React from "react";
import styles from "./header.module.scss";
import { useRouter } from "next/navigation";
import { Progress } from "@nextui-org/react";
import { useContext,useState,useEffect } from "react";
import { usePathname } from "next/navigation";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Context } from "../../contextProvider";
const topics = [
  "Company",
  "Campaign",
  "Content",
  "Review",
  "Platform",
  "Publish",
];
function Header() {
  const { progress, setProgress } = useContext(Context);
  const pathname = usePathname();
  const router = useRouter();
  const [width,setWidth] = useState();
  const focusedTopic = {
    translate: "0 -10px",
  };
  setProgress(
    pathname != '/Platform/Selection' && pathname!='/Platform/Final' ? (100 / topics.length) * (topics.indexOf(pathname.replace("/", "")) + 1) : 5*16.66
  );
  useEffect(() => {
    setWidth(window.innerWidth);
  },[])
  return (
    <div className={styles.headerWrapper}>
      <h1 className="text-2xl text-center my-6">
        <b>AI Social Media</b>
      </h1>
      <div>
        {width >= 1050 ? (
          <div className={styles.progressTopics}>
            {topics.map((topic, i) => (
              <div
                onClick={() => {
                  router.push(`/${topic}`)
                }}
                key={i}
                className={styles.topicItem}
                style={{
                  translate: pathname.replace("/", "") == topic && "0 -20px",
                  border : pathname.replace("/","") == topic && "2px solid purple-400",
                  borderRadius : "20px"
                }}
              >
                <p>{i + 1}</p>
                <h4>{topic}</h4>
                <ArrowForwardIosIcon style = {{
                  height:"10px",
                  width:"10px"
                }}/>
                <hr
                  style={{
                    height: 0.5,
                    color: "red",
                    borderColor: "red",
                    backgroundColor: "red",
                    transition: "all 300ms ease-in-out",
                    transform: pathname.replace("/", "")
                      ? `scaleX(${100}%)`
                      : `scaleX(${0})`,
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.progressTopics}>
            <div
              className={styles.topicItem}
              style={{
                width: "100%",
              }}
            >
              <p>{topics.indexOf(pathname.replace("/", "")) + 1}</p>
              <h4 style={{
                fontSize:"20px"
              }}>{pathname.replace("/", "")}</h4>
            </div>
          </div>
        )}
      </div>
      <Progress
        aria-label="Loading..."
        value={progress}
        color="success"
        size="sm"
      />
    </div>
  );
}

export default Header;
