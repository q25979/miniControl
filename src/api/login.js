import { fetchPost } from '@/plugin/axios'

export const login = (params) => {
  return fetchPost('/api/login.php', params)
}
