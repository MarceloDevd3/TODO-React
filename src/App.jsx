import { useState } from 'react'
import sun from './assets/images/icon-sun.svg';
import moon from './assets/images/icon-moon.svg';
import cross from './assets/images/icon-cross.svg';
import check from './assets/images/icon-check.svg';

import './App.css'

function App() {
  const [toogleIcon, setToogleIcon ] = useState(true)
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [copy, setCopy] = useState([])

  /*dark-mode toogle botao*/
  const toggle = () => {
    setToogleIcon(prevState => !prevState)
  }

  /*funcao para a usar e atualizar o todo*/

  const addTodo = () => {
     if(newTodo.trim()) {
      setTodo([...todo, {text: newTodo, completed: false}]);
      setNewTodo('')
     }
  }

  const completedItem = (index) => {
     const updateTodo = todo.map((todos, i ) => 
      i === index ? {...todos, completed: !todos.completed}  : todos
    );
    setTodo(updateTodo)
    setCopy(updateTodo)
  }

  const DeleteItem =  (index) => {
     const updateTodo = todo.filter((_, i) => i !== index);
     setTodo(updateTodo)
  }

  /*barra de controle */

  const activeItems = () => {
    let c = copy
     const active = c.filter(items => items.completed === false)
     setTodo(active)
  }

  const all = () => {
    setTodo(copy)
  }

  const completedItems2 = () => {
    let c = copy
    const active = copy.filter(items => items.completed === true)
    setTodo(active)
 }

 const tgDark = toogleIcon ? 'item It' : 'item It Active';
 const compareItem =  todo.length >= 1 ;

 /*resolver pequeno bug na parte 
 quando completo um item e deleto da lista e depois tento
 ver os outros item a lista nao aparece
 */


  return (
     <div className={toogleIcon ? 'bg-color' : 'bg-color dark'}  >
     <main className={toogleIcon  ? 'background-top' : 'background-top dark' }>
     <section id="todo-list-container">
     <header id="header-container" className={toogleIcon ? 'todo-container-item' : 'todo-container-item dark'}>
          <h1 id="header-title">TODO</h1>
          <button id="dark-mode--toggle-btn" onClick={toggle}>{toogleIcon ? <img src={moon} alt="moon"/> : <img src={sun} alt="sun"/>  } </button>
     </header>
     <div id="display" className={toogleIcon ? 'todo-container-item It' : 'todo-container-item It Active'}>
        <button className='circle' onClick={addTodo}></button>
        <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} name="text" placeholder="Create a new todo..." />
     </div>

     <article id="todo-container" >
     <ul>
     {todo.map((todoItem, index) => (
    <>
    <div className={tgDark} key={index}>
       <div className='item-row'>
       <button 
       className={todoItem.completed ? 'circle active' : 'circle'}
        onClick={() => completedItem(index)}>{todoItem.completed && <img src={check} alt='check-icon'/>}</button>
          <li className={todoItem.completed ? 'completed line' : "completed none"}>
          {todoItem.text}
       </li>
       </div>
       <button className='close' onClick={() => DeleteItem(index)}><img src={cross} alt="cross" /></button>
      </div>
      <div className='Line'/>
    </>
     ))}
     {compareItem && <div id="sub" className={tgDark} >
       <div>
         <span>{todo.length} Items Left</span>
       </div>
       <div className='litte-space'>
          <span>Clear</span>
          <span>Completed</span>
       </div>
     </div>}
     
     {compareItem &&  <div id="controll-bar"  className={tgDark} >
      <div className='desk-show'>
         <span>{todo.length} Items Left</span>
       </div>

      <button  onClick={all}>All</button>
      
      <button onClick={activeItems}>Active</button>
      
      <button  onClick={completedItems2}>Completed</button>

      <div className='litte-space desk-show'>
          <span>Clear</span>
          <span>Completed</span>
       </div>
    </div>
    }
    </ul>
     </article>
     </section>
    </main>
     </div>
  )
  }

export default App
