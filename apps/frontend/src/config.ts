import axios from '@whale2002/ts-axios'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123

axios({
  url: 'http://localhost:8000/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1,
  }),
  headers: {
    test: '321',
  },
}).then((res) => {
  console.log(res.data)
})
