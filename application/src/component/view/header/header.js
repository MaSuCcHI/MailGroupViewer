import styles from './header.module.css'
import {Button} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ImportExportIcon from '@mui/icons-material/ImportExport';
import MailSelect from './mailSelect'

export default function Header ({
    showInportDataModal,
    setShowImportDataModal,
    showImportDataFromSpleadsheet,
    setShowImportDataFromSpleadsheet,
    mailGroups,
    setMailGroups,
    selectedMailGroups,
    setSelectedMailGroups,
    viewMode,
    setViewMode,
}) {

    return (
        <div className={styles.Header}>
            <Button 
                className={styles.logo} 
                variant="text"
                onClick={()=> {
                  if(viewMode==="Diagram"){setViewMode("Venn")}
                  if(viewMode==="Venn"){setViewMode("Diagram")}  
                }}
                >
                {viewMode}
            </Button>
            <MailSelect
              mailGroups={mailGroups}
              setMailGroups={setMailGroups}
              selectedMailGroups={selectedMailGroups}
              setSelectedMailGroups={setSelectedMailGroups}
            />
            <Button className={styles.uploadDataButton}
                onClick={() => setShowImportDataModal(true)}
            >
                <AddIcon fontSize='large' color='primary'/> up
            </Button>
            <Button className={styles.uploadDataButton}
                onClick={() => setShowImportDataFromSpleadsheet(true)}
            >
                <ImportExportIcon fontSize='large' color='primary'/> スプシ連携
            </Button>
        </div>
    )
}