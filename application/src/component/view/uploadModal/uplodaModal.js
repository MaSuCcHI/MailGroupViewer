import Modal from "react-modal";
import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";

export default function UploadFileModal ({
    showImportDataModal,
    setShowImportDataModal,
}) {

    return(
        <Modal isOpen={showImportDataModal}>
            <Button onClick={() => setShowImportDataModal(false)}>
                <Close/>
            </Button>
        </Modal>
    )

}