import axios from 'axios';

const as = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});
as.interceptors.request.use(config => {
  config.headers['content-type'] = 'application/json; charset=UTF-8'
  return config
})

as.interceptors.response.use(
  response => response.data,
  err => Promise.resolve(err)
)

export default as
