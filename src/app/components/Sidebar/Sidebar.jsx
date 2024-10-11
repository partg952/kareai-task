'use client'
import React from 'react'
import styles from './sidebar.module.scss';
const options = ['dashboard','documents','ai editor','ai writer','ai avatar','ai plagiarism','ai detector','ai social media','scheduled posts','ai image','chat settings','ai article wizard','ai photo studio','ai file chat','ai vision','seo tool']
import {useRouter } from 'next/navigation'
function Sidebar() {
  const router = useRouter();
  return (
    <div className={styles.sidebarWrapper}>
        {
            options.map((item,i) => (
                <div onClick={() => {
                  item=='ai social media' && router.push("/Platform");
                }} key={i} className={styles.sidebarOptions}>
                    <p>{item}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Sidebar