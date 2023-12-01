import axios, { AxiosError } from '@whale2002/ts-axios'
import qs from 'qs'
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
// const instance4 = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D',
// })

const instance1 = axios.create()

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}
const update = (e: ProgressEvent) => {
  console.log(e)
  NProgress.set(calculatePercentage(e.loaded, e.total))
}

instance1.defaults.onDownloadProgress = update
instance1.defaults.onUploadProgress = update

instance1.interceptors.request.use((config) => {
  NProgress.start()
  return config
})
instance1.interceptors.response.use(
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

axios
  .get('http://localhost:8000/more/304')
  .then((res) => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.message)
  })

axios
  .get('http://localhost:8000/more/304', {
    validateStatus(status) {
      return status >= 200 && status < 400
    },
  })
  .then((res) => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.message)
  })

axios
  .get('http://localhost:8000/more/get', {
    params: new URLSearchParams('a=b&c=d'),
  })
  .then((res) => {
    console.log(res)
  })

axios
  .get('http://localhost:8000/more/get', {
    params: {
      a: 1,
      b: 2,
      c: ['a', 'b', 'c'],
    },
  })
  .then((res) => {
    console.log(res)
  })

const instance = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  },
})

instance
  .get('http://localhost:8000/more/get', {
    params: {
      a: 1,
      b: 2,
      c: ['a', 'b', 'c'],
    },
  })
  .then((res) => {
    console.log(res)
  })

const instance3 = axios.create({
  baseURL: 'https://img.mukewang.com/',
})

instance3.get('5cc01a7b0001a33718720632.jpg')

instance3.get(
  'https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg',
)

function getA() {
  return axios.get('http://localhost:8000/more/A')
}

function getB() {
  return axios.get('http://localhost:8000/more/B')
}

axios.all([getA(), getB()]).then(
  axios.spread(function (resA, resB) {
    console.log(resA.data)
    console.log(resB.data)
  }),
)

axios.all([getA(), getB()]).then(([resA, resB]) => {
  console.log(resA.data)
  console.log(resB.data)
})

const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest',
  },
}
console.log(axios.getUri(fakeConfig))
