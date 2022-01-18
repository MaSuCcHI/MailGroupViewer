import styles from "./uploadModal.module.css"
import { mailGroup, mailGroups } from "../../node/interface.ts"

import React, {useCallback, useEffect} from 'react'
import Modal from "react-modal";
import Papa from "papaparse"
import { Button } from "@mui/material";
import { Close, CloudUploadOutlined } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'

let tmpMailGroups = new Map()

export default function UploadFileModal ({
    showImportDataModal,
    setShowImportDataModal,
    mailGroups,
    setMailGroups,
}) {
    Modal.setAppElement(document.getElementById('root'))
    
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
                    tmpMailGroups.set(group,new Array)
                }
                let children = tmpMailGroups.get(group)
                children.push(user)
            })
            //  console.log(tmpMailGroups)
        }
    }, [])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return(
        <Modal isOpen={showImportDataModal}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <Button onClick={() => setShowImportDataModal(false)}>
                        <Close/>
                    </Button>
                </div>
                <div className={styles.body}>
                    <div {...getRootProps()}>
                        <CloudUploadOutlined fontSize="large"/>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                    </div>
                </div>
                <div className={styles.footer}>
                    <Button onClick={() => {
                        setMailGroups(tmpMailGroups)
                        setShowImportDataModal(false)
                    }}>
                        OK
                    </Button>
                </div>
            </div>
            

        </Modal>
    )

}