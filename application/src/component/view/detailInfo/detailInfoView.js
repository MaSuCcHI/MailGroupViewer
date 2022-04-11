import styles from './detailInfoView.module.css'
import React, {useEffect,useState} from "react";

import { Aod } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { getChildrenUserMails } from '../../data_transform';

export default function DetailInfoViewer ({
    showDetailInfo,
    setShowDetailInfo,
    mailGroups,
}){

    let users = []

    
    function Info(){
        console.log(users.join('\n'))
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
            users = Array.from(getChildrenUserMails(detailTarget[0],mailGroups,true))
        } else if ( detailTarget[1]==="users" ) {
            // ユーザーアドレスノード
            users = Array.from(getChildrenUserMails(detailTarget[0],mailGroups,false))
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
