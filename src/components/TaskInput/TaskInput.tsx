import { useState } from 'react'
import styles from './taskInput.module.scss'
interface Props {
  addData: (name: string) => void
  
}
export default function TaskInput(props: Props) {
  const { addData } = props
  const [data, setData] = useState<string>('')
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addData(data)
    setData('')
  }
  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          onChange={onChange}
          value={data}
        />
        <button type='submit'>{'➕'}</button>
      </form>
    </div>
  )
}
