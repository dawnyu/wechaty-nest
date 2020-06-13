// 格式化响应日志
export const formatRes = (ctx) => {
  return `\n*************** response log start ***************\n
    response resTime: ${new Date()}
    response body: \n${JSON.stringify(ctx.body)}\n
    *************** response log end ***************\n`
}

// 格式化错误日志
export const formatError = (ctx, err, resTime) => {
  return `\n *************** error log start *************** \n
    ${formatReqLog(ctx.request, resTime)}
    err name:  ${err.name} \n
    err message:  ${err.message} \n
    err stack:  ${err.stack} \n
    *************** error log end *************** \n`
}

// 格式化请求日志
export const formatReqLog = (req, resTime) => {
  const method = req.method
  const params = method === 'get' ? JSON.stringify(req.query) : JSON.stringify(req.body)
  return `request method:  ${method} \n
    request originalUrl: ${req.originalUrl} \n
    request client ip: ${req.ip} \n
    request params:   ${params} \n
    request resTime: ${resTime}`
}