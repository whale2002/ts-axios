import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: 'http://localhost:8000/base/get',
//   params: {
//     foo: ['bar', 'baz'],
//   },
// })

// axios({
//   method: 'get',
//   url: 'http://localhost:8000/base/get',
//   params: {
//     foo: {
//       bar: 'baz',
//     },
//   },
// })

// const date = new Date()

// axios({
//   method: 'get',
//   url: 'http://localhost:8000/base/get',
//   params: {
//     date,
//   },
// })

// axios({
//   method: 'get',
//   url: 'http://localhost:8000/base/get',
//   params: {
//     foo: '@:$, ',
//   },
// })

// axios({
//   method: 'get',
//   url: 'http://localhost:8000/base/get',
//   params: {
//     foo: 'bar',
//     baz: null,
//   },
// })

// axios({
//   method: 'get',
//   url: 'http://localhost:8000/base/get#hash',
//   params: {
//     foo: 'bar',
//   },
// })

// axios({
//   method: 'get',
//   url: 'http://localhost:8000/base/get?foo=bar',
//   params: {
//     bar: 'baz',
//   },
// })

// axios({
//   method: 'post',
//   url: 'http://localhost:8000/base/post',
//   headers: {
//     'content-type': 'application/json',
//   },
//   data: {
//     a: 1,
//     b: 2,
//     c: 3,
//   },
// })

// const arr = new Int32Array([21, 31])
// axios({
//   method: 'post',
//   url: 'http://localhost:8000/base/buffer',
//   data: arr,
// })

// axios({
//   method: 'post',
//   url: 'http://localhost:8000/base/post',
//   data: {
//     a: 1,
//     b: 2,
//   },
// }).then((res) => {
//   console.log(res)
// })

axios({
  method: 'post',
  url: 'http://localhost:8000/base/post',
  data: {
    a: 1,
    b: 2,
  },
}).then((res) => {
  console.log(res)
})

// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)

// axios({
//   method: 'post',
//   url: 'http://localhost:8000/base/post',
//   data: searchParams,
// })
