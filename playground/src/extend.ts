import axios from '../../src'

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
