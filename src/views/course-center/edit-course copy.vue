<template>
  <div class="page">
    <RemoveCurrentToTarget title="内容管理" :targetPage="{ name: 'course-manage' }" content="内容编辑"></RemoveCurrentToTarget>
    <div class="page-panel alone content-header">
      <div class="cover">
        <img :src="content.coverUrl" />
      </div>
      <div class="content-info">
        <h3>{{content.title}}</h3>
        <p>
          {{content.subtitle}}
        </p>
        <div>
          <el-form :inline="true" label-width="90px" class="content-info-detail">
            <el-form-item label="类型：">
              <span>{{content.type}}</span>
            </el-form-item>
            <el-form-item label="顺序：">
              <span>{{content.sort}}</span>
            </el-form-item>
            <el-form-item label="是否免费：">
              <span>{{content.free ? '是' : '否'}}</span>
            </el-form-item>
            <el-form-item v-if="!content.free" label="原价格：">
              <span>{{content.originalPrice}}元</span>
            </el-form-item>
            <el-form-item v-if="!content.free && content.discountPrice" label="折扣价：">
              <span>{{content.discountPrice}}元</span>
            </el-form-item>
            <el-form-item label="总课时：">
              <span>{{content.totalHours}}课时</span>
            </el-form-item>
            <el-form-item label="总周期：">
              <span>{{content.totalPeriod}}周</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="page-panel alone">
      <el-button @click="handleEditChapter('')">新增章节</el-button>
      <el-button @click="handleAddParentContentItem('')">新增小节</el-button>
    </div>
    <div class="content-wrapper" >
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="6">
          <div class="content-nav-wrapper">
            <div class="page-panel alone">
              <el-tree class="content-nav-tree"
                :data="chapterItemData"
                :props="navTreeDefaultProps"
                @node-click="handleNodeClick"
                @node-contextmenu="handleNodeContextmenu"
                :render-content="renderTreeNodeContent"
                :expand-on-click-node="true"
                :highlight-current="false"
                :default-expand-all="true"
              ></el-tree>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="14" :lg="16" :xl="18">
          <div class="content-container">
            <div></div>
            <div class="page-panel alone">
              <div>
                <div v-if="contentItemForm">
                  <div>
                    <h3 style="padding-bottom:30px;">您正在编辑：{{contentItemForm.title}}</h3>
                  </div>
                  <div>
                    <el-form :model="contentItemForm" ref="contentItemForm" :rules="contentItemFormRules" label-width="100px" label-suffix=":">
                      <el-form-item label="标题" prop="title">
                        <el-input v-model="contentItemForm.title" maxlength="50" show-word-limit></el-input>
                      </el-form-item>
                      <el-form-item label="副标题" prop="subtitle">
                        <el-input v-model="contentItemForm.subtitle" maxlength="250" show-word-limit></el-input>
                      </el-form-item>
                      <el-form-item label="图片">
                        <SingleImageUpload v-model="contentItemForm.coverUrl"></SingleImageUpload>
                      </el-form-item>
                      <el-form-item label="背景颜色">
                        <el-color-picker v-model="contentItemForm.bgColor"></el-color-picker>
                      </el-form-item>
                      <el-form-item label="分享标题">
                        <el-input v-model="contentItemForm.shareTitle" maxlength="50" show-word-limit></el-input>
                      </el-form-item>
                      <el-form-item label="显示顺序:" required>
                        <el-input-number v-model="contentItemForm.sort" :min="0"></el-input-number>
                      </el-form-item>
                      <el-form-item label="添加音视频:">
                        <!-- <div>
                          <ArcusUploadVod v-model="contentItemForm.mediaId"></ArcusUploadVod>
                        </div> -->
                        <div>
                          <!-- <el-select></el-select> -->
                          <el-form :inline="true">
                            <el-form-item label="音视频类型:">
                              <el-radio-group v-model="chooseVodType" @change="handleChooseVodTypeChange">
                                <el-radio label="video">视频</el-radio>
                                <el-radio label="audio">音频</el-radio>
                              </el-radio-group>
                            </el-form-item>
                            <el-form-item label="选择音视频:">
                              <el-select v-model="chooseVodId" filterable placeholder="请选择">
                                <el-option
                                :clearable="true"
                                  v-for="vod in vods"
                                  :key="vod.id"
                                  :label="vod.name"
                                  :value="vod.id">
                                </el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item>
                              <el-button @click="handleAddChooseVod">添加视频</el-button>
                            </el-form-item>
                          </el-form>
                        </div>
                        <div>
                          <el-table :data="contentItemForm.cmsPeriodVods">
                            <el-table-column prop="vodId" label="vodId" width="55"></el-table-column>
                            <el-table-column prop="title" label="标题">
                              <template slot-scope="{row}">
                                <el-input v-model="row.title" maxlength="30" :show-word-limit="true"></el-input>
                              </template>
                            </el-table-column>
                            <el-table-column prop="vodTitle" label="音视频标题"></el-table-column>
                            <el-table-column prop="vodName" label="音视频名"></el-table-column>
                            <el-table-column prop="vodType" label="音视频类型"></el-table-column>
                            <el-table-column>
                              <template slot-scope="{$index}">
                                <el-button @click="contentItemForm.cmsPeriodVods.splice($index, 1)">删除</el-button>
                              </template>
                            </el-table-column>
                          </el-table>
                        </div>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="content-item-form-opt">
                    <el-button type="primary" @click="handleSaveContentItem">保存</el-button>
                  </div>
                </div>
                <div v-else>
                  <div class="no-show-content">
                    <span>内容小节编辑区域</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="章节编辑"
      :visible.sync="chapterDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="800px">
      <div>
        <el-form :model="chapterForm" :rules="chapterFormRules" ref="chapterForm" @submit.native.prevent label-width="80px">
          <el-form-item label="标题" prop="title" required>
            <el-input v-model="chapterForm.title" maxlength="50" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="顺序" prop="sort" required>
            <el-input-number v-model="chapterForm.sort" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="chapterForm.remark" maxlength="250" show-word-limit></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSaveChapter">确 定</el-button>
        <el-button @click="handleDeleteChapter" :disabled="!chapterForm.id" type="danger">删 除</el-button>
        <el-button @click="chapterDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SingleImageUpload from '@/components/common/SingleImageUpload'
import RemoveCurrentToTarget from '@/components/common/RemoveCurrentToTarget'
// import ArcusUploadVod from '@/components/form/ArcusUploadVod'
const initChapterForm = { id: '', courseId: '', title: '', remark: '', mediaId: '', sort: 0, status: 1, type: 'CHAPTER' }
// const initContentItemForm = {} ArcusUploadVod
export default {
  name: 'edit-course',
  components: { RemoveCurrentToTarget, SingleImageUpload },
  data () {
    return {
      searchForm: {
        kw: ''
      },
      navTreeDefaultProps: {
        children: 'children',
        label: 'title'
      },
      chapterItemData: [],
      content: {},
      chapterDialogVisible: false,
      chapterForm: Object.assign({}, initChapterForm),
      contentItemForm: '',
      contentItemFormRules: {
        title: [{ required: true, message: '请输入标题' }],
        subtitle: [{ required: true, message: '请输入副标题' }],
        sort: [{ required: true, message: '请输入顺序' }]
      },
      chapterFormRules: {
        title: [
          { required: true, message: '请输入标题' }
        ],
        sort: [
          { required: true, message: '请输入顺序' }
        ],
        remark: [
          { required: true, message: '请输入备注' }
        ]
      },
      chooseVodType: 'video',
      vods: [],
      vodMap: {},
      chooseVodId: ''
    }
  },
  methods: {
    handleAddChooseVod () {
      if (this.chooseVodId && this.vodMap[this.chooseVodId]) {
        const vod = this.vodMap[this.chooseVodId]
        if (!this.contentItemForm.cmsPeriodVods) {
          this.contentItemForm.cmsPeriodVods = []
        }
        for (const iterator of this.contentItemForm.cmsPeriodVods) {
          if (iterator.vodId === this.chooseVodId) {
            this.$notify.error(`列表中已有[${vod.name}]`)
            return
          }
        }
        this.contentItemForm.cmsPeriodVods.push({
          id: '', vodId: vod.id, vodType: vod.type, vodName: vod.name, vodTitle: vod.title, title: vod.title
        })
        this.chooseVodId = ''
      } else {
        this.$notify.error('请先选择音视频')
      }
    },
    handleChooseVodTypeChange () {
      this.$get('/material-vod/list', { params: { type: this.chooseVodType } }).then(res => {
        this.vods = res.data || []
        this.vodMap = {}
        this.vods.forEach(ele => {
          this.vodMap[ele.id] = ele
        })
      })
    },
    handleInitChapterContentItem (contentId) {
      // this.$store.dispatch('course/getChapterPeriodsByCourseId', contentId).then(res => {
      //   this.chapterItemData = res.data
      // }).catch(() => {})
      this.$get(`/cms/period/periods/${contentId}`).then(res => {
        this.chapterItemData = res.data
      })
    },
    backContentManage () {
      this.$alert('无效的内容ID，返回【内容管理】', '提示').then(() => {
        this.$store.dispatch('app/removeVisit', this.$route).then(() => {
          this.$router.replace({ name: 'course-manage' })
        })
      })
    },
    renderTreeNodeContent (h, { node, data, store }) {
      if (!data.chapterId) {
        var content = data.type === 'CHAPTER'
          ? <span class="tree-node-option">
            <el-button size="mini" type="text" on-click={ (e) => { this.handleEditChapter(e, data) } }>编辑</el-button>
            <el-button size="mini" type="text" on-click={ (e) => { this.handleAddContentItem(e, node, data) } }>新增小节</el-button>
          </span>
          : <el-button size="mini" type="text" on-click={ (e) => this.handleDeleteContentItem(e, node, data) }>删除</el-button>
        return (
          // class={['custom-tree-node', data.type === 'CHAPTER' ? '' : 'content-item-node']}
          <span class="custom-tree-node">
            <span>{data.type === 'CHAPTER' ? <el-tag type="info">章</el-tag> : <el-tag>时</el-tag> }{node.label}</span>
            <span class="tree-node-option">
              {content}
            </span>
          </span>)
      } else {
        return (<span class="custom-tree-node content-item-node">
          <span><el-tag>时</el-tag>{node.label}</span>
          <span class="tree-node-option">
            <el-button size="mini" type="text" on-click={ (e) => this.handleDeleteContentItem(e, node, data) }>删除</el-button>
          </span>
        </span>)
      }
    },
    handleEditContentItem (data) {
      //
    },
    handleSaveContentItem () {
      this.$refs.contentItemForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('course/savePeriod', this.contentItemForm).then(res => {
            if (res.code === 0) {
              this.$notify.success('保存成功')
              this.contentItemForm = res.data
              this.handleInitChapterContentItem(this.content.id)
            }
          }).catch(() => {})
        } else {
          return false
        }
      })
    },
    handleNodeContextmenu () {
    },
    handleNodeClick (data) {
      console.log(data)
      if (data.type === 'CHAPTER') {
        this.contentItemForm = ''
        return
      }
      if (this.contentItemForm) {
        if (!this.contentItemForm.id) {
          // this.$message.warning('有未完成的编辑，请编辑完')
          if (data.id) {
            this.$message.warning('有未完成的编辑，请编辑完')
          }
          return
        }
      }
      this.handleChooseVodTypeChange()
      // if ()
      this.$get(`/cms/period/getPeriodById/${data.id}`).then(res => {
        if (res.code === 0) {
          this.contentItemForm = res.data
        } else {
          this.contentItemForm = ''
        }
      })
    },
    stopPropagation (e) {
      try {
        e.stopPropagation()// 非IE浏览器
      } catch (e) {
        window.event.cancelBubble = true// IE浏览器
      }
    },
    handleAddContentItem (e, node, data) {
      this.stopPropagation(e)
      // const newChild = { id: id++, label: '新节点', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.contentItemForm = { id: '', courseId: this.content.id, chapterId: data.id, title: '', subtitle: '', coverUrl: '', bgColor: '', shareTitle: '', sort: 0, type: 'PERIOD' }
      data.children.push(this.contentItemForm)
    },
    handleAddParentContentItem () {
      if (this.contentItemForm) {
        if (!this.contentItemForm.id) {
          this.$message.warning('有未完成的编辑，请编辑完')
          return
        }
      }
      this.contentItemForm = { id: '', courseId: this.content.id, chapterId: 0, title: '新增小节', subtitle: '', coverUrl: '', bgColor: '', shareTitle: '', sort: 0, type: 'PERIOD' }
      this.chapterItemData.push(this.contentItemForm)
    },
    handleRemoveNode (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    handleDeleteContentItem (e, node, data) {
      this.stopPropagation(e)
      this.$confirm('是否删除', '确认删除').then(() => {
        if (data.id) {
          // 请求去删除
          this.$store.dispatch('course/deletePeriodById', data.id).then(res => {
            if (res.code === 0) {
              this.$notify.success('删除成功')
              this.contentItemForm = ''
              this.handleRemoveNode(node, data)
              this.handleInitChapterContentItem(this.content.id)
            }
          }).catch(() => {})
        } else {
          this.contentItemForm = ''
          this.handleRemoveNode(node, data)
        }
      }).catch(() => {
        this.$notify.info('取消删除')
      })
    },
    handleDeleteChapter () {
      this.$confirm('是否删除', '删除确认').then(() => {
        this.$store.dispatch('course/deleteChapterById', this.chapterForm.id).then(res => {
          if (res.code === 0) {
            this.$notify.success('删除成功')
            this.chapterDialogVisible = false
            this.handleInitChapterContentItem(this.content.id)
          }
        })
      }).catch(() => {})
    },
    handleEditChapter (e, row) {
      this.stopPropagation(e)
      if (row) {
        // 获取
        this.$get(`/cms/chapter/get/${row.id}`).then(res => {
          if (res.code === 0) {
            this.chapterForm = res.data
          }
        })
      } else {
        this.chapterForm = Object.assign({}, initChapterForm)
        this.chapterForm.courseId = this.content.id
      }
      this.chapterDialogVisible = true
    },
    handleSaveChapter () {
      this.$refs.chapterForm.validate((valid) => {
        if (valid) {
          this.$confirm('是否保存', '请确认').then(() => {
            this.$store.dispatch('course/saveChapter', this.chapterForm).then(res => {
              if (res.code === 0) {
                this.$notify.success('保存成功')
                this.chapterDialogVisible = false
                this.handleInitChapterContentItem(this.content.id)
              }
            })
          }).catch(() => {
            this.$notify.info('取消了保存')
          })
        } else {
          // this.$notify.info('取消保存')
          return false
        }
      })
    }
  },
  mounted () {
    const { id } = this.$route.query
    // if (!id) {
    //   this.backContentManage()
    //   return
    // }
    if (!id) {
      this.backContentManage()
      return
    }
    this.$store.dispatch('course/getCourseById', id).then(res => {
      if (res.code === 0) {
        this.content = res.data
        this.handleInitChapterContentItem(id)
      } else {
        this.backContentManage()
      }
    }).catch(() => {})
  }
}
</script>

<style lang="scss" scoped>
.content-header {
  display: flex;
  flex-direction: row;
  .cover {
    width: 332px;
    // height: 200px;
    img {
      width: 100%;
    }
  }
  .content-info {
    padding: 20px;
    .content-info-detail {
      font-size: 0;
      ::v-deep label {
        color: #99a9bf;
      }
      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
    }
  }
}
.content-wrapper {
  .content-nav-wrapper {
    // width: 380px;
    .content-nav-tree {
      ::v-deep .el-tree-node{
        white-space: pre-wrap;
      }
      ::v-deep .el-tree-node__children {
        overflow: visible;
      }
      ::v-deep .el-tree-node__content {
        height: auto;
      }
      ::v-deep .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        padding-right: 8px;
        position: relative;
        padding:20px 0;
        word-wrap: inherit;
        font-weight: 600;
        &.content-item-node {
          padding: 10px 0;
          font-size: 14px;
          font-weight: 500;
        }
        .tree-node-option {
          display: inline-flex;
          visibility: hidden;
        }
        &:hover .tree-node-option {
          visibility: visible;
        }
      }
    }
  }
  .content-container {
    .no-show-content {
      height: 400px;
      display: flex;
      align-items: center;
      font-size: 34px;
      color: #e8e8e8;
      justify-content: center;
    }
    .content-item-form-opt {
      padding: 20px 0;
      text-align: center;
    }
  }
}
</style>
