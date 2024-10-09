'use client'
import React from "react";
import styles from "./header.module.scss";
import { Progress } from "@nextui-org/react";
const topics = [
  "Platform",
  "Company",
  "Campaign",
  "Content",
  "Review",
  "Publish",
];
function Header() {
  return (
    <div className={styles.headerWrapper}>
      <h1>AI Social Media</h1>
      <div>
        <div className={styles.progressTopics}>
          {topics.map((topic, i) => (
            <div className={styles.topicItem}>
              <p>{i + 1}</p>
              <h4>{topic}</h4>
            </div>
          ))}
        </div>
      </div>
      <Progress aria-label="Loading..." value={60} color="success" size="lg"/>
    </div>
  );
}

export default Header;
