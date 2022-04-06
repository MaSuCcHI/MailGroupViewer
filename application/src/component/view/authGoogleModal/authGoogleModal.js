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
        const res = await axios.get(`${BaseURL}${SPREAD_SHEET_ID}`+`/values/${SHEET_NAME}`,{
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        console.log(res.data)
        return res.data;
    };

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles[0])
        const reader = new FileReader()
        reader.readAsText(acceptedFiles[0])
        reader.onload = () => {
            const result = Papa.parse(reader.result)
            //console.log(result.data)
            // TODO 関数に分割
            tmpMailGroups = new Map()
            result.data.forEach((elem, index) => {
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
            //  console.log(tmpMailGroups)
        }
    }, [])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

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
                            //トークンを使ってメールグループを取得する
                            const data = getSpreadsheetValues()
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
                            // console.log(tmpMailGroups)
                            if(tmpMailGroups.size!==0){
                                setMailGroups(tmpMailGroups)
                            }
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