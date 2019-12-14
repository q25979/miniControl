<style lang="scss">
  .el-form {
    width: 500px;
    margin: 0 auto;
  }
</style>

<template>
  <d2-container>
    <template slot="header">识别信息</template>
    <template v-loadig="loading">
      <el-form label-width="80px">
        <el-form-item label="qp标识">
          <el-input value="qp">
          </el-input>
        </el-form-item>

        <el-form-item label="cp标识">
          <el-input value="cp">
          </el-input>
        </el-form-item>

        <el-form-item label="qp标识1">
          <el-input value="qp1">
          </el-input>
        </el-form-item>
      </el-form>
    </template>
  </d2-container>
</template>

<script>
export default {
  name: 'useradd',
  data () {
    return {
    }
  },

  created () {
  },

  methods: {
  }
}
</script>
