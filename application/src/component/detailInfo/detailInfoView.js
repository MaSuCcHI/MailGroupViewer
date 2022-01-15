import styles from './detailInfoView.module.css'
import React, {useEffect,useState} from "react";

export default function DetailInfoViewer (
    props
) {

    if (props.showDetailInfo) {
        return (
            <div className={styles.detailInfoViewer}>
                detailInfo
            </div>
        )
    } else {
        return null
    }
}