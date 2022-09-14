import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { ITask } from "../types.d";
import Task from "./Task";

const Tasks: React.FC = () => {
  // the title of the task
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { user } = useAuth();
  const inputRef = useRef(null);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setTask(newValue);
    console.log(newValue);
  };

  const handleSubit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!task) {
      alert("No task entered !");

      addTask(task);

      return;
    }
    setTask("");
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // adds the tasks array to the firestore
  useEffect(() => {
    const addTasks = async () => {
      try {
        const userRef = doc(db, "users", user!.uid);
        if (userRef != null) {
          await updateDoc(userRef, {
            tasks,
          });
        }
      } catch (error) {
        alert(error);
      }
    };
    addTasks();
  }, [tasks]);

  const completeTask = (id: string) => {
    let updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isDone = !task.isDone;
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const addTask = (title: string) => {
    const newTask: ITask = {
      title: task,
      id: uuidv4(),
      isDone: false,
      deadline: new Date().toISOString().slice(0, 10),
    };
    // append the new task
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, title: string) => {
    // check if there is already a task with that name
    if (tasks.find((task) => task.title === title)) {
      alert("Tasks must have different titles !");
      return;
    }
    let updatedTasks = tasks.filter((task) => {
      if (task.id === id) {
        task.title = title;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const removeTask = (id: string) => {
    if (!tasks) {
      alert("There are no tasks to remove !");
      return;
    }
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  return (
    <div className="flex flex-col m-auto w-full items-center">
      <div className="bg-gray-200 mx-auto mb-10 w-full space-y-2 ">
        <div className="flex m-auto bg-gray-200 items-center w-full rounded-full mb-20 justify-around ">
          <form className="w-full container m-auto ">
            <input
              className="my-2 w-full px-4 py-2 mb-6 rounded-full border-2 border-slate-400  text-gray-800 focus:outline-none text-md font-semibold"
              type="text"
              onChange={(e) => handleChange(e)}
              placeholder="Add a task"
              value={task}
              ref={inputRef}
            />
            <button
              type="submit"
              onClick={handleSubit}
              className="flex items-center justify-center hover:bg-blue-400 transition-all duration-200  bg-blue-600 text-gray-200 leading-2 px-2 py-4  rounded-lg w-44 whitespace-nowrap mx-auto font-semibold"
            >
              ADD TASK
            </button>
          </form>
        </div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            updateTask={updateTask}
            removeTask={removeTask}
            completeTask={completeTask}
            task={task}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
