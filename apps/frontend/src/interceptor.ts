import axios from '@whale2002/ts-axios'

axios.interceptors.request.use((config) => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use((config) => {
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use((config) => {
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use((res) => {
  res.data += '1'
  return res
})
const interceptor = axios.interceptors.response.use((res) => {
  res.data += '2'
  return res
})
axios.interceptors.response.use((res) => {
  res.data += '3'
  return res
})

axios.interceptors.response.eject(interceptor)

axios({
  url: 'http://127.0.0.1:8000/interceptor/get',
  method: 'get',
  headers: {
    test: '',
  },
}).then((res) => {
  console.log(res.data)
})
