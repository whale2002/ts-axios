import axios from '@whale2002/ts-axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })

const instance = axios.create()

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}
const update = (e: ProgressEvent) => {
  console.log(e)
  NProgress.set(calculatePercentage(e.loaded, e.total))
}

instance.defaults.onDownloadProgress = update
instance.defaults.onUploadProgress = update

instance.interceptors.request.use((config) => {
  NProgress.start()
  return config
})
instance.interceptors.response.use(
  (response) => {
    NProgress.done()
    return response
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error)
  },
)

const downloadEl = document.getElementById('download')

downloadEl!.addEventListener('click', () => {
  instance.get(
    'https://tse2-mm.cn.bing.net/th/id/OIP-C.pcF-pi7T_WRbEaXvb2LW4gHaD8?w=328&h=180&c=7&r=0&o=5&pid=1.7',
  )
})

const uploadEl = document.getElementById('upload')

uploadEl!.addEventListener('click', () => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if (fileEl.files) {
    data.append('file', fileEl.files[0])

    instance.post('http://localhost:8000/more/upload', data)
  }
})

axios
  .post(
    'http://localhost:8000/more/post',
    {
      a: 1,
    },
    {
      auth: {
        username: 'Yee',
        password: '123456',
      },
    },
  )
  .then((res) => {
    console.log(res)
  })
