import axios from '@whale2002/ts-axios'

// axios
//   .post(
//     'http://localhost:8088/more/server2',
//     {},
//     {
//       withCredentials: true,
//     },
//   )
//   .then((res) => {
//     console.log(res.data)
//   })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

