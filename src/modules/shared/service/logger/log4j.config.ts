const path = require('path')

export const logConfig = (logPath: string) => {
  const baseLogPath = path.resolve(logPath) // 日志根目录
  const errorPath = '/error' // 错误日志目录
  const errorFileName = 'error' // 错误日志文件名
  const errorLogPath = baseLogPath + errorPath + '/' + errorFileName // 错误日志输出完整路径
  const infoPath = '/out' // 正常日志目录
  const infoPathFileName = 'out' // 正常日志文件名
  const infoPathLogPath = baseLogPath + infoPath + '/' + infoPathFileName // 正常日志输出完整路径
  return {
    appenders: {
      'rule-console': { 'type': 'console' },
      'errorLogger': {
        'type': 'dateFile',
        'filename': errorLogPath,
        'pattern': '-yyyy-MM-dd.log',
        'alwaysIncludePattern': true,
        'encoding': 'utf-8',
        'maxLogSize': 1000,
        'numBackups': 3,
        'path': errorPath
      },
      'infoLogger': {
        'type': 'dateFile',
        'filename': infoPathLogPath,
        'pattern': '-yyyy-MM-dd.log',
        'alwaysIncludePattern': true,
        'encoding': 'utf-8',
        'maxLogSize': 1000,
        'numBackups': 3,
        'path': infoPath
      }
    },
    // 供外部调用的名称和对应设置定义
    categories: {
      'default': { 'appenders': ['infoLogger', 'rule-console'], 'level': 'all' },
      'infoLogger': { 'appenders': ['infoLogger'], 'level': 'info' },
      'errorLogger': { 'appenders': ['errorLogger'], 'level': 'error' }
    },
    'baseLogPath': baseLogPath,
    pm2: true,
    pm2InstanceVar: 'INSTANCE_ID', // 如果是pm2启动，需要配置这两个参数
    disableClustering: true
  }
}