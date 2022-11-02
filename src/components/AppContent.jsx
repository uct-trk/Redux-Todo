import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'
import styles from '../styles/modules/app.module.scss'

export const AppContent = () => {
  const filterStatus = useSelector(state => state.todo.filterStatus)
  const todoList = useSelector((state) => state.todo.todoList)
  const sortedTodoList = [...todoList]
  sortedTodoList.sort((a,b) => b.time.localeCompare(a.time))

  const filteredTodoList = sortedTodoList.filter(item => {
    if(filterStatus === 'all'){
      return true
    }
    return item.status === filterStatus
  })

  return (
    <div className={styles.content__wrapper}>
      {filteredTodoList && filteredTodoList.length > 0 ? (
        filteredTodoList.map((todo) => <TodoItem key={todo.id} todo={todo}/>)
      ) : "Todo not found"}
    </div>
  )
}
