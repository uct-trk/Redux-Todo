import { useState } from 'react'
import toast from 'react-hot-toast'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../slices/todoSlice'
import styles from '../styles/modules/todoItem.module.scss'
import { getClasses } from '../utils/getClasses'
import { TodoModal } from './TodoModal'

const TodoItem = ({todo}) => {
    const [updateModalOpen, setUpdateModalOpen] = useState(false)

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id))
        toast.success("Todo Deleted Successfully")
    }

    const handleUpdate = () => {
        setUpdateModalOpen(true)
    }
  return (
    <>
        <div className={styles.item}>
            <div className={styles.todoDetails}>
                []
                <div className={styles.text}>
                    <p className={getClasses([styles.todoText, todo.status === 'complete' && styles['todoText--completed']])}>{todo.title}</p>
                    <p className={styles.time}>
                        {todo.time}
                    </p>
                </div>
            </div>
            <div className={styles.todoActions}>
                <div className={styles.icon} tabIndex={0} role="button" onClick={handleUpdate}>
                    <MdEdit/>
                </div>
                <div className={styles.icon} tabIndex={1} role="button" onClick={handleDelete}>
                    <MdDelete/>
                </div>
            </div>
        </div>
        <TodoModal type="update" todo={todo} modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen}/>
    </>
  )
}

export default TodoItem