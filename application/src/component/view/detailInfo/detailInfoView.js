import styles from './detailInfoView.module.css'
import React, {useEffect,useState} from "react";

import { Aod } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}


function GetChildrenUser(group,mailGroups,gatherGrandchild) {
    let users = new Set()
    console.log(mailGroups)
    console.log(group)
    const address = mailGroups.get(group)
    console.log(address)
    address.forEach(element => {
        console.log("test10")
        if(mailGroups.has(element)){
            // グループ 
            if(gatherGrandchild){
                users = union(users,GetChildrenUser(element,mailGroups,true))
            }
        } else {
            //　ユーザー
            users.add(element)
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

    const detailTarget = showDetailInfo.split("/")
    if (detailTarget[0] !== "" && mailGroups.has(detailTarget[0])) {
        if( detailTarget[1]===undefined ){
            // メールグループノード
            users = Array.from(GetChildrenUser(detailTarget[0],mailGroups,true))
        } else if ( detailTarget[1]==="users" ) {
            // ユーザーアドレスノード
            users = Array.from(GetChildrenUser(detailTarget[0],mailGroups,false))
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
