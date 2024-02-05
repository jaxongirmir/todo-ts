import { ChangeEvent, useState } from 'react'
import styles from './home.module.css'
import { IData } from './interfaces'
import { data } from './costants'

export const App = (): JSX.Element => {
  const [title, setTitle] = useState<string>('')
  const [arr, setArr] = useState<IData[]>(data)
  const changeHandler = (evt: ChangeEvent<HTMLInputElement>): void => {
    setTitle(evt.target.value)
  }

  const handleSubmit = (): void => {
    if (!title?.length) return
    const newData = {
      title,
      id: new Date().getTime(),
      description: 'description',
    }
    setArr([...arr, newData])
    setTitle('')
  }

  const deleteItem = (id: number): void => {
    const newData = arr.filter(c => c.id !== id)
    setArr(newData)
  }

  return (
    <div className={styles.todo}>
      <h2 className={styles.title}>App Todo</h2>
      <input
        value={title}
        onChange={changeHandler}
        type="text"
        placeholder="Enter todo"
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.button}>
        Add Todo
      </button>
      <div className={`${styles.card} ${styles.scrollable}`}>
        {arr.map(c => (
          <div key={c.id} className={styles.cardItem}>
            <p>{c.title}</p>
            <div className={styles.delBtn}>
              <button onClick={() => deleteItem(c.id)}>Del</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
