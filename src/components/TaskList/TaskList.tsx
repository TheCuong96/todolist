import { Todo } from '../../@types/todo.type'
import styles from './taskList.module.scss'
interface Props {
  data: Todo[]
  handleValueDone: (id: string, done: boolean) => void
}
export default function TaskList(props: Props) {
  const { data, handleValueDone } = props

  const handleOnchange =
    (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      handleValueDone(id, event.target.checked)
    }
  return (
    <div className='mb-2'>
      <h2 className={styles.title}>xxxx</h2>

      {data.map((item) => {
        return (
          <div className={styles.tasks}>
            <div className={styles.task}>
              <input
                type='checkbox'
                className={styles.taskCheckbox}
                checked={item.done}
                // onChange={(event) =>
                //   handleValueDone(item.id, event.target.checked)
                // }
                onChange={handleOnchange(item.id)}
              />
              <span className={`${styles.taskName} `}>{item.name}</span>
              <div className={styles.taskActions}>
                <button className={styles.taskBtn}>🖊️</button>
                <button className={styles.taskBtn}>🗑️</button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
