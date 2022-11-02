import { useEffect } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion';
import toast from 'react-hot-toast'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteTodo, updateTodo } from '../slices/todoSlice'
import styles from '../styles/modules/todoItem.module.scss'
import { getClasses } from '../utils/getClasses'
import CheckButton from './CheckButton'
import { TodoModal } from './TodoModal'

const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

const TodoItem = ({todo}) => {
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [checked, setChecked] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if(todo.status === 'complete'){
            setChecked(true)
        } else {
            setChecked(false)
        }
    },[todo.status])

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id))
        toast.success("Todo Deleted Successfully")
    }

    const handleUpdate = () => {
        setUpdateModalOpen(true)
    }

    const handleCheck = () => {
        setChecked(!checked)
        dispatch(updateTodo({
            ...todo, 
            status: checked ? 'incomplete' : 'complete' 
        }))
        toast.success("Updated Status")
    }

  return (
    <>
        <motion.div className={styles.item} variants={child}>
            <div className={styles.todoDetails}>
                <CheckButton checked={checked} handleCheck={handleCheck}></CheckButton>
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
        </motion.div>
        <TodoModal type="update" todo={todo} modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen}/>
    </>
  )
}

export default TodoItem