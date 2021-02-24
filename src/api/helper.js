import axios from 'axios'
const ERR_OK = 0

const urlMap = {
  development: '/',
  production: 'http://8.136.112.243/'
}
const baseUrl = urlMap[process.env.NODE_ENV]

export function get(url) {
  return function (params) {
    return axios.get(baseUrl + url, { params }).then(function (res) {
      const { errno, data } = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch(() => { })
  }
}