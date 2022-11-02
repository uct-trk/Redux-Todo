import { useState } from "react";
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../slices/todoSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useEffect } from "react";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

export const TodoModal = ({ type, modalOpen, setModalOpen, todo }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      console.log(todo.status);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("incomplete");
    }
  }, [todo, type, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title");
      return;
    }

    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title: title,
            status: status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task Added Successfully");
        setModalOpen(false);
        setTitle("");
      }

      if (type === "update") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(
            updateTodo({
              ...todo,
              title: title,
              status: status,
              time: new Date().toLocaleString(),
            })
          );
          setModalOpen(false);
          toast.success("Todo Updated Successfully");
        } else {
          toast.error("No Changes Made");
        }
      }
    } else {
      toast.error("Title must fill");
    }
  };

  return (
    <>
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className={styles.wrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.container}
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                role="button"
                className={styles.closeButton}
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
                // animation
                initial={{ top: 40, opacity: 0 }}
                animate={{ top: -10, opacity: 1 }}
                exit={{ top: 40, opacity: 0 }}
              >
                <MdOutlineClose />
              </motion.div>
              <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.formTitle}>
                  {" "}
                  {type === "update" ? "Update" : "Add"} Task
                </h1>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
                <label htmlFor="status">
                  Status
                  <select
                    name="status"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Completed</option>
                  </select>
                </label>
                <div className={styles.buttonContainer}>
                  <Button type="submit" variant="primary">
                    {type === "update" ? "Update" : "Add"} Task
                  </Button>
                  <Button
                    onClick={() => setModalOpen(false)}
                    type="button"
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
