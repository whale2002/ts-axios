# ts-axios

[![NPM version](https://img.shields.io/npm/v/@whale2002/ts-axios.svg?style=flat)](https://npmjs.org/package/@whale2002/ts-axios)
[![NPM downloads](http://img.shields.io/npm/dm/@whale2002/ts-axios.svg?style=flat)](https://npmjs.org/package/@whale2002/ts-axios)

## Develop

```bash
pnpm install
```

```bash
pnpm run dev
pnpm run build
```

```bash
nrm use npm
npm publish
```

## TODO

- 在浏览器端使用 XMLHttpRequest 对象通讯
- 支持 Promise API
- 支持请求和响应的拦截器
- 支持请求数据和响应数据的转换
- 支持请求的取消
- JSON 数据的自动转换
- 客户端防止 XSRF

## 步骤

- 对请求 config 进行处理，包括 url, header, body
- 发起请求 xhr
- 处理响应
- 异常处理
- 接口扩展
- 拦截器的设计与实现
- 配置化实现
- 取消请求实现

## LICENSE

MIT
