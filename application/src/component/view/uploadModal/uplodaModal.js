import styles from "./uploadModal.module.css"

import React, {useCallback} from 'react'
import Modal from "react-modal";
import { Button } from "@material-ui/core";
import { Close, CloudUploadOutlined } from "@material-ui/icons";
import { useDropzone } from 'react-dropzone'


export default function UploadFileModal ({
    showImportDataModal,
    setShowImportDataModal,
}) {

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
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
                    <Button onClick={() => setShowImportDataModal(false)}>
                        OK
                    </Button>
                </div>
            </div>
            

        </Modal>
    )

}