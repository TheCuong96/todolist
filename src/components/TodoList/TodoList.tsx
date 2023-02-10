import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import { Todo } from '../../@types/todo.type'
import styles from './todoList.module.scss'
import { stringify } from 'querystring'

// interface HandleNewTodos {
//   (todos: Todo[]): Todo[]
// }

type HandleNewTodos = (todos: Todo[]) => Todo[]

const setDataLocalStorage = (handleNewData: HandleNewTodos) => {
  const getDataLocal = JSON.parse(localStorage.getItem('todoList') || '[]')
  const setDataLocal = handleNewData(getDataLocal)
  localStorage.setItem('todoList', JSON.stringify(setDataLocal))
}

export default function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [valueEdit, setValueEdit] = useState<Todo | null>(null)
  const doneData = todoList.filter((item) => item.done)
  const notDoneData = todoList.filter((item) => !item.done)
  useEffect(() => {
    setTodoList(JSON.parse(localStorage.getItem('todoList') || '[]'))
  }, [])

  const addData = (name: string) => {
    const data = (prev: Todo[]) => [
      ...prev,
      {
        name,
        done: false,
        id: new Date().toISOString()
      }
    ]
    setTodoList(data)
    setDataLocalStorage(data)
  }

  const handleValueDone = (id: string, done: boolean) => {
    const data = (prev: Todo[]) =>
      prev.map((item) => {
        if (id === item.id) return { ...item, done }
        return item
      })
    setTodoList(data)
    setDataLocalStorage(data)
  }
  const editItem = (id: string) => {
    const handleValue = todoList.find((item) => item.id === id)
    if (handleValue) setValueEdit(handleValue)
  }

  const editCurrent = (name: string) => {
    setValueEdit((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }
  const updateTodoList = () => {
    const data = (prev: Todo[]) =>
      prev.map((item) => {
        if (item.id === (valueEdit as Todo).id) {
          return valueEdit as Todo
        }
        return item
      })
    setTodoList(data)
    setDataLocalStorage(data)
    setValueEdit(null)
  }

  const deleteTodoList = (id: string) => {
    const data = () => {
      return todoList.filter((item) => {
        return item.id !== id
      })
    }
    setTodoList(data)
    setDataLocalStorage(data)
  }

  console.log(todoList)
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput
          addData={addData}
          valueEdit={valueEdit}
          editCurrent={editCurrent}
          updateTodoList={updateTodoList}
        />
        <TaskList
          data={notDoneData}
          handleValueDone={handleValueDone}
          editItem={editItem}
          deleteTodoList={deleteTodoList}
        />
        <TaskList
          data={doneData}
          doneTaskList
          handleValueDone={handleValueDone}
          editItem={editItem}
          deleteTodoList={deleteTodoList}
        />
      </div>
    </div>
  )
}
