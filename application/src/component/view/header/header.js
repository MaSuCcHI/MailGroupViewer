import styles from './header.module.css'
import {Button,menu} from '@material-ui/core'
import {AddCircle} from '@material-ui/icons'

export default function Header ({
    showInportDataModal,
    setShowImportDataModal,
    mailGroupInfo,
    setMailGroupInfo
}) {

    return (
        <div className={styles.Header}>
            <Button className={styles.logo} variant="text">メールグループ</Button>
            <menu className={styles.mailMenu}>mailMenu</menu>
            <Button className={styles.uploadDataButton}
                onClick={() => setShowImportDataModal(true)}
            >
                <AddCircle/>up
            </Button>
        </div>
    )
}