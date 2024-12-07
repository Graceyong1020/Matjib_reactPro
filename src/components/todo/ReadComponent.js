import React from "react";
import { useEffect, useState } from "react";
import { getOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";

const initStates = {
  tno: 0,
  title: "",
  writer: "",
  dueDate: null,
  complete: false,
};

function ReadComponent({ tno }) {
  const [todo, setTodo] = useState(initStates);

  // useCustomMove에서 moveToList를 가져옴 -> 페이지 이동할때 page, size 정보를 가지고 이동
  // 간단한 페이징 처리를 위한 hook
  const { moveToModify, moveToList } = useCustomMove();

  useEffect(() => {
    getOne(tno).then((data) => {
      console.log(data);
      setTodo(data);
    });
  }, [tno]); //[ ] 어떤 값이 들어가면 실행

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4 ">
      {makeDiv("Tno", todo.tno)}
      {makeDiv("Writer", todo.writer)}
      {makeDiv("Title", todo.title)}
      {makeDiv(" Date", todo.dueDate)}
      {makeDiv("Visit", todo.complete ? "Visit" : "Not Yet")}

      {/* buttons.........start */}
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToList()}
        >
          List
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={() => moveToModify(tno)}
        >
          Modify
        </button>
      </div>
    </div>
  );
}

const makeDiv = (title, value) => (
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{title}</div>
      <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
        {value}
      </div>
    </div>
  </div>
);

export default ReadComponent;
