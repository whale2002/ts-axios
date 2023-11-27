import axios, { AxiosTransformer } from '../../src'
import qs from 'qs'

axios({
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
  url: 'http://127.0.0.1:8000/config/post',
  method: 'post',
  data: {
    a: 1,
  },
}).then((res) => {
  console.log(res.data)
})
