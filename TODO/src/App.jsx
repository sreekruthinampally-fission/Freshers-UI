import { useState } from 'react'
import './App.css'

const INITIAL_TASKS = [
  { id: 1, key: 'DSH-1', name: 'Usability Testing', status: 'In progress' },
  { id: 2, key: 'DSH-2', name: 'Conduct User Research', status: 'In progress' },
  { id: 3, key: 'DSH-3', name: 'Develop User Stories', status: 'Todo' },
  { id: 4, key: 'DSH-4', name: 'Interactive Prototype', status: 'Done' },
  { id: 5, key: 'DSH-5', name: 'User Journey Maps', status: 'Todo' },
]

let nextId = 6

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [activeTab, setActiveTab] = useState('All')
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [newTaskName, setNewTaskName] = useState('')
  const [newTaskStatus, setNewTaskStatus] = useState('Todo')
  const [theme, setTheme] = useState('light')

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  function handleAddTask() {
    if (newTaskName === '') return
    const newTask = {
      id: nextId,
      key: 'DSH-' + nextId,
      name: newTaskName,
      status: newTaskStatus,
    }
    nextId = nextId + 1
    setTasks([...tasks, newTask])
    setNewTaskName('')
    setNewTaskStatus('Todo')
    setShowModal(false)
  }

  function handleDeleteTask(id) {
    const updated = tasks.filter(task => task.id !== id)
    setTasks(updated)
  }

  function handleStatusChange(id, newStatus) {
    const updated = tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: newStatus }
      }
      return task
    })
    setTasks(updated)
  }

  // filter by tab
  let visibleTasks = tasks
  if (activeTab !== 'All') {
    visibleTasks = tasks.filter(task => task.status === activeTab)
  }

  // filter by search
  visibleTasks = visibleTasks.filter(task =>
    task.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={theme === 'dark' ? 'page dark' : 'page'}>
      <div className="card">

        {/* Header */}
        <div className="card-header">
          <h1>Tasks</h1>
          <div className="tabs">
            <button
              className={activeTab === 'All' ? 'tab tab-active' : 'tab'}
              onClick={() => setActiveTab('All')}
            >
              All
            </button>
            <button
              className={activeTab === 'Todo' ? 'tab tab-active' : 'tab'}
              onClick={() => setActiveTab('Todo')}
            >
              Todo
            </button>
            <button
              className={activeTab === 'In progress' ? 'tab tab-active' : 'tab'}
              onClick={() => setActiveTab('In progress')}
            >
              In progress
            </button>
            <button
              className={activeTab === 'Done' ? 'tab tab-active' : 'tab'}
              onClick={() => setActiveTab('Done')}
            >
              Done
            </button>
          </div>
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        {/* Search and New Task button */}
        <div className="toolbar">
          <input
            className="search"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            + New Task
          </button>
        </div>

        {/* Add Task Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>New Task</h2>
              <div className="field">
                <label>Task name</label>
                <input
                  className="input"
                  placeholder="e.g. Design login screen"
                  value={newTaskName}
                  onChange={e => setNewTaskName(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Status</label>
                <select
                  className="input"
                  value={newTaskStatus}
                  onChange={e => setNewTaskStatus(e.target.value)}
                >
                  <option>Todo</option>
                  <option>In progress</option>
                  <option>Done</option>
                </select>
              </div>
              <div className="modal-buttons">
                <button className="btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn-primary" onClick={handleAddTask}>Add Task</button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <table className="table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Name</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visibleTasks.length === 0 && (
              <tr>
                <td colSpan="4" className="empty">No tasks found</td>
              </tr>
            )}
            {visibleTasks.map(task => (
              <tr key={task.id}>
                <td className="td-key">{task.key}</td>
                <td>{task.name}</td>
                <td>
                  <select
                    className={'status-select status-' + task.status.replace(' ', '-').toLowerCase()}
                    value={task.status}
                    onChange={e => handleStatusChange(task.id, e.target.value)}
                  >
                    <option>Todo</option>
                    <option>In progress</option>
                    <option>Done</option>
                  </select>
                </td>
                <td>
                  <button className="btn-delete" onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="card-footer">
          {visibleTasks.length} tasks
        </div>

      </div>
    </div>
  )
}
