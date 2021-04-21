<template>
  <div class="page">
    <div class="page-panel">
      <div>
        <el-form inline @submit.stop.prevent>
          <el-form-item>
            <el-input v-model="tableParam.mobile" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form>
      </div>
      <div>
        <tiny-bee-table action="/ums/user/page" ref="table">
          <template slot-scope="{rows}">
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="昵称" prop="nickname"></el-table-column>
            <el-table-column label="手机号码" prop="mobile"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="帐号启用状态" prop="available">
              <template slot-scope="{row}">
                <el-switch v-model="row.available" disabled @change="handleAvailable($event,row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="头像" prop="avatar">
              <template slot-scope="{row}">
                <el-image style="height：80px; width: 80px;" :src="row.avatar" :preview-src-list="rows.map(v => v.avatar)"></el-image>
              </template>
            </el-table-column>
            <el-table-column label="性别" prop="gender">
              <template slot-scope="{row}">
                <span>{{genderMap[row.gender]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户来源" prop="sourceType">
              <template slot-scope="{row}">
                <span>{{sourceTypeMap[row.sourceType]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{row}">
                <el-button type="text" @click="handlePreview(row)">
                  <el-link type="primary" :underline="false">查看详情</el-link>
                </el-button>
              </template>
            </el-table-column>
          </template>
        </tiny-bee-table>
      </div>

    </div>
    <el-dialog title="学员详情" :visible.sync="dialogVisiable" width="900px">
      <div class="dialog-body">
        <el-form inline @submit.stop.prevent label-suffix=": ">
          <el-form-item label="ID">
            <span class="item">{{user.id}}</span>
          </el-form-item>
          <el-form-item label="头像">
            <span class="item"><el-image style="height:80px;width:80px;" :src="user.avatar"></el-image></span>
          </el-form-item>
          <el-form-item label="用户名">
            <span class="item">{{user.username}}</span>
          </el-form-item>
          <el-form-item label="昵称">
            <span class="item">{{user.nickname}}</span>
          </el-form-item>
          <el-form-item label="手机号码">
            <span class="item">{{user.mobile}}</span>
          </el-form-item>
          <el-form-item label="邮箱">
            <span class="item">{{user.email}}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span class="item">{{genderMap[user.gender]}}</span>
          </el-form-item>
          <el-form-item label="生日">
            <span class="item">{{user.birthday}}</span>
          </el-form-item>
          <el-form-item label="城市">
            <span class="item">{{user.city}}</span>
          </el-form-item>
          <el-form-item label="职业">
            <span class="item">{{user.job}}</span>
          </el-form-item>
          <el-form-item label="用户来源">
            <span class="item">{{sourceTypeMap[user.sourceType]}}</span>
          </el-form-item>
          <el-form-item label="注册时间">
            <span class="item">{{user.createTime}}</span>
          </el-form-item>
          <el-form-item label="个性签名">
            <span class="item">{{user.signature}}</span>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisiable = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'user-manage',
  data () {
    return {
      tableParam: {
        mobile: ''
      },
      sourceTypeMap: {
        1: 'PC注册',
        2: 'APP',
        3: 'PC微信登录',
        4: 'APP微信登录'
      },
      genderMap: {
        U: '保密',
        F: '女',
        M: '男'
      },
      dialogVisiable: false,
      user: ''
    }
  },
  mounted () {
    this.handleQuery()
  },
  methods: {
    handleQuery () {
      this.$refs.table.search(this.tableParam)
    },
    handleAvailable (val, row) {
      // let message = ''
      // if (val) {
      //   message = '启用'
      // } else {
      //   message = '禁用'
      // }

    },
    handlePreview (row) {
      this.user = row
      this.dialogVisiable = true
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-body {
  ::v-deep {
    .el-form-item {
      width: 380px;
      .el-form-item__label {
        font-weight: 600;
      }
    }
  }
  .item {
    // display: inline-block;
  }
}
</style>
