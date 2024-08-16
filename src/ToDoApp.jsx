import { useEffect, useState } from 'react'
import ay from './img/ay.png'
import gunes from './img/gunes.png'
import oval from './img/oval.png'
import carpi from './img/carpi.png'
import tik from './img/tik.png'
import './App.css'

let id = 0;
const generateId = () => ++id;

export default function TodoApp() {
  const [theme, setTheme] = useState('light');
  const [todos, setTodos] = useState([]);

  function appendTodo(task) {
    const todoobj = {
      id: generateId(),
      task,
      completed: false
    }

    setTodos([...todos, todoobj]); 
  }

  function DeleteTodo(id) {
    setTodos(todos.filter(x => x.id !== id));
  }

  function clearAll() {
    setTodos([]);
  }

  useEffect(() => {
    if(theme === "dark") {
      document.body.classList.add("dark")
    }else{
      document.body.classList.remove("dark")
    }
  }, [theme])


  return (
    <div className="container">
      <div className="header" >
        <p className='headerP'><h1>TO DO</h1> <button className='ay' onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <img src={gunes} /> : <img src={ay} /> }</button></p>
        <ToDoForm appendTodo={appendTodo} />
      </div>

      <div className="ToDoContent">
          <TodoList todos={todos} DeleteTodo={DeleteTodo} />
          <hr />
        <div className="ToDoContentBottom">
          <p><span>{todos.filter(todo => !todo.completed).length}</span> items left</p>
          <p onClick={clearAll} style={{ cursor: 'pointer', color: '#494C6B' }}>Clear Completed</p>
        </div>
      </div>

      <div className="statusButtons">
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>

      <p className='footer'>Drag and drop to reorder list</p>
    
    </div>
  )
}

function TodoList({todos, DeleteTodo}) {

  return(
    <ul className='ToDoList'>
      {todos.map(x => <TodoItem key={x.id} id={x.id} task={x.task} DeleteTodo={DeleteTodo} />)}
    </ul>
  )
}

function TodoItem({task, id, DeleteTodo}) {
  const [isEdit, setEdit] = useState(false);
  const [newTask, setNewTask] = useState(task);
  const [completed, setCompleted] = useState(false);

  return (
    <li>
      <p className='liP'>
        <button onClick={() => setCompleted(!completed)} className='check' >
          {completed ? <img src={tik} alt="completed" />  : <img src={oval} alt="not completed" />}
        </button>
        <span style={{ textDecoration: completed ? 'line-through' : 'none' }} >
        {task}
        </span>
      </p>
      <button onClick={() => DeleteTodo(id)}>
        <img src={carpi} alt="delete" />
      </button>
    </li>
  )
}


function ToDoForm({appendTodo}) {
  function handleSubmit(e) {
    e.preventDefault();
    appendTodo(e.target['task'].value);
    e.target.reset();
  }

  return(
    <form onSubmit={handleSubmit} autoComplete='off'>
      <label><input style={{backgroundImage: `url(${oval})`}} name='task' required className='ToDoInput' type="text" placeholder='Create a new todo…' /></label>
    </form>
  )
}

function ClearBtn() {
  return(
    <div className="ToDoContentBottom">
      <p><span>0</span> items left</p>
      <button>Clear Completed</button>
    </div>
  )
  
}
