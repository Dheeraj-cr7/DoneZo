import { useEffect, useState } from 'react'
// import './App.css'
import { TodoContextProvider } from './context/todo_context'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { ThemeProvider } from './ThemeContext/themeContext'
import ThemeSliderToggle from './element/ThemeBtn'

// useContext with local storage

function App() {
  const [todos, setTodos] = useState([])
  const [themeMode, setThemeMode] = useState(null)

  //  defining the methods taken from context.
  const addTodo = (todo) => {
    console.log("New todo : ", todo)
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map(prevTodo => (prevTodo.id === id ? todo : prevTodo)))
    // yah check kar rahe hai id  agar change hua toh "todo" nahi toh prev value "prevTodo
    // same logic and simple typo
    // prev.map((eachVal) => {
    //   if(eachVal.id === id){
    //     todo
    //   }else{
    //     eachVal
    //   }
    // })
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
    // jo jo id match nahi hogi toh vo vo new array me add hojaengi
    // or jo id match hogyi vo skip hojaengi
  }

  const toggleComplete = (id) => {
    
    setTodos((prev) => prev.map(prevTodo => prevTodo.id === id ? { ...prevTodo, isCompleted: !prevTodo.isCompleted } : prevTodo))
    // {...prevTodo, isCompleted: !prevTodo.iscompleted} : prevTodo
    // {} <- iske andar todo obj ki har ek value access krliya or 
    // isCompleted ko override kardiya
  }


  // to get items
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos")) // search the web
    // JSON.parse() kyu? : kunki getItem hamko data as a string bhejta hai isliye
    if (data && data.length > 0) { // empty to already hai hi, useState me ([]).
      setTodos(data)
    }
  }, [])

  // to set items
  useEffect(() => {
    console.log('Setting todos to local storage: ', todos)
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  // har todo add hone pr setItem update hoga isliye todos dependency array me hai
  // JSON.strigify() kyu? kunki hamko data string format me bhejna pdenga


  const darkTheme = () => { setThemeMode("dark") }
  const lightTheme = () => { setThemeMode("light") }

  useEffect(() => {
    const mode = JSON.parse(localStorage.getItem("mode"))
    if (mode) setThemeMode(mode)
  }, [])

  useEffect(() => {
    if (themeMode) {
      document.querySelector("html").classList.remove("light", "dark")
      document.querySelector("html").classList.add(themeMode)
      localStorage.setItem("mode", JSON.stringify(themeMode))
    }
  }, [themeMode])

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <TodoContextProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
        <div className="min-h-screen relative w-full py-10 px-4 bg-gradient-to-br bg-blue-50 dark:bg-gray-800">

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
            <ThemeSliderToggle />
          </div>

          <div className="w-full max-w-2xl mx-auto shadow-gray-700 shadow-xl bg-white rounded-2xl px-6 py-8 text-gray-900 dark:bg-gray-600 ">
            <h1 className="text-2xl sm:text-3xl animate-fade font-bold text-center mb-8 mt-2 dark:text-white">
              Manage your Todos
            </h1>

            <div className="mb-4 animate-fade">
              <TodoForm />
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              {todos.map((items) => (
                <div  key={items.id} className="w-full animate-fade">
                  <TodoItem todo={items} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </TodoContextProvider>
    </ThemeProvider>
  );

}

export default App
