import styles from './detailInfoView.module.css'
import React, {useEffect,useState} from "react";

import { Aod } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


function GetChildrenUser(group,mailGroups) {
    let users = []
    console.log(mailGroups)
    console.log(group)
    const address = mailGroups.get(group).children
    console.log(address)
    address.forEach(element => {
        console.log("test10")
        if(mailGroups.has(element)){
            // グループ
            users.push(GetChildrenUser(element,mailGroups))
        } else {
            //　ユーザー
            users.push(element)
        }
    });
    return users
}

export default function DetailInfoViewer ({
    showDetailInfo,
    setShowDetailInfo,
    mailGroups,
}){

    let users = []

    
    function Info(){
        return(
            // <div>te sa t</div>
                <Card>
                    <CardContent>
                            {users.join('\n')}
                    </CardContent>
                </Card>
            
        )
    }


    if (showDetailInfo !== "") {

        if(mailGroups.has(showDetailInfo)){
            users = GetChildrenUser(showDetailInfo,mailGroups)
            console.log("test2")
        }

        return (
            <div className={styles.detailInfoViewer}>
                <Info/>
            </div>
        )
    } else {
        return null
    }

}
