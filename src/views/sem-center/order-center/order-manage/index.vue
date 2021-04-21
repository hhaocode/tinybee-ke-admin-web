<template>
  <div class="page">
    <div class="page-panel">
      <div>
        <el-form @submit.prevent.stop :inline="true">
          <el-form-item label="商品名称">
            <el-input v-model="queryParam.kw" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-date-picker
              v-model="queryParam.time"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="queryParam.orderStatus">
              <el-option value="" label="请选择订单状态"></el-option>
              <el-option v-for="(value, key, index) in orderStatusMap" :key="index" :value="key" :label="value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleQuery">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <tiny-bee-table action="/sem/order/page" ref="orderTable">
          <template slot-scope="{rows}">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column type="expand">
              <template slot-scope="{row}">
                <el-table :data="row.orderItems">
                  <el-table-column label="标题" prop="title"></el-table-column>
                  <el-table-column label="封面" prop="coverUrl">
                    <template slot-scope="{row}">
                      <el-image style="width:80px; height: 45px;" :src="row.coverUrl" :preview-src-list="images(rows)"></el-image>
                    </template>
                  </el-table-column>
                  <el-table-column label="售价（元）" prop="price"></el-table-column>
                  <el-table-column label="实付（元）" prop="actualPrice"></el-table-column>
                  <el-table-column label="操作"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column label="下单时间" prop="orderTime">
              <template slot-scope="{row}">
                <div>{{row.orderTime.replace(/[T]/, ' ')}}</div>
              </template>
            </el-table-column>
            <el-table-column label="订单状态" prop="orderStatus">
              <template slot-scope="{row}">
                <div>{{orderStatusMap[row.orderStatus]}}</div>
              </template>
            </el-table-column>
            <el-table-column label="售价（元）" prop="amount"></el-table-column>
            <el-table-column label="实付（元）" prop="actualAmount"></el-table-column>
            <el-table-column label="卖家">
              <template slot-scope="{row}">
                <div>{{row.user && row.user.username || '-'}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="">
              <template>
                <el-button>删除</el-button>
              </template>
            </el-table-column>
          </template>
        </tiny-bee-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'order-manage',
  computed: {
    ...mapState({
      orderStatusMap: state => state.common.orderStatusMap
    })
  },
  data () {
    return {
      queryParam: {
        kw: '',
        startTime: '',
        endTime: '',
        time: '',
        orderStatus: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  watch: {
    'queryParam.time': (newVal) => {
      if (!newVal || !newVal.length) {
        this.queryParam.startTime = ''
        this.queryParam.endTime = ''
      } else {
        this.queryParam.startTime = newVal[0]
        this.queryParam.startTime = newVal[1]
      }
    }
  },
  mounted () {
    this.handleQuery()
  },
  methods: {
    handleQuery () {
      this.$refs.orderTable.query(this.queryParam)
    },
    images (rows) {
      const images = []
      rows.forEach(v => {
        if (v.orderItems) {
          v.orderItems.forEach(o => {
            images.push(o.coverUrl)
          })
        }
      })
      return images
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
