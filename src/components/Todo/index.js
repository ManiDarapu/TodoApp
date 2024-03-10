import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import ListItem from '../ListItem'
import './index.css'

class Todo extends Component {
  state = {taskInput: '', tasks: []}

  onChangeInput = event => {
    this.setState({taskInput: event.target.value})
  }

  addTask = () => {
    const {taskInput} = this.state
    const taskParts = taskInput.split(' ')
    let taskName = ''
    let quantity = 1

    // Check if the last part of the input is a number
    const lastPart = taskParts[taskParts.length - 1]
    const lastPartNumber = parseInt(lastPart, 10)
    if (!Number.isNaN(lastPartNumber)) {
      // If the last part is a number, consider the rest as the task name
      taskName = taskParts.slice(0, -1).join(' ')
      quantity = lastPartNumber
    } else {
      // If the last part is not a number, consider the entire input as the task name
      taskName = taskInput
    }

    for (let i = 0; i < quantity; i += 1) {
      const taskId = uuidv4() // Generate unique task id
      this.setState(prevState => ({
        tasks: [...prevState.tasks, {id: taskId, name: taskName, count: 0}],
      }))
    }

    this.setState({taskInput: ''})
  }

  deleteTask = id => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.id !== id),
    }))
  }

  updateTaskCount = id => {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(task => {
        if (task.id === id) {
          return {...task, count: task.count + 1}
        }
        return task
      }),
    }))
  }

  editTask = (id, newName) => {
    console.log('Editing task with ID:', id, 'New name:', newName)
    this.setState(prevState => ({
      tasks: prevState.tasks.map(task => {
        if (task.id === id) {
          return {...task, name: newName}
        }
        return task
      }),
    }))
  }

  render() {
    const {taskInput, tasks} = this.state
    return (
      <div className="div1">
        <img
          src="https://cdn.dribbble.com/users/398490/screenshots/3169752/wishlist.gif"
          alt="todo img"
          className="image"
        />
        <div className="div2">
          <h1 className="h1">Day Goals</h1>
          <input
            type="text"
            value={taskInput}
            onChange={this.onChangeInput}
            placeholder="Add a todo"
            className="input"
          />
          <button type="button" onClick={this.addTask} className="addBtn">
            Add Task
          </button>
          <ul className="todoUl">
            {tasks.map(task => (
              <ListItem
                key={task.name}
                id={task.id}
                name={task.name}
                count={task.count}
                onDelete={() => this.deleteTask(task.id)}
                onUpdate={() => this.updateTaskCount(task.id)}
                onEdit={(id, newName) => this.editTask(task.id, newName)}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Todo
