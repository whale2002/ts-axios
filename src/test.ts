function isString(input: any): input is string {
  return typeof input === 'string'
}

function foo(input: string | number) {
  if (isString(input)) {
    // 类型“string | number”上不存在属性“replace”。
    input.replace('linbudu', 'linbudu599')
  }
  if (typeof input === 'number') {
  }
  // ...
}
