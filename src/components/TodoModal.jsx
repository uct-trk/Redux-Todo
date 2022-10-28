import { useState } from "react";
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";

export const TodoModal = ({ modalOpen, setModalOpen }) => {

  const [title,setTitle] = useState('')
  const [status,setStatus] = useState('incomplete')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
    {modalOpen && (
        <div className={styles.wrapper}>
        <div className={styles.container}>
          <div role='button' className={styles.closeButton} onClick={() => setModalOpen(false)} onKeyDown={() => setModalOpen(false)}>
            <MdOutlineClose />
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.formTitle}> Add Task</h1>
            <label htmlFor="title">
              Title
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>
            <label htmlFor="status">
              Status
              <select name="status" id="status" onChange={(e) => setStatus(e.target.value)}>
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <Button type="submit" variant="primary">
                Add Task
              </Button>
              <Button onClick={() => setModalOpen(false)} type="button" variant="secondary">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )}
      
    </>
  );
};
