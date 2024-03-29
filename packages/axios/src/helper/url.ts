import { isDate, isObject, isURLSearchParams, encode } from './utils'

/**
 * 将请求参数拼接到url上
 * @param url 发请求的url
 * @param params 请求参数
 * @returns 拼接后的url
 */
export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string,
): string {
  if (!params) {
    return url
  }
  let joinedParams

  if (paramsSerializer) {
    joinedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    joinedParams = params.toString()
  } else {
    const parts: string[] = []
    Object.keys(params).forEach((key) => {
      const val = params[key]
      if (val === null || typeof val === 'undefined') {
        return
      }
      let values = []
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }
      values.forEach((val) => {
        if (isDate(val)) {
          val = val.toISOString()
        } else if (isObject(val)) {
          val = JSON.stringify(val)
        }
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })
    joinedParams = parts.join('&')
  }

  if (joinedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + joinedParams
  }

  return url
}

interface URLOrigin {
  protocol: string
  host: string
}

export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol &&
    parsedOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host,
  }
}

export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL
}
