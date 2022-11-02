import { useState } from 'react'
import Button, { SelectButton } from './Button'
import styles from '../styles/modules/app.module.scss'
import { TodoModal } from './TodoModal'
import { useDispatch } from 'react-redux'
import { updateFilterStatus } from '../slices/todoSlice'
import { useSelector } from 'react-redux'


const AppHeader = () => {

    const [modalOpen, setModalOpen] = useState(false)
    const filterStatus = useSelector(state => state.todo.filterStatus)
    
    const dispatch = useDispatch()

    const updateFilter = (e) => {
        dispatch(updateFilterStatus(e.target.value))
    }

  return (
    <div className={styles.appHeader}>
    <Button onClick={() => setModalOpen(true)} variant='primary'>Add Task</Button>
    <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
        <option value="all">ALL</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
    </SelectButton>
    <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </div>
  )
}

export default AppHeader