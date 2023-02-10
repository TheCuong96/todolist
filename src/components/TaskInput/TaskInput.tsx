import { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todo.type'
interface Props {
  addData: (name: string) => void
  valueEdit: Todo | null
  editCurrent: (name: string) => void
  updateTodoList: () => any
}
export default function TaskInput(props: Props) {
  const { addData, valueEdit, editCurrent, updateTodoList } = props
  const [data, setData] = useState<string>('')
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (valueEdit) {
      editCurrent(value)
    } else {
      setData(value)
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (valueEdit) {
      updateTodoList()
      if (data) setData('')
    } else {
      addData(data)
      setData('')
    }
  }
  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          onChange={onChange}
          value={valueEdit ? valueEdit?.name : data}
        />
        <button type='submit'>{valueEdit ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}
