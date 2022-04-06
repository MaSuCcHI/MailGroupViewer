import styles from "./authGoogleModal.module.css"
import { mailGroup, mailGroups } from "../../node/interface.ts"

import React, {useCallback, useEffect, useState} from 'react'
import Modal from "react-modal";
import Papa from "papaparse"
import { Button } from "@mui/material";
import { Close, CloudUploadOutlined } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios';

const ClientID = process.env.REACT_APP_CLIENT_ID
const SPREAD_SHEET_ID = process.env.REACT_APP_SPREAD_SHEET_ID
const SHEET_NAME = process.env.REACT_APP_SHEET_NAME
let tmpMailGroups = new Map()

export default function AuthGoogleModal({
    showImportDataFromSpleadsheet,
    setShowImportDataFromSpleadsheet,
    mailGroups,
    setMailGroups,
}) {
    Modal.setAppElement(document.getElementById('root'))
    const [accessToken, setAccessToken] = React.useState("")
    
    const onSuccess = (res) => {
        if ('accessToken' in res) {
          console.log(res.accessToken);
          setAccessToken(res.accessToken);
        }
    };
    const onFailure = (res: any) => {
        alert(JSON.stringify(res));
    };
    
    const getSpreadsheetValues = async () => {
        const BaseURL = 'https://sheets.googleapis.com/v4/spreadsheets/'
        const result = await axios.get(`${BaseURL}${SPREAD_SHEET_ID}`+`/values/${SHEET_NAME}`,{
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        console.log(result.data.values)

        let tmpMailGroups = new Map()

        result.data.values.forEach((elem, index) => {
            if(index===0) { return } 
            let group = elem[0]
            let user = elem[1]
            if (!tmpMailGroups.has(group)) {
                let parents = new Array()
                let children = new Array()
                tmpMailGroups.set(group,{"parents":parents,"children":children})
            }
            let children = tmpMailGroups.get(group).children
            children.push(user)
        })

        tmpMailGroups.forEach((value,key,m)=>{
            const children = value["children"]
            // parentの情報をたどり追加する処理
            children.forEach(value => {
                if(tmpMailGroups.has(value)){
                //メールグループ
                    let tmp = tmpMailGroups.get(value)
                    tmp.parents.push(key)
                }else{
                //ユーザーメール

                }
                
            })
        })
        setMailGroups(tmpMailGroups) 
        return tmpMailGroups
    };

    return(
        <Modal isOpen={showImportDataFromSpleadsheet}>
            
                <div className={styles.body}>
                    <div className={styles.modal}>
                        {accessToken === '' ? (
                        <GoogleLogin
                            clientId={ClientID}    
                            buttonText="Login"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            scope='https://www.googleapis.com/auth/spreadsheets'
                            cookiePolicy={'single_host_origin'}
                            />
                        ):(<>{accessToken}</>)
                        }
                    </div>
                <div className={styles.footer}>
                    <Button onClick={() => {
                        if(accessToken != ''){
                            //非同期でトークンを使ってメールグループを取得する
                            getSpreadsheetValues(setMailGroups)
                        }                        
                        setShowImportDataFromSpleadsheet(false)
                    }}>
                       {accessToken === '' ? ("キャンセル"):("OK")} 
                    </Button>
                </div>
            </div>
            

        </Modal>
    )

}