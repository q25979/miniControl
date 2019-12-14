<template>
  <d2-container>
    <template slot="header">信息列表</template>
    <template>
      <el-button-group class="ys-mb__10">
        <router-link to="/add" class="el-button--small" type="primary" tag="el-button">添加信息</router-link>
        <el-button size="small" type="danger" @click="allClose">一键关闭</el-button>
        <el-button size="small" type="danger" @click="deleteData(selectRow)">批量删除</el-button>
      </el-button-group>
      <el-button-group class="ys-mb__10 ys-ml__10">
        <el-input
          size="small"
          type="text"
          v-model="uid"
          placeholder="请输入主控编号">
          <el-button @click="search" slot="append" size="small" icon="el-icon-search"></el-button>
        </el-input>
      </el-button-group>
      <el-button-group class="ys-mb__10 d2-fr">
        <el-button
          @click="userData"
          type="primary"
          icon="el-icon-refresh-right"
          size="small">
        </el-button>
      </el-button-group>

      <el-table
        v-loading="loading"
        border
        size="mini"
        height="600"
        @selection-change="handleSelectChange"
        :data="userlist">
          <el-table-column
            type="selection"
            align="center"
            width="45">
          </el-table-column>
          <el-table-column
            sortable
            width="70"
            prop="number"
            align="center"
            label="主控编号">
          </el-table-column>
          <el-table-column
            width="120"
            prop="name"
            align="center"
            label="项目名称">
          </el-table-column>
          <el-table-column
            width="135"
            prop="login_user"
            align="center"
            label="登录账号">
          </el-table-column>
          <el-table-column
            width="80"
            prop="login_pass"
            align="center"
            label="登录密码">
          </el-table-column>
          <el-table-column
            width="80"
            prop="type"
            align="center"
            label="项目类型">
          </el-table-column>
          <el-table-column
            width="70"
            prop="is_online_name"
            align="center"
            label="是否上线">
            <template slot-scope="scope">
              <el-button
                @click="updateData({ id: scope.row.id, is_online: scope.row.is_online === '1' ? 0 : 1 })"
                size="mini"
                :type="scope.row.is_online_name === '是' ? 'success' : 'danger'"
                disable-transitions>{{scope.row.is_online_name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            width="70"
            prop="is_pass_name"
            align="center"
            label="审核通过">
            <template slot-scope="scope">
              <el-button
                @click="updateData({ id: scope.row.id, is_pass: scope.row.is_pass === '1' ? 0 : 1 })"
                size="mini"
                :type="scope.row.is_pass_name === '是' ? 'success' : 'danger'"
                disable-transitions>{{scope.row.is_pass_name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            width="70"
            prop="is_settlement_name"
            align="center"
            label="是否结算">
            <template slot-scope="scope">
              <el-button
                @click="updateData({ id: scope.row.id, is_settlement: scope.row.is_settlement === '1' ? 0 : 1 })"
                size="mini"
                :type="scope.row.is_settlement_name === '是' ? 'success' : 'danger'"
                disable-transitions>{{scope.row.is_settlement_name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            width="70"
            prop="is_freeze_name"
            align="center"
            label="是否被封">
            <template slot-scope="scope">
              <el-button
                @click="updateData({ id: scope.row.id, is_freeze: scope.row.is_freeze === '1' ? 0 : 1 })"
                size="mini"
                :type="scope.row.is_freeze_name === '是' ? 'success' : 'danger'"
                disable-transitions>{{scope.row.is_freeze_name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            width="70"
            prop="img"
            align="center"
            label="项目分类">
          </el-table-column>
          <el-table-column
            prop="check_time"
            align="center"
            label="审核时间">
          </el-table-column>
          <el-table-column
            width="160"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
              <el-button size="mini" @click="deleteData(scope.row.id)" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin: 10px 0;"
          :current-page="optionData.page"
          @current-change="pageChange"
          @size-change="sizeChange"
          :page-sizes="pageSizes"
          :page-size="optionData.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"></el-pagination>
    </template>
  </d2-container>
</template>

<script>
import { userlist, msgupdate, deleted, allclose, searchByNumner } from '@/api/user'

export default {
  name: 'userlist',
  data () {
    return {
      uid: '', // 搜索id
      pageSizes: [30, 60, 90, 120, 1000],
      total: 0,
      userlist: [],
      optionData: {
        page: 1,
        limit: 30
      },
      loading: true,
      selectRow: ''
    }
  },

  created () {
    this.userData()
  },

  methods: {
    search () {
      searchByNumner({ id: this.uid })
        .then(res => {
          this.userlist = res.data
          this.total = res.count
        })
        .catch(err => {
          console.log(err)
        })
    },

    pageChange (val) {
      this.optionData.page = val
      this.userData()
    },

    sizeChange (val) {
      this.optionData.limit = val
      this.optionData.page = 1
      this.userData()
    },

    handleSelectChange (val) {
      var idString = ''
      for (let i in val) {
        idString += val[i].id + ','
      }

      if (idString !== '') {
        this.selectRow = idString.substring(0, idString.length - 1)
      } else {
        this.selectRow = ''
      }
    },

    // 一键关闭
    allClose () {
      this.$confirm('一键关闭为关闭所有开启项目，请谨慎使用', '温馨提示', {
        showCancalButton: true,
        callback: (res) => {
          if (res === 'confirm') {
            allclose()
              .then(res => {
                if (res.code === 200) {
                  this.$message.success(res.msg)
                  this.userData()
                } else {
                  this.$message.warning(res.msg)
                }
              })
              .catch(err => {
                console.log('err:', err)
              })
          }
        }
      })
    },

    // 删除
    deleteData (id) {
      var idlist = id.split(',')

      if (id.length === 0) {
        this.$message.error('请选择要删除的数据')
        return false
      }

      this.$confirm('删除的数据不可恢复，确认删除？', '提示', {
        showCancalButton: true,
        callback: (res) => {
          if (res === 'confirm') {
            for (var i in idlist) {
              deleted({ id: idlist[i] })
                .then(res => {
                  if (res.code === 200) {
                    if (parseInt(i) === idlist.length - 1) {
                      this.$message.success(res.msg)
                      this.userData()
                    }
                  } else {
                    this.$message.warning(res.msg)
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            }
          }
        }
      })
    },

    // 修改数据
    updateData (update) {
      msgupdate(update)
        .then(res => {
          this.userData()
        })
        .catch(err => {
          console.log('err:', err)
        })
    },

    // 获取用户数据
    userData () {
      this.loading = true
      userlist(this.optionData)
        .then(res => {
          this.loading = false
          if (res.code === 200) {
            this.userlist = res.data
            this.total = res.count
          }
        })
        .catch(err => {
          this.loading = false
          console.log('err:', err)
        })
    },

    // 编辑信息
    edit (id) {
      this.$router.push({
        name: 'edit',
        params: { id: id }
      })
    }
  }
}
</script>
