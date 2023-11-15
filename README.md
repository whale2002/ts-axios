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

## TODO

- 在浏览器端使用 XMLHttpRequest 对象通讯
- 支持 Promise API
- 支持请求和响应的拦截器
- 支持请求数据和响应数据的转换
- 支持请求的取消
- JSON 数据的自动转换
- 客户端防止 XSRF

## 步骤

对请求 config 进行处理，包括 url, header, body

- 拼接 url
- 处理 header [注意含有 data 并且 data 是对象时，一般为 post 请求, 需要设置 Content-Type 为 application/json ]
- 处理 body，是原对象的时候需要序列化

发起请求 xhr

处理响应

- 处理响应体 反序列化
- 处理响应 header 反序列化

异常处理

- 网络异常 onError
- 超时异常 onTimeout
- 非 2xx 状态码
- 创建 AxiosError 类

接口扩展

- 扩展接口 axios 混合对象，支持方法调用和函数调用
- 相应数据支持泛型

拦截器的设计与实现

配置化实现

- 合并配置 内置配置和用户配置, 合并策略
- 请求和相应配置化
- axios.create

## LICENSE

MIT
