import React, { useEffect, useState } from 'react'
// import TodoForm from './TodoForm'
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import './style.css'

const TodoWrapper = ({ }) => {
  const [task, setTask] = useState("")
  let data = JSON.parse(localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : []
  const [todos, setTodos] = useState(data)
  const [mstatus, setMstatus] = useState([]);
  const [editId, seteditId] = useState("");
  const [single, setSingle] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    // addTask(task);
    if (!task) {
      alert("Add task.")
      return false
    }


    alert('addtask');
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    let obj = {
      id: Date.now(),
      task: task,
      completed: false,
      isEdit: false,
      date: date,
      month: month,
      year: year,
    }
    // let todoList = [...todos, obj];
    // localStorage.setItem('tasks', JSON.stringify(todoList));
    // setTodos(todoList);

    if (editId) {
      let todoList = [...todos];
      let updatedTask = todoList.map((val) => {
        if (val.id === editId) {
          return {
            ...val,
            task: task,
          }
        }
        return val;
      })
      setTodos(updatedTask);
      seteditId("");
      setSingle("");
      localStorage.setItem(('tasks'), JSON.stringify(updatedTask));
    } else {
      // let newUd = [...todos, obj];
      // setTodos(newUd);
      // localStorage.setItem('tasks', JSON.stringify(newUd))
      let todoList = [...todos, obj];
      localStorage.setItem('tasks', JSON.stringify(todoList));
      setTodos(todoList);

    }
    setTask("");

  }


  // delete task
  const deleteTask = (id) => {
    let afterDel = todos.filter((val, i) => {
      return val.id !== id
    })
    alert('delete task?')
    setTodos(afterDel);
    localStorage.setItem('tasks', JSON.stringify(afterDel));
  }



  //completed/ !completed status check
  const handleStatus = (id, check) => {

    let ups = todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    console.log(ups);
    setTodos(ups);
    localStorage.setItem('tasks', JSON.stringify(ups))


    let status = [...mstatus];
    if (check) {
      let ups = todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
      console.log(ups);
      setTodos(ups);
      localStorage.setItem('tasks', JSON.stringify(ups))
      // status.push(id)
      // line through
      let lt = document.getElementById(`task${id}`);
      lt.style.textDecoration = "line-through";
      lt.style.color = "#7a7a7a"


    } else {
      console.log(ups);
      // status = status.filter(val => val != id);

      // remove line through
      let lt = document.getElementById(`task${id}`);
      lt.style.textDecoration = "none";
      lt.style.color = "#000"
    }
    setMstatus(status);


    // handleMultipleStatus();
    //let updateStatus =
    // if (mstatus.includes(id)) {
    //   // alert('completed')
    //   let updatedStatus = todos.map((val) => {
    //     if (val.id == id && check) {
    //       val.completed = true;
    //      
    //     }
    //     else {
    //       val.completed = false;
    //     }
    //     return val;
    //   })
    //   setTodos(updatedStatus);
    //   localStorage.setItem('tasks', JSON.stringify(updatedStatus))
    // }
    // else {



    //   // setTodos(updatedStatus);
    //   // localStorage.setItem('tasks', JSON.stringify(updatedStatus))
    // }

    // console.log(todos);
  }

  // edit task
  const editTask = (id) => {
    const s = todos.find((todo) => todo.id === id);
    seteditId(s.id);
    setSingle(s);
  }

  useEffect(() => {
    setTask(single.task);
  }, [single]);

  return (
    <div align="center">

      <div align="center" className='inputbox mt-5'>
        <div className="formbox">
          <h1 className='heading mb-3'>TODO App</h1>
          <form action="" onSubmit={handleSubmit}>

            <div className="input-group">
              <input className='inputbox rounded-start' type="text" placeholder='Add a task...' onChange={(e) => setTask(e.target.value)} value={task || ""} />
              <button className='btn btn-success'>{editId ? "edit" : "+"}</button>
            </div>

          </form>
        </div>

      </div>

      <div className="formbox mt-5 py-2 px-3" >
        <h1 className=''>~Tasks</h1>
        {
          todos.map((val, i) => {
            return (
              <div key={i}>

                <div className="task my-1 py-2 px-3">
                  <div className='todotask mb-0 ' >
                    <p className='mb-0 fw-bold fs-5 pb-1'>
                      <input type="checkbox" className="" onChange={(e) => handleStatus(val.id, e.target.checked)} />
                      <span className='ps-3' id={`task${val.id}`}>{val.task}</span></p>
                  </div>
                  <div className='pb-2 dates'>0{val.date}/{val.month}/{val.year}</div>
                  <div className='mb-0'>
                    <button className='btn btn-success edit' onClick={() => deleteTask(val.id)}><FaRegTrashAlt /></button>
                    <button className='btn btn-success trash' onClick={() => editTask(val.id)}><FiEdit3 /></button>
                  </div>
                </div>

              </div>
            )
          })
        }

      </div>
    </div>
  )
}

export default TodoWrapper
