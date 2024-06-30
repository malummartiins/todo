import { useState } from 'react'

import "./App.css";
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Escrever roteiro",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Maratonar dorama",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    }
  ]);

  //função pesquisar
  const [search, setSearch] = useState("");

  //filtro
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");


//função para criar tarefa 
const addTodo = (text, category) => {

  const newTodos = [...todos, {
    id: Math.floor(Math.random() * 10000),
    text,
    category,
    isCompleted: false,
  },
];

setTodos(newTodos);

};

//função para remover
const removeTodo = (id) =>{
  const newTodos = [...todos]
  const filteredTodos = newTodos.filter(todo => todo.id !== id ? todo : null)

setTodos(filteredTodos);
};

//função para completar uma tarefa
const completeTodo = (id) =>{
  const newTodos = [...todos]
  newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
  setTodos(newTodos);
}




  return (
    <div className='app'>
    <h1>Lista de Tarefas</h1>
    <Search search={search} setSearch={setSearch}/> 
    <Filter filter={filter} setFilter={setFilter}/>
    <div className='todo-list'>
      {todos
      .filter((todo)=> 
        filter === "All" 
      ? true 
      : filter === "Completed" 
      ? todo.isCompleted 
      : !todo.isCompleted
    )  
      .filter((todo) => 
        todo.text.toLowerCase().includes(search.toLowerCase())
      )
      .map((todo) => (
        <Todo 
        key={todo.id} 
        todo={todo} 
        removeTodo={removeTodo} 
        completeTodo = {completeTodo}/>
      ))}
    </div>
    <TodoForm addTodo = {addTodo} />
  </div>
  );
}

export default App
