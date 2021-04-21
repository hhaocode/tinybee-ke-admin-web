<template>
  <div class="page">
    <div class="page-panel">
      <div>
        <el-form @submit.native.prevent inline>
          <el-form-item>
            <el-button>添加训练营</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="subjects && subjects.length">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" v-for="item in subjects" :key="item.id">
            <el-card :body-style="{ padding: '0px', }" style="margin-bottom: 30px; border-radius: 8px; cursor: pointer;" shadow="hover">
              <div class="subject-item flex ">
                <div></div>
                <div class="detail">
                  <div class="title">{{item.title}}</div>
                  <div class="subtitle">
                    {{item.subtitle}}
                  </div>
                  <div class="info">{{item.info}}</div>
                  <div class="sale">
                    <span>￥</span><span class="price">{{item.price}}</span>
                    <span class="market-price">￥{{item.marketPrice}}</span>
                  </div>
                  <div>
                    <el-button>编辑</el-button>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div>
        <no-data :no-data="!(subjects && subjects.length)" text="暂无学习路径"></no-data>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      subjects: [
        {
          title: 'Go 进阶训练营',
          subtitle: '抢占先机，成为未来 3 年抢手的后端开发人才',
          info: '掌握云计算时代首选编程语言，成为抢手的后端开发人才！',
          price: '2999',
          marketPrice: '4999',
          currentPeriod: '',
          classOrder: 1,
          classOrderTitle: '第1期',
          beginTime: 1618211277
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.subject-item {
  padding: 20px;
  .detail {
    .title {
      max-width: 267px;
      font-size: 20px;
      font-weight: 500;
      line-height: 22px;
      color: #404040;
    }
    .time {
      flex-shrink: 0;
      display: flex;
      padding: 5px 10px 4px;
      margin-left: 10px;
      background: #fbf5ee;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 500;
      color: #fa8919;
    }
    .subtitle {
      max-width: 400px;
      height: 14px;
      padding-top: 10px;
      font-size: 14px;
      color: #888;
    }
    .info {
      height: 40px;
      padding-top: 17px;
      font-size: 14px;
      color: #b2b2b2;
      line-height: 20px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .sale {
      justify-content: space-between;
      // height: 30px;
      padding-top: 21px;
      padding-bottom: 15px;
      .price {
        font-size: 24px;
        font-weight: 500;
        color: #fa8919;
      }
      .market-price {
        padding-left: 6px;
        font-size: 16px;
        color: #b2b2b2;
        text-decoration: line-through;
      }
    }
  }
}
</style>
