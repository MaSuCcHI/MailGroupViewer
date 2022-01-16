import styles from "./uploadModal.module.css"
import { mailGroup, mailGroups } from "../../node/interface.ts"

import React, {useCallback} from 'react'
import Modal from "react-modal";
import { Button } from "@material-ui/core";
import { Close, CloudUploadOutlined } from "@material-ui/icons";
import { useDropzone } from 'react-dropzone'


export default function UploadFileModal ({
    showImportDataModal,
    setShowImportDataModal,
    mailGroups,
    setMailGroups,
}) {
   
    let tmpMailGroups = {}

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles[0])
        const reader = new FileReader()
        reader.onload = () => {
            console.log(reader.result)

        }
        reader.readAsText(acceptedFiles[0])
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