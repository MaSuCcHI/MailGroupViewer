import styles from './header.module.css'
import {Button} from '@mui/material'
import {AddCircle} from '@mui/icons-material'
import SimpleListMenu from './mailListMenu'

export default function Header ({
    showInportDataModal,
    setShowImportDataModal,
    mailGroupInfo,
    setMailGroupInfo
}) {

    return (
        <div className={styles.Header}>
            <Button className={styles.logo} variant="text">メールグループ</Button>
            <SimpleListMenu
              mailGroupInfo={mailGroupInfo}
              setMailGroupInfo={setMailGroupInfo}
            />
            <Button className={styles.uploadDataButton}
                onClick={() => setShowImportDataModal(true)}
            >
                <AddCircle/>up
            </Button>
        </div>
    )
}