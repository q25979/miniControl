<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{info.user_name ? `你好 ${info.user_name}` : '未登录'}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapActions } from 'vuex'
import { userinfo } from '@/api/user'
import util from '@/libs/util'

export default {
  data () {
    return {
      info: {
        user_name: ''
      }
    }
  },
  created () {
    this.webConfig()
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    },

    // 获取登录信息
    webConfig () {
      userinfo().then(res => {
        if (res.code === 200) {
          console.log(res)
          this.info = res.data
        } else {
          util.cookies.remove('token')
          window.location.href = '/'
        }
      })
    }
  }
}
</script>
