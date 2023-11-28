import axios, { AxiosTransformer } from '@whale2002/ts-axios'
import qs from 'qs'

const instance = axios.create({
  transformRequest: [
    function (data) {
      return qs.stringify(data)
    },
    ...(axios.defaults.transformRequest as AxiosTransformer[]),
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function (data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    },
  ],
})

instance({
  url: 'http://127.0.0.1:8000/config/post',
  method: 'post',
  data: {
    a: 1,
  },
}).then((res) => {
  console.log(res.data)
})
