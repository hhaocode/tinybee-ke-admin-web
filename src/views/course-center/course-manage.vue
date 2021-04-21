<template>
  <div class="page">
    <div class="page-panel">
      <div>
        <el-tabs v-model="searchForm.type" type="card">
          <el-tab-pane v-for="(value, key) in courseTypeMap" :key="key + ''" :label="value + `(${countMap[key] || 0})`" :name="key + ''"></el-tab-pane>
        </el-tabs>
      </div>
      <el-form :inline="true" :model="searchForm" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="searchForm.kw" placeholder="请输入课程标题" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.directionId" clearable>
            <el-option value="" label="选择方向"></el-option>
            <el-option v-for="direction in conditionDirections" :value="direction.value" :label="direction.label" :key="direction.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.classifyId" clearable>
            <el-option value="" label="选择分类" ></el-option>
            <el-option v-for="classify in conditionClassifies" :value="classify.value" :label="classify.label" :key="classify.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSearch" type="primary" icon="el-icon-search">查询</el-button>
          <el-button @click="handleAdd" type="primary" icon="el-icon-plus">新增</el-button>
        </el-form-item>
      </el-form>
      <div>
        <div v-if="tableData.total">
          <el-row :gutter="20" >
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="item in tableData.records" :key="item.id">
              <el-card :body-style="{ padding: '0px' }" style="margin-bottom: 30px;">
                <div class="course-item">
                  <img :src="item.coverUrl" class="image" style="width: 100%; height: 140px; ">
                  <div style="padding: 14px;">
                    <div class="ellipsis-2" style="height: 32px;">{{item.title}}</div>
                    <div>

                    </div>
                    <div style="padding: 10px 0;">
                      <p></p>
                      <el-tag :type="courseTypeTagMap[item.type]">{{courseTypeMap[item.type]}}</el-tag>
                      <!-- <p><label>分类：</label> {{item.categoryName}}</p> -->
                      <p><label>是否免费：</label> {{item.free ? '是' : '否'}}</p>
                      <p><label>总课时: </label> {{item.totalHours}}小时</p>
                      <p><label>总周期: </label> {{item.totalPeriod}}周</p>
                      <p><label>实际上架时间: </label> {{item.actualOnShelfTime}}</p>
                      <p><label>创建时间: </label> {{item.createTime}}</p>
                    </div>
                    <div class="bottom clearfix">
                      <div class="text-right">
                        <el-button @click="handleDetail(item)" type="text"><el-link type="primary">详情</el-link></el-button>
                        <el-button @click="handleEdit(item)" type="text"><el-link type="warning">编辑</el-link></el-button>
                        <el-button @click="handleDelete(item)" type="text"><el-link type="danger">删除</el-link></el-button>
                        <el-button v-if="item.status !== 2" @click="handlePutaway(item)" type="text"><el-link type="success">上架</el-link></el-button>
                        <el-button v-if="item.status === 2" @click="handleSoldout(item)" type="text"><el-link type="info">下架</el-link></el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="searchForm.page"
              :page-sizes="[6, 12, 18, 24, 30, 36]"
              :page-size="searchForm.size"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :pager-count="5"
              :total="tableData.total">
            </el-pagination>
          </div>
        </div>
        <no-data :no-data="!tableData.records || !tableData.records.length" :text="'暂无任何' + (courseTypeMap[searchForm.type] || '课程')"></no-data>
      </div>
    </div>
    <el-dialog
      title="编辑课程"
      :visible.sync="contentFormdialogVisible"
      width="1000px"
      @closed="handleDialogClosed"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <div v-loading="contentLoading">
        <el-form class="content-form" :rules="contentFormRules" :model="contentForm" ref="contentForm" @submit.native.prevent label-width="80px">
          <!-- category -->
          <div class="block-area">
              <div class="title">
                <span class="label"></span>
                <span>商品信息</span>
              </div>
              <div class="content">
                <el-form-item label="形式" prop="type">
                  <el-radio-group v-model="contentForm.type">
                    <el-radio-button v-for="(value, key) in courseTypeMap" :label="key" :key="key">{{value}}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                  <el-input v-model="contentForm.title" maxlength="50" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="讲师">
                  <lecturer-select v-model="contentForm.lecturerId"></lecturer-select>
                </el-form-item>
                <el-form-item label="方向" prop="directionId">
                  <el-checkbox-group v-model="contentForm.directionIds">
                    <el-checkbox-button v-for="direction in directions" :label="direction.id" :key="direction.id">{{direction.label}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
                <!-- classifies -->
                <el-form-item label="分类" prop="classifyId">
                  <el-checkbox-group v-model="contentForm.classifyIds">
                    <el-checkbox v-for="classify in classifies" :label="classify.id" :key="classify.id" border>{{classify.label}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="副标题" prop="subtitle">
                  <el-input v-model="contentForm.subtitle" type="textarea" maxlength="250" :rows="3" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="总课时" prop="totalHours">
                  <el-input class="fixed-width" v-model.number="contentForm.totalHours">
                    <span slot="suffix">课时</span>
                  </el-input>
                </el-form-item>
                <el-form-item label="总周期" prop="totalPeriod">
                  <el-input class="fixed-width" v-model.number="contentForm.totalPeriod">
                    <span slot="suffix">周</span>
                  </el-input>
                </el-form-item>
                <el-form-item label="封面" ref="" prop="coverUrl">
                  <image-choose v-model="contentForm.coverUrl"></image-choose>
                </el-form-item>
                <el-form-item label="背景颜色" prop="bgColor">
                  <el-color-picker v-model="contentForm.bgColor"></el-color-picker>
                </el-form-item>
                <el-form-item label="内容描述:" label-width="90px" prop="description">
                  <div>
                    <div ref="descriptionEdit"></div>
                  </div>
                </el-form-item>
              </div>
          </div>
          <div class="block-area">
            <div class="title">
              <span class="label"></span>
              <span>上架信息</span>
            </div>
            <div class="content">
              <el-form-item label="上架设置" prop="free">
                <el-radio-group v-model="contentForm.onShelfType" @change="handleOnShelfTypeChange">
                  <div class="radio-row">
                    <el-radio :label="1">直接上架</el-radio>
                  </div>
                  <div class="radio-row">
                    <el-radio :label="2">定时上架</el-radio>
                    <el-date-picker size="mini" v-if="contentForm.onShelfType === 2"  v-model="contentForm.onShelfTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="上架时间"></el-date-picker>
                  </div>
                  <div class="radio-row">
                    <el-radio :label="3">手动上架</el-radio>
                  </div>
                </el-radio-group>

              </el-form-item>
            </div>
          </div>
          <div class="block-area">
              <div class="title">
                <span class="label"></span>
                <span>商品信息</span>
                <!-- 如果是每日一课  则读取每一一课订单 -->
                <!-- 公开课  一般未免费 -->
              </div>
              <div class="content">
                <el-form-item label="免费" prop="free">
                  <!-- <el-switch v-model="contentForm.free" @change="handleFreeChange" active-text="是" inactive-text="否"></el-switch> -->
                  <el-checkbox v-model="contentForm.free"  @change="handleFreeChange"></el-checkbox>
                </el-form-item>
                <el-form-item v-if="!contentForm.free" label="价格" prop="orginalPrice">
                  <el-input class="fixed-width" v-model="contentForm.originalPrice">
                    <span slot="suffix">元</span>
                  </el-input>
                </el-form-item>
                <el-form-item label="VIP免费" prop="vipFree" v-if="!contentForm.free">
                  <el-checkbox v-model="contentForm.vipFree"></el-checkbox>
                </el-form-item>
              </div>
            </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="contentFormdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import E from 'wangeditor'
// import SingleImageUpload from '@/components/common/SingleImageUpload'
const initContentForm = { id: '', title: '', subtitle: '', type: 1, categorys: '', lecturerId: '', directionIds: [], classifyIds: [], sort: 0, free: false, originalPrice: 0.0, totalHours: 0, totalPeriod: 0, coverUrl: '', bgColor: '', description: '', vipFree: false, onShelfType: 1 }
export default {
  name: 'course-manage',
  components: { },
  data () {
    return {
      countMap: {},
      contentFormdialogVisible: false,
      tableData: { records: [], total: 0 },
      searchForm: {
        kw: '',
        page: 1,
        size: 12,
        classifyId: '',
        directionId: '',
        type: '1'
      },
      contentLoading: false,
      contentForm: Object.assign({}, initContentForm),
      editor: null,
      directions: [],
      classifyMap: {},
      conditionDirections: [],
      classifies: [],
      conditionClassifies: [],
      contentFormRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        subtitle: [
          { required: true, message: '请输入副标题', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        coverUrl: [
          { required: true, message: '请选择封面', trigger: 'blur' }
        ],
        free: [
          { required: true, message: '请选择是否免费', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        originalPrice: [
          { message: '请输入正确的原价', pattern: /^\d+(\.\d+)?$/ }
        ],
        totalHours: [
          { message: '请输入正确的课时', pattern: /^\d+(\.\d+)?$/ }
        ],
        totalPeriod: [
          { message: '请输入正确的总周期', pattern: /^\d+(\.\d+)?$/ }
        ],
        onShelfType: [
          { required: true, message: '请选择上架方式' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      courseTypeMap: state => state.common.courseTypeMap,
      courseTypeTagMap: state => state.common.courseTypeTagMap
    })
  },
  mounted () {
    const countMap = {}
    for (const key in this.courseTypeMap) {
      countMap[key] = 0
    }
    this.countMap = countMap
    this.handleSearch()
    this.initClassify()
  },
  methods: {
    handleOnShelfTypeChange (val) {
    },
    handleDialogClosed () {
      this.$refs.contentForm.clearValidate()
    },
    initClassify () {
      this.$get('/cms-classify/tree').then(res => {
        this.directions = res.data || []
        this.conditionDirections = res.data || []
        // classifyMap
        const classifyMap = {}
        this.directions.forEach(v => {
          classifyMap[v.id] = v
          if (v.children) {
            v.children.forEach(d => {
              classifyMap[d.id] = d
            })
          }
        })
        this.classifyMap = classifyMap
      })
    },
    handleDetail (row) {
      this.$router.push({ name: 'edit-course', query: { id: row.id } })
    },
    createEditor () {
      const editor = new E(this.$refs.descriptionEdit)
      editor.customConfig.uploadImgShowBase64 = true
      editor.customConfig.zIndex = 100
      editor.customConfig.onchange = html => {
        this.contentForm.description = html
      }
      editor.create()
      this.editor = editor
    },
    handleSearch () {
      this.searchForm.page = 1
      this.handleRefresh()
    },
    handleSizeChange (size) {
      this.searchForm.size = size
      this.handleSearch()
    },
    handleCurrentChange (current) {
      this.searchForm.page = current
      this.handleSearch()
    },
    handleRefresh () {
      // this.handleSearch()
      this.$get('/cms/course/page', { params: this.searchForm }).then(res => {
        this.tableData = res.data || { records: [], total: 0 }
      })
      this.$get('/cms/course/countByType').then(res => {
        this.countMap = res.data || []
      })
    },
    handleFreeChange (val) {
      if (val) {
        this.contentForm.vipFree = true
        this.contentForm.originalPrice = 0
      }
    },
    handleAdd () {
      this.contentFormdialogVisible = true
      this.contentForm = Object.assign({}, initContentForm, { type: this.searchForm.type * 1 })
      this.$nextTick(() => {
        if (!this.editor) {
          this.createEditor()
        }
        this.editor.txt.html(this.contentForm.description)
      })
    },
    handlePutaway (row) {
      if (row.status !== 2) {
        this.$confirm('请确认是否上架', '上架提示').then(() => {
          this.$put(`/cms/course/putaway/${row.id}`).then(res => {
            if (res.code === 0) {
              this.$notify.success('上架成功')
              this.handleRefresh()
            }
          })
        }).catch(() => {
          this.$message.info('取消了上架')
        })
      }
    },
    handleSoldout (row) {
      if (row.status === 2) {
        this.$confirm('请确认是否下架', '下架提示').then(() => {
          this.$put(`/cms/course/soldOut/${row.id}`).then(res => {
            if (res.code === 0) {
              this.$notify.success('下架成功')
              this.handleRefresh()
            }
          })
        }).catch(() => {
          this.$message.info('取消了下架')
        })
      }
    },
    handleEdit (param) {
      this.contentFormdialogVisible = true
      this.contentLoading = true
      this.$store.dispatch('course/getCourseById', param.id).then(res => {
        if (res.code === 0) {
          this.contentForm = res.data
          this.$nextTick(() => {
            if (!this.editor) {
              this.createEditor()
            }
            this.editor.txt.html(this.contentForm.description)
          })
        } else {
          this.$message.error(res.message)
          this.contentFormdialogVisible = false
        }
        this.contentLoading = false
      }).catch(() => {
        this.contentLoading = false
        this.contentFormdialogVisible = false
        // this.$message.error('查询失败')
      })
    },
    handleDelete (data) {
      // this.$notify.info('未实现')
      // 删除岗位 删除的时候  要判断是否在使用
      // cms/course
      this.$confirm(`请确认删除【${data.title}】`, '提示').then(() => {
        this.$delete(`/cms/course/${data.id}`).then(res => {
          if (res.code === 0) {
            this.$notify.success('删除成功')
            this.handleRefresh()
          }
        })
      }).catch(() => {})
    },
    handleSave () {
      this.$refs.contentForm.validate(valid => {
        if (valid) {
          if (this.contentForm.onShelfType === 2 && !this.contentForm.onShelfTime) {
            this.$notify.error('请输入上架时间')
            return
          }
          this.$store.dispatch('course/saveCourse', this.contentForm).then(res => {
            if (res.code === 0) {
              this.contentFormdialogVisible = false
              this.$notify.success('保存成功')
              this.handleRefresh()
            }
          })
        } else {
          this.$notify.warning('数据校验未通过')
          return false
        }
      })
    }
  },
  watch: {
    'contentForm.directionIds': function (newVal, oldVal) {
      console.log(newVal)
      let classifies = []
      newVal.forEach(v => {
        console.log(v)
        classifies = classifies.concat(this.classifyMap[v].children)
      })
      console.log(classifies)
      this.classifies = classifies
      const classifyIds = new Set(classifies.map(v => v.id))
      console.log(classifyIds)
      this.contentForm.classifyIds = this.contentForm.classifyIds.filter(item => classifyIds.has(item))
      // this.contentForm.classifyIds.filter(function (val) { return classifies.indexOf(val) > -1 })
      // this.classifies = (this.directions[newVal] && this.directions[newVal].children) || []
    },
    'contentForm.free': function (newVal, oldVal) {
      if (!newVal) {
        this.contentFormRules.originalPrice = [
          { required: true, message: '请输入原价', trigger: 'blur' }
        ]
      }
    },
    'searchForm.directionId': function (newVal, oldVal) {
      this.conditionClassifies = (this.classifyMap[newVal] && this.classifyMap[newVal].children) || []
      this.searchForm.classifyId = ''
      this.handleSearch()
    },
    'searchForm.classifyId': function (newVal, oldVal) {
      this.handleSearch()
    },
    'searchForm.type': function (newVal) {
      this.searchForm.page = 1
      this.handleSearch()
    }
  }
}
</script>

<style lang="scss" scoped>
.course-item {
  // height: 340px;
  p {
    line-height: 22px;
    label {
      color: #99a9bf;
    }
  }
}
[class*=el-col-] {
  float: left;
  // display: inline-block;
  transition: 0.5s;
  &:hover {
    transform: translateY(-8px);
    transition: 0.5s;
  }
}
.content-form {
  ::v-deep .fixed-width {
    width: 220px;
  }
}
.content-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  &::after {
    content: "";
    width: 24%;
  }
  .content-container {
    // display: flex;
    width: 24%;
    .cover {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
}
// @media screen and (min-width: 300px) {
//     body {
//         background-color:lightblue;
//     }
// }
.no-data {
  display: flex;
  height: 400px;
  justify-content: center;
  align-items: center;
}
.radio-row {
  padding: 8px 0;
}
</style>
