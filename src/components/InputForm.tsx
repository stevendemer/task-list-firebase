import React, { useState, useEffect, useCallback } from "react";

type Props = {};

const InputForm = (props: Props) => {
  const [task, setTask] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setTask(newValue);
    console.log(newValue);
  };

  return (
    <div className="flex m-auto bg-gray-200 items-center w-96 rounded-full justify-around">
      <form>
        <input
          className="my-2 w-full p-2 rounded-full  text-gray-800 focus:outline-none text-md font-semibold"
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder="Add a task"
          value={task}
        />
      </form>
      <button className="inline-flex items-center justify-end bg-blue-300 leading-2 p-2 rounded-lg">
        Add Task
      </button>
    </div>
  );
};

export default InputForm;
