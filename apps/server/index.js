const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const multipart = require('connect-multiparty')
const atob = require('atob')
const path = require('path')
const cors = require('cors')
const SERVER_PORT = 8000

const app = express()

// 在注册路由之前注册 cors 中间价
app.use(
  cors({
    methods: ['GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS'],
  }),
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  multipart({
    uploadDir: path.resolve(__dirname, 'upload'),
  }),
)

const router = express.Router()

registerSimpleRouter()

registerBaseRouter()

registerErrorRouter()

registerExtendRouter()

registerInterceptorRouter()

registerConfigRouter()

registerCancelRouter()

registerMoreRouter()

app.use(router)

app.listen(SERVER_PORT, () => {
  console.log(
    `Server listening on http://localhost:${SERVER_PORT}, Ctrl + C to stop`,
  )
})

function registerSimpleRouter() {
  router.get('/simple/get', function (req, res) {
    res.json({
      msg: `hello world`,
    })
  })
}

function registerBaseRouter() {
  router.get('/base/get', function (req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function (req, res) {
    res.json(req.body)
  })

  router.post('/base/buffer', function (req, res) {
    let msg = []
    req.on('data', (chunk) => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

function registerErrorRouter() {
  router.get('/error/get', function (req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`,
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function (req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`,
      })
    }, 3000)
  })
}

function registerExtendRouter() {
  router.get('/extend/get', function (req, res) {
    res.json({
      msg: 'hello world',
    })
  })

  router.options('/extend/options', function (req, res) {
    res.end()
  })

  router.delete('/extend/delete', function (req, res) {
    res.end()
  })

  router.head('/extend/head', function (req, res) {
    res.end()
  })

  router.post('/extend/post', function (req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function (req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function (req, res) {
    res.json(req.body)
  })

  router.get('/extend/user', function (req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age: 18,
      },
    })
  })
}

function registerInterceptorRouter() {
  router.get('/interceptor/get', function (req, res) {
    res.end('hello')
  })
}

function registerConfigRouter() {
  router.post('/config/post', function (req, res) {
    res.json(req.body)
  })
}

function registerCancelRouter() {
  router.get('/cancel/get', function (req, res) {
    setTimeout(() => {
      res.json('hello')
    }, 1000)
  })

  router.post('/cancel/post', function (req, res) {
    setTimeout(() => {
      res.json(req.body)
    }, 1000)
  })
}

function registerMoreRouter() {
  router.get('/more/get', function (req, res) {
    res.end(req.url)
  })

  router.post('/more/upload', function (req, res) {
    console.log(req.body, req.files)
    res.end('upload success!')
  })

  router.post('/more/post', function (req, res) {
    const auth = req.headers.authorization
    const [type, credentials] = auth.split(' ')
    console.log(atob(credentials))
    const [username, password] = atob(credentials).split(':')
    if (type === 'Basic' && username === 'Yee' && password === '123456') {
      res.json(req.body)
    } else {
      res.status(401)
      res.end('UnAuthorization')
    }
  })

  router.get('/more/304', function (req, res) {
    res.status(304)
    res.end()
  })

  router.get('/more/A', function (req, res) {
    res.end('A')
  })

  router.get('/more/B', function (req, res) {
    res.end('B')
  })
}
