import axios, { Canceler } from '../../src'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

console.log(axios);

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
    .post('/cancel/post', { a: 1 }, { cancelToken: source.token })
    .catch(function (e) {
      if (axios.isCancel(e)) {
        console.log(e.message)
      }
    })
}, 100)

let cancel: Canceler

axios
  .get('/cancel/get', {
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
