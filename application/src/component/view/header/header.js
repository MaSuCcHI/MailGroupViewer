import styles from './header.module.css'
import {Button} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MailSelect from './mailSelect'

export default function Header ({
    showInportDataModal,
    setShowImportDataModal,
    mailGroups,
    setMailGroups,
    selectedMailGroups,
    setSelectedMailGroups,
}) {

    return (
        <div className={styles.Header}>
            <Button className={styles.logo} variant="text">メールグループ</Button>
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
        </div>
    )
}