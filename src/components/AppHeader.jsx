import { useState } from 'react'
import Button, { SelectButton } from './Button'
import styles from '../styles/modules/app.module.scss'
import { TodoModal } from './TodoModal'


const AppHeader = () => {

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className={styles.appHeader}>
    <Button onClick={() => setModalOpen(true)} variant='primary'>Add Task</Button>
    <SelectButton id="status">
        <option value="all">ALL</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
    </SelectButton>
    <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </div>
  )
}

export default AppHeader