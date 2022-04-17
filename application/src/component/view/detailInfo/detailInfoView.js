import styles from './detailInfoView.module.css'
import React, {useEffect,useState} from "react";

import { Aod } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getChildrenUserMails } from '../../data_transform';

export default function DetailInfoViewer ({
    showDetailInfoMailGroups,
    setShowDetailInfoMailGroups,
    mailGroups,
}){
    const [showAllUserMails,setShowAllUserMails] = useState(false)

    function MailGroupInfo(props){
        const mailGroup = props.mailGroup
        const users = props.users
        const showUserNums = 2
        console.log(users)
        return(
            // <div>te sa t</div>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {mailGroup}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            userAddress
                        </Typography>
                        {users.map((user, index) => {
                            console.log(user)
                            if(index >= showUserNums && !showAllUserMails) {return}
                            return(
                            <Typography variant="body2">
                             {user}
                            </Typography>)
                        })}
                    </CardContent>
                    {users.length > showUserNums ? 
                    <CardActions>
                    <Button size='small' onClick={() => {setShowAllUserMails(!showAllUserMails)}}>
                       {showAllUserMails ? 'less' : 'all: ' + users.length + ' ユーザー' }
                    </Button>
                    </CardActions> : ""}
                </Card>
            
        )
    }

    const detailTarget = showDetailInfoMailGroups.split("/")
    console.log("test:"+detailTarget)
    if (detailTarget[0] !== "" && mailGroups.has(detailTarget[0])) {
        let users = []
        if( detailTarget[1]===undefined ){
            // メールグループノード
            users = Array.from(getChildrenUserMails(detailTarget[0],mailGroups,true))
        } else if ( detailTarget[1]==="users" ) {
            // ユーザーアドレスノード
            users = Array.from(getChildrenUserMails(detailTarget[0],mailGroups,false))
        }
        console.log(users)
        return (
            <div className={styles.detailInfoViewer}>
                <MailGroupInfo users={users} mailGroup={showDetailInfoMailGroups}/>
            </div>
        )
    } else {
        return null
    }

}
