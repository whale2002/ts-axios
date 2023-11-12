import { useEffect, useState } from 'react'
import axios from '../../src/index';

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios({
      url: 'http://localhost:8000/simple/get',
      method: 'get',
      params: {
        foo: 123
      }
    })
  }, [])

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  )
}

export default App
