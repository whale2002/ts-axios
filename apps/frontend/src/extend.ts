import axios from '@whale2002/ts-axios'

axios({
  url: 'http://localhost:8000/extend/post',
  method: 'post',
  data: {
    msg: 'hi',
  },
})

axios.request({
  url: 'http://localhost:8000/extend/post',
  method: 'post',
  data: {
    msg: 'hello',
  },
})

axios.get('http://localhost:8000/extend/get')

axios.options('http://localhost:8000/extend/options')

axios.delete('http://localhost:8000/extend/delete')

axios.head('http://localhost:8000/extend/head')

axios.post('http://localhost:8000/extend/post', { msg: 'post' })

axios.put('http://localhost:8000/extend/put', { msg: 'put' })

axios.patch('http://localhost:8000/extend/patch', { msg: 'patch' })

axios({
  url: 'http://localhost:8000/extend/post',
  method: 'post',
  data: {
    msg: 'hi',
  },
})

axios('http://localhost:8000/extend/post', {
  method: 'post',
  data: {
    msg: 'hello',
  },
})

interface ResponseData<T> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('http://localhost:8000/extend/user').then(
    (res) => res.data,
    (e) => console.log(e),
  )
}

const user = await getUser<User>()!

if (user) {
  console.log(user.result.age)
}
