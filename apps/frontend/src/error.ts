import axios from '@whale2002/ts-axios'
import type { AxiosError } from '@whale2002/ts-axios'

// 地址不存在，返回404
axios({
  method: 'get',
  url: 'http://localhost:8000/error/get1',
})
  .then((res) => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e)
  })

axios({
  method: 'get',
  url: 'http://localhost:8000/error/get',
})
  .then((res) => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e)
  })

setTimeout(() => {
  axios({
    method: 'get',
    url: 'http://localhost:8000/error/get',
  })
    .then((res) => {
      console.log(res)
    })
    .catch((e: AxiosError) => {
      console.log(e)
    })
}, 5000)

axios({
  method: 'get',
  url: 'http://localhost:8000/error/timeout',
  timeout: 2000,
})
  .then((res) => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.message)
  })
