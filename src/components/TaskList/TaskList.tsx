import { Todo } from '../../@types/todo.type'
import styles from './taskList.module.scss'
interface Props {
  data: Todo[]
  doneTaskList?: boolean
  handleValueDone: (id: string, done: boolean) => void
  editItem: (id: string) => void
  deleteTodoList: (id: string) => void
}
export default function TaskList(props: Props) {
  const { data, handleValueDone, doneTaskList, editItem, deleteTodoList } =
    props

  const handleOnchange =
    (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      handleValueDone(id, event.target.checked)
    }
  const handleEdit = (id: string) => {
    editItem(id)
  }

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>
        {doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}
      </h2>

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
                <button
                  className={styles.taskBtn}
                  onClick={() => handleEdit(item.id)}
                >
                  🖊️
                </button>
                <button
                  className={styles.taskBtn}
                  onClick={() => deleteTodoList(item.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
