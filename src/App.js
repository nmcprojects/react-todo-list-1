
import React from 'react';
import dateFormat, { masks } from "dateformat";

import './App.css';
import TaskItem from './TaskItem';

function App() {

  const [ dayTask, setDayTask] = React.useState({
    dayOfWeek: 'Tuesday',
    dayOfMonth: '22th',
    month: 'November',
  })

  const [work, setWork] = React.useState();
  const inputWork = React.useRef()

  const [ taskList, setTaskList ] = React.useState([{
    id: Math.floor(Math.random() * 1000000),
    checked: null,
    work: 'Learn React JS',
    timer: '3:44 PM',
  }, {
    id: Math.floor(Math.random() * 1000000),
    checked: null,
    work: 'Learn Sping boot',
    timer: '11:22 AM',
  }, {
    id: Math.floor(Math.random() * 1000000),
    checked: null,
    work: 'Practice My React Skills',
    timer: '04:11 PM',
  }, {
    id: Math.floor(Math.random() * 1000000),
    checked: 'checked',
    work: 'lorem Ipsum, Lorem Ipsum and others in other languages',
    timer: '04:07 AM',
  }, {
    id: Math.floor(Math.random() * 1000000),
    checked: null,
    work: 'Learn Redux and React In Depth',
    timer: '08:22 AM',
  }, {
    id: Math.floor(Math.random() * 1000000),
    checked: null,
    work: 'Learn Sping bootstrapped React In Depth and Spinner in JavaScript',
    timer: '17:59 AM',
  }]);

  React.useLayoutEffect(() => { 
    const now = new Date();
    const dayOfWeek = dateFormat(now, "dddd")
    const dayOfMonth = dateFormat(now, "dS")
    const month = dateFormat(now, "mmmm")
    setDayTask({
      dayOfWeek, dayOfMonth, month
    })
  }, []);

  const _getTime = () => {
      return new Date().toLocaleString(undefined, {timeStyle: 'short'});
  }

  const handleClearTask = () => {
    const tasksNotDone = taskList.filter(task => task.checked !== 'checked');
    
    if(tasksNotDone.length === taskList.length) {
      alert("Choose task to clear!!")
    } else {
      setTaskList(tasksNotDone);
    }
  }

  const handleAddNewTask = () => {

    if(work == null || work == '' || work?.length == 0) {
        alert("Enter your task before add!!")
    } else {
      const newTask = {
        id: Math.floor(Math.random() * 1000000),
        checked: null,
        work: work,
        timer: _getTime(),
      }
      setTaskList(preState => {
        return [
          ...preState,
          newTask
        ]
      })

      setWork('');
      inputWork.current.focus();
    }
  }

  const handleEnterWork = (event) => {
    setWork(event.target.value)
  }

  const handleCheckboxChange = (id, isChecked) => {
    const newList = taskList.map(task => {
      if(task.id == id) {
        task.checked = isChecked ? 'checked' : null; 
      }

      return task;
    });
    console.log(newList);
    setTaskList(newList);
  }

  return (
    <div className="App">
      <div className="header">
        <div className="header-left">
            <p className="header-left--day">{dayTask.dayOfWeek}, <span>{dayTask.dayOfMonth}</span></p> 
            <p className="header-left--month" data-checked="checked" >{dayTask.month}</p>
        </div>
        <div className="header-right">
          <p>{taskList.length} Tasks</p>
          <button onClick={handleClearTask} >Clear Task</button>
        </div>
      </div>
      <div className="context">
        <div className="context-input" >
          <div className="context-input--add" onClick={handleAddNewTask}>+</div>
          <input type="text" placeholder="Type your task" ref = {inputWork} value={work} onChange={handleEnterWork} />
        </div>
        <div className="context-list">
          {
            taskList.map((task) => {
              return <TaskItem key={task.id} task={task}  
                        handleCheckboxChange = {handleCheckboxChange}/>
            })
          }
        </div>
      </div>
      <div className="footer">
        Inspired by <span style={{color: '#fb6f70'}}>Jack Ma...</span>
      </div>
    </div>
  );
}

export default App;
