'use client'
import React from "react";
import styles from "./header.module.scss";
import { Progress } from "@nextui-org/react";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import {Context} from '../../contextProvider';
const topics = [
  "Platform",
  "Company",
  "Campaign",
  "Content",
  "Review",
  "Publish",
];
function Header() {
  const {progress,setProgress} = useContext(Context);
  const pathname = usePathname();
  const focusedTopic = {
    translate : '0 -10px'
  }
  setProgress((100/topics.length)*(topics.indexOf(pathname.replace("/",""))+1))
  return (
    <div className={styles.headerWrapper}>
      <h1 className="text-3xl text-center my-8"><b>AI Social Media</b></h1>
      <div>
        <div className={styles.progressTopics}>
          {topics.map((topic, i) => (
            <div key={i} className={styles.topicItem} style={{
              translate:pathname.replace("/","") == topic && "0 -20px",
            }}>
              <p>{i + 1}</p>
              <h4>{topic}</h4>
              <hr style={{
                height:0.5,
                color:"red",
                borderColor:"red",
                backgroundColor:"red",
                transition:"all 300ms ease-in-out",
                transform : pathname.replace("/","") ? `scaleX(${100}%)` : `scaleX(${0})`
                
              }}/>
            </div>
          ))}
        </div>
      </div>
      <Progress aria-label="Loading..." value={progress} color="success" size="md"/>
    </div>
  );
}

export default Header;
