import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

const Input = forwardRef<{ type: () => void }>((props, ref) => {
  console.log(props)
  const [value, setValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const type = () => {
    let numberIndex = 0
    const initalString = 'Phan Thế Cường'
    inputRef.current?.focus()

    let interval: any = setInterval(() => {
      setValue(initalString.slice(0, numberIndex))
      if (numberIndex === initalString.length) {
        return clearInterval(interval)
      }
      numberIndex++
    }, 100)
  }
  useImperativeHandle(ref, () => {
    return { type }
  })
  return (
    <input
      type='text'
      placeholder='type something'
      value={value}
      onChange={() => {}}
      ref={inputRef}
    />
  )
})

export default function AutoInput() {
  const refHandleType = useRef<{ type: () => void }>({ type: () => {} })
  const clickMe = () => {
    refHandleType.current.type()
    console.log('ss', refHandleType.current)
  }

  return (
    <div>
      <div>
        <button onClick={clickMe}>Click to type</button>
      </div>
      <Input ref={refHandleType} />
    </div>
  )
}
