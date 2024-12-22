import { useState, useEffect } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import "./Todo.css";
import axios from "axios";

function Todo() {
  let { data, loading, error } = useAxiosFetch(
    "https://localhost:7286/api/ToDo"
  );
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function generateId(){
    return crypto.randomUUID();
  }

  function addTask() {
    if(newTask==="") return;
    let task = {
      id: generateId(),
      title: newTask
    };
  
    axios.post("https://localhost:7286/api/ToDo", task)
      .then((response) => {
        setTasks([...tasks,task]); 
        setNewTask("");
      })
      .catch((ex) => {
        error=ex;
        console.error("Error adding task:", error);
      });
  }

  function deleteTask(index) {
    let task=tasks[index];
    axios.delete(`https://localhost:7286/api/ToDo?id=${task.id}`)
    .then((response)=>{
      setTasks(tasks.filter((task, i) => i !== index));
      }
    )
    .catch((ex)=>error=ex);
  }

  function moveUp(index) {
    if(index==0) return;
    let newTasks = [...tasks];
    [newTasks[index], newTasks[index - 1]] = [
      newTasks[index - 1],
      newTasks[index],
    ];

    const listItems = document.querySelectorAll("li");
    listItems[index].classList.add("move-up");
    listItems[index - 1].classList.add("move-down");
  
    setTimeout(() => {
      setTasks(newTasks);
      listItems[index].classList.remove("move-up");
      listItems[index - 1].classList.remove("move-down");
    }, 300); 
  }

  function moveDown(index) {
    if(index==tasks.length-1) return;
    let newTasks = [...tasks];
    [newTasks[index], newTasks[index + 1]] = [
      newTasks[index + 1],
      newTasks[index],
    ];
    setTasks(newTasks);
    const listItems = document.querySelectorAll("li");
    listItems[index+1].classList.add("move-up");
    listItems[index].classList.add("move-down");
  
    setTimeout(() => {
      
      listItems[index+1].classList.remove("move-up");
      listItems[index].classList.remove("move-down");
    }, 300); 
  }

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  if (loading) return <li>Loading...</li>;

  if (error) return <li>Error: {error.message}</li>;

  return (
    <>
      <div className="to-do-list">
        <h1>ToDoList</h1>

        <div>
          <input
            type="text"
            placeholder="Enter a task...."
            value={newTask}
            onChange={handleInputChange}
          />
          <button className="add-button" onClick={addTask}>
            Add
          </button>
        </div>

        <ol>
          {tasks.map((task, index) => {
            return(
            <li key={index}>
              <p className="text">{task.title}</p>
              <button
                className="delete-button"
                onClick={()=>deleteTask(index)}>
                  Delete
              </button>
              <button 
                className="move-button"
                onClick={()=>moveUp(index)}>
                Up
              </button>
              <button
                className="move-button"
                onClick={()=>moveDown(index)}>
                  Down
              </button>
            </li>)
          })}
        </ol>
      </div>
    </>
  );
}

export default Todo;
