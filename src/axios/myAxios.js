import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const baseUrl = 'https://localhost:7777' //process.env.BASE_API_URL
const instance = axios.create({
  baseURL: baseUrl + '/'
})

instance.interceptors.request.use((config) => {
  config.headers['Authorization'] = 'Bearer ' + cookies.get('access_token')
  config.baseURL = baseUrl + '/'
  return config
})
//
// instance.defaults.headers.common['Authorization'] = () => {
//   const token = 'Bearer ' + cookies.get('access_token')
//   console.log("TOKENAXIOS: " + token)
//   return token
// };
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response.status
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default instance