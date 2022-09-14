import React, { useState, useEffect } from "react";
import { ITask } from "../types.d";

type Props = {
  task: ITask;
  completeTask: (id: string) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, title: string) => void;
};

/**
 * TODO: Implement the update / delete actions
 * and mirror the changes to the firestore
 *
 */

const Task: React.FC<Props> = ({
  task,
  completeTask,
  updateTask,
  removeTask,
}) => {
  const [finished, setFinished] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);

  return (
    <>
      {!finished && (
        <div className="flex justify-center mx-auto text-gray-200 items-center p-4 mb-2  bg-gray-700 h-24 border-b-2 border-slate-300 pb-2 rounded-lg w-full container">
          <div className="flex flex-col items-center  mx-auto">
            <div className="text-xl  font-semibold px-2">{task.title}</div>
            <div className="text-xl text-gray-300 ">
              Added at {task.deadline}
            </div>
            <div className="flex items-center mx-auto ">
              {complete ? (
                <div>Task is finished</div>
              ) : (
                <div>Task is not finished</div>
              )}
            </div>
          </div>
          <div className="flex justify-around space-x-4 items-center">
            <button
              onClick={(e) => setComplete((prev) => !prev)}
              className="bg-green-400 text-gray-700 font-poppins font-semibold rounded-lg px-2"
            >
              Complete
            </button>
            <button
              onClick={(e) => setFinished(true)}
              className="bg-red-400 text-slate-700 font-semibold font-poppins rounded-lg px-2"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
