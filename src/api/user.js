import { fetchGetToken, fetchPostToken } from '@/plugin/axios'

export const userinfo = () => {
  return fetchGetToken('/api/userinfo.php')
}

export const userlist = (params) => {
  return fetchGetToken('/api/msglist.php', params)
}

export const msgadd = (params) => {
  return fetchPostToken('/api/msgadd.php', params)
}

export const findByIdInfoData = (params) => {
  return fetchGetToken('/api/findByIdInfo.php', params)
}

export const msgupdate = (params) => {
  return fetchPostToken('/api/msgupdate.php', params)
}

export const deleted = (params) => {
  return fetchPostToken('/api/deleted.php', params)
}

export const allclose = () => {
  return fetchPostToken('/api/allclose.php')
}

export const searchByNumner = (params) => {
  return fetchGetToken('/api/searchByNumber.php', params)
}
