import styles from './detailInfoView.module.css'
import React, {useEffect,useState} from "react";

function Info({
    groupAddress,
    mailGroups
}){

    return(
        <div>
            
        </div>
    )
}

export default function DetailInfoViewer ({
    showDetailInfo,
    setShowDetailInfo,
    mailGroups,
}){

    if (showDetailInfo !== "") {
        return (
            <div className={styles.detailInfoViewer}>
                DetailInfo:{showDetailInfo}
                Groups:
                <Info
                    groupAddress={showDetailInfo}
                    mailGroups={mailGroups}
                />
            </div>
        )
    } else {
        return null
    }

}
