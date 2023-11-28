import axios from '@whale2002/ts-axios'
import type { Canceler } from '@whale2002/ts-axios'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios
  .get('http://127.0.0.1:8000/cancel/get', {
    cancelToken: source.token,
  })
  .catch(function (e) {
    if (axios.isCancel(e)) {
      console.log('Request canceled', e.message)
    }
  })

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  axios
    .post(
      'http://localhost:8000/cancel/post',
      { a: 1 },
      { cancelToken: source.token },
    )
    .catch(function (e) {
      if (axios.isCancel(e)) {
        console.log(e.message)
      }
    })
}, 100)

let cancel: Canceler

axios
  .get('http://localhost:8000/cancel/get', {
    cancelToken: new CancelToken((c) => {
      cancel = c
    }),
  })
  .catch(function (e) {
    if (axios.isCancel(e)) {
      console.log('Request canceled')
    }
  })

setTimeout(() => {
  cancel()
}, 200)
