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
  setProgress((100/topics.length)*(topics.indexOf(pathname.replace("/",""))+1))
  return (
    <div className={styles.headerWrapper}>
      <h1 className="text-3xl m-4"><b>AI Social Media</b></h1>
      <div>
        <div className={styles.progressTopics}>
          {topics.map((topic, i) => (
            <div key={i} className={styles.topicItem}>
              <p>{i + 1}</p>
              <h4>{topic}</h4>
            </div>
          ))}
        </div>
      </div>
      <Progress aria-label="Loading..." value={progress} color="success" size="md"/>
    </div>
  );
}

export default Header;
