import React, { useState } from 'react'
import useTodo from '../context/todo_context';

function TodoItem({ todo }) { // props coming from app.jsx
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const { updateTodo, deleteTodo, toggleComplete } = useTodo()
    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })
        setIsTodoEditable(false)
    }
    const toggleCompleted = () => {
        console.log(todo.id)
        toggleComplete(todo.id)  // calling the function defined is app.jsx
    }
    return (
        <div
            className={`flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 w-full 
              bg-white/80 dark:bg-gray-800/80 backdrop-blur-md 
              border border-gray-200 dark:border-gray-600 
              rounded-xl px-4 py-3 shadow-md 
              transition-all duration-300 
              ${todo.isCompleted ? "bg-green-100 dark:bg-green-900/60" : ""}`}
        >
            {/* Checkbox and Text Input */}
            <div className="flex items-center gap-3 w-full">
                <input
                    type="checkbox"
                    className="h-5 w-5 accent-green-500 cursor-pointer"
                    checked={todo.isCompleted}
                    onChange={toggleCompleted}
                />

                <input
                    type="text"
                    className={`w-full bg-transparent text-base sm:text-lg font-medium outline-none 
                  ${isTodoEditable ? "border-b border-gray-400" : ""} 
                  ${todo.isCompleted ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"}`}
                    value={todoMsg}
                    onChange={(e) => setTodoMsg(e.target.value)}
                    readOnly={!isTodoEditable}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 shrink-0">
                <button
                    className="w-9 h-9 flex justify-center items-center text-lg rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition disabled:opacity-50"
                    onClick={() => {
                        if (todo.isCompleted) return;
                        if (isTodoEditable) {
                            editTodo(todo.id, todoMsg);
                        } else setIsTodoEditable((prev) => !prev);
                    }}
                    disabled={todo.isCompleted}
                >
                    {isTodoEditable ? "💾" : "✏️"}
                </button>

                <button
                    className="w-9 h-9 flex justify-center items-center text-lg rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                    onClick={() => deleteTodo(todo.id)}
                >
                    ❌
                </button>
            </div>
        </div>

    );
}

export default TodoItem;

