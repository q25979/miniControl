<style lang="scss">
  .el-form {
    width: 500px;
    margin: 0 auto;
  }
</style>

<template>
  <d2-container>
    <template slot="header">信息编辑</template>
    <template v-loadig="loading">
      <el-form label-width="80px" :model="addUserData" :rules="rules" ref="addUserForm">
        <el-form-item label="主控编号" prop="number">
          <el-input
            clearable
            placeholder="请输入主控编号"
            v-model="addUserData.number">
          </el-input>
        </el-form-item>

        <el-form-item label="项目名称" prop="name">
          <el-input
            clearable
            placeholder="请输入项目名称"
            v-model="addUserData.name">
          </el-input>
        </el-form-item>

        <el-form-item label="登录账号" prop="login_user">
          <el-input
            clearable
            placeholder="请输入登录账号"
            v-model="addUserData.login_user">
          </el-input>
        </el-form-item>

        <el-form-item label="登录密码" prop="login_pass">
          <el-input
            clearable
            placeholder="请输入登录密码"
            v-model="addUserData.login_pass">
          </el-input>
        </el-form-item>

        <el-form-item label="项目类型" prop="type">
          <el-input
            clearable
            placeholder="项目类型不能为空"
            v-model="addUserData.type">
          </el-input>
        </el-form-item>

        <el-form-item label="是否上线" prop="is_online">
          <el-select v-model="addUserData.is_online" placeholder="请选择">
            <el-option
              v-for="item in onlineData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="审核通过" prop="is_pass">
          <el-select v-model="addUserData.is_pass" placeholder="请选择">
            <el-option
              v-for="item in passData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否结算" prop="is_settlement">
          <el-select v-model="addUserData.is_settlement" placeholder="请选择">
            <el-option
              v-for="item in settlementData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否被封" prop="is_settlement">
          <el-select v-model="addUserData.is_settlement" placeholder="请选择">
            <el-option
              v-for="item in freezeData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目分类" prop="img">
          <el-input
            clearable
            v-model="addUserData.img">
          </el-input>
        </el-form-item>

        <el-form-item label="审核时间" prop="check_time">
          <el-date-picker
            clearable
            placeholder="请选择审核时间"
            type="date"
            v-model="addUserData.check_time">
            <i slot="suffix" class="el-input__icon el-icon-date"></i>
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addUser('addUserForm')">更新数据</el-button>
          <el-button @click="resetData('addUserForm')">数据重置</el-button>
        </el-form-item>
      </el-form>
    </template>
  </d2-container>
</template>

<script>
import { msgupdate, findByIdInfoData } from '@/api/user'

export default {
  name: 'useradd',
  data () {
    return {
      id: 0,
      loading: false,
      addUserData: {
        number: '',
        name: '',
        login_user: '',
        login_pass: '',
        type: 'QQ小程序',
        is_online: 0,
        is_pass: 0,
        img: '',
        is_settlement: 0,
        check_time: ''
      },
      onlineData: [{
        value: 0,
        label: '否'
      }, {
        value: 1,
        label: '是'
      }],
      passData: [{
        value: 0,
        label: '否'
      }, {
        value: 1,
        label: '是'
      }],
      settlementData: [{
        value: 0,
        label: '否'
      }, {
        value: 1,
        label: '是'
      }],
      freezeData: [{
        value: 0,
        label: '否'
      }, {
        value: 1,
        label: '是'
      }],

      rules: {
        number: [
          { required: true, message: '主控编号不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '项目名称不能为空', trigger: 'blur' }
        ],
        login_user: [
          { required: true, message: '登录账号不能为空', trigger: 'blur' }
        ],
        login_pass: [
          { required: true, message: '登录密码不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '项目类型不能为空', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '请选择图片地址', trigger: 'blur' }
        ],
        check_time: [
          { required: true, message: '请选择审核时间', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.id = this.$route.params.id
    console.log(this.id)
    this.findByIdInfo()
  },

  methods: {
    // 数据重置
    resetData (formName) {
      this.$refs[formName].resetFields()
    },

    // 获取数据
    findByIdInfo () {
      findByIdInfoData({ id: this.id })
        .then(res => {
          this.addUserData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 添加用户
    addUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.addUserData.id = this.id
          msgupdate(this.addUserData)
            .then(res => {
              this.loading = false
              let type = res.code === 200 ? 'success' : 'warning'
              this.$message({ message: res.msg, type: type, showClose: true })
            })
            .catch(err => {
              this.loading = false
              console.log('err:', err)
            })
        } else {
          this.$message({ message: '请检查必填信息', type: 'warning', showClose: true })
        }
      })
    }
  }
}
</script>
