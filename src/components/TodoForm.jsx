import React, { useState } from 'react'
import useTodo from '../context/todo_context'

function TodoForm() {
    const [todo, setTodo] = useState("")

    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()
        if (!todo) return
        addTodo({ todo: todo, isCompleted: false })
        setTodo("")
    }

    return (
        <form onSubmit={add} className='flex flex-col sm:flex-row gap-2'>
            <input
                type="text"
                value={todo} // wireup
                placeholder='Write tasks'
                className='w-full text-base border placeholder:text-black border-gray-300 rounded-lg px-4 py-2 outline-none bg-blue-400'
                onChange={(e) => setTodo(e.target.value)}
            />

            <button
                type='submit'
                className='px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all'
            >
                Add
            </button>
        </form>
    )
}

export default TodoForm
