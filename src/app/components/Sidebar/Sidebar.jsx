"use client";
import React, { useState } from "react";
import styles from "./sidebar.module.scss";
const options = [
  "dashboard",
  "documents",
  "ai editor",
  "ai writer",
  "ai avatar",
  "ai plagiarism",
  "ai detector",
  "ai social media",
  "scheduled posts",
  "ai image",
  "chat settings",
  "ai article wizard",
  "ai photo studio",
  "ai file chat",
  "ai vision",
  "seo tool",
];
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {useRef,useEffect} from 'react';
function Sidebar() {
  const sideBarRef = useRef();
  const router = useRouter();
  const [position,setPosition] = useState("-300px")
  useEffect(() => {
    document.getElementById("sidebar-wrapper").style.translate = '-300px';
  },[])
  return (
    <div style={{
      overflowY:"scroll"
    }}>
      <Button className="absolute m-8" isIconOnly variant="light" onPress={() => {
        setPosition("0")
      }}><MenuIcon/></Button>
      <div ref={sideBarRef} id='sidebar-wrapper' style={{
        translate : position
      }} className={styles.sidebarWrapper}>
        <Button variant="light" isIconOnly className="my-1 mx-3 absolute right-0" onPress={() => {
          setPosition("-300px")
        }}><CloseIcon/></Button>
        {options.map((item, i) => (
          <div
            onClick={() => {
              item == "ai social media" && router.push("/Platform");
            }}
            key={i}
            className={styles.sidebarOptions}
          >
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
