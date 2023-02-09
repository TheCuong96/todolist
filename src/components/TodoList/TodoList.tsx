import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import { Todo } from '../../@types/todo.type'
import styles from './todoList.module.scss'

// interface HandleNewTodos {
//   (todos: Todo[]): Todo[]
// }

type HandleNewTodos = (todos: Todo[]) => Todo[]

export default function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>([])

  const doneData = todoList.filter((item) => item.done)
  const notDoneData = todoList.filter((item) => !item.done)
  const addData = (name: string) => {
    setTodoList((prev: Todo[]) => [
      ...prev,
      {
        name,
        done: false,
        id: new Date().toISOString()
      }
    ])
  }

  const handleValueDone = (id: string, done: boolean) => {
    setTodoList((prev) =>
      prev.map((item) => {
        if (id === item.id) return { ...item, done }
        return item
      })
    )
  }

  console.log(todoList)
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addData={addData} />
        <TaskList data={notDoneData} handleValueDone={handleValueDone} />
        <TaskList data={doneData} handleValueDone={handleValueDone} />
      </div>
    </div>
  )
}
