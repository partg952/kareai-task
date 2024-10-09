import React from 'react'
import styles from './sidebar.module.scss';
const options = ['dashboard','documents','ai editor','ai writer','ai avatar','ai plagiarism','ai detector','ai social media','scheduled posts','ai image','chat settings','ai article wizard','ai photo studio','ai file chat','ai vision','seo tool']

function Sidebar() {
  return (
    <div className={styles.sidebarWrapper}>
        {
            options.map(item => (
                <div className={styles.sidebarOptions}>
                    <p>{item}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Sidebar