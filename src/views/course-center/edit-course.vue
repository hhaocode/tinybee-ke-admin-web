<template>
  <div class="page">
    <remove-current-to-target title="课程管理" :targetPage="{ name: 'course-manage' }" content="课程内容编辑"></remove-current-to-target>
    <div class="page-panel alone content-header">
      <div class="cover">
        <el-image v-if="content.coverUrl"
          style="height: 100%; width: 100%;"
          :src="content.coverUrl"
          :preview-src-list="[content.coverUrl]"
          fit="fill"></el-image>
      </div>
      <div class="content-info">
        <h3>{{content.title}}</h3>
        <p>
          {{content.subtitle}}
        </p>
        <div>
          <el-form :inline="true" label-width="90px" class="content-info-detail" @submit.native.prevent>
            <el-form-item label="类型：">
              <el-tag>{{courseTypeMap[content.type]}}</el-tag>
            </el-form-item>
            <!-- <el-form-item label="顺序：">
              <span>{{content.sort}}</span>
            </el-form-item> -->
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
      <el-button @click="handleEditChapter('')" v-if="content.type !== 3">新增章节</el-button>
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
                <div v-if="contentItemForm" v-loading="periodSaveLoading">
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
                      <el-form-item label="顺序" prop="sort">
                        <el-input-number :min="0" v-model="contentItemForm.sort"></el-input-number>
                      </el-form-item>
                      <el-form-item label="图片" prop="coverUrl">
                        <image-choose v-model="contentItemForm.coverUrl"></image-choose>
                      </el-form-item>
                      <el-form-item label="背景颜色" prop="bgColor">
                        <el-color-picker v-model="contentItemForm.bgColor"></el-color-picker>
                      </el-form-item>
                      <el-form-item label="分享标题" prop="shareTitle">
                        <el-input v-model="contentItemForm.shareTitle" maxlength="50" show-word-limit></el-input>
                      </el-form-item>
                      <el-form-item label="摘要" prop="summary">
                        <ckeditor v-model="contentItemForm.summary" :config="{}"></ckeditor>
                      </el-form-item>
                      <!-- <el-form-item v-if="content.type != 2" label="是否直播" prop="hasLive">
                        <el-switch active-text="是" inactive-text="否" v-model="contentItemForm.hasLive"></el-switch>
                      </el-form-item> -->
                      <el-form-item label="资源类型" prop="resourceType">
                        <!-- 1 视频  2 图文+音频 3直播  -->
                        <el-select v-model="contentItemForm.resourceType">
                          <el-option v-for="resourceType in resourceTypes" :key="resourceType.value" :value="resourceType.value" :label="resourceType.label"></el-option>
                        </el-select>
                      </el-form-item>
                      <!-- 选择资源 -->
                      <el-form-item label="资源">
                        <div>
                          <div>
                            <el-button @click="chooseResource">选择资源</el-button>
                          </div>
                          <div v-if="contentItemForm.resource">
                            <div><span>已选择{{resourceTypeMap[contentItemForm.resourceType]}}</span><span>{{contentItemForm.resource.title}}</span></div>
                            <!-- 直播 -->
                            <div v-if="contentItemForm.resourceType === 6">
                              <el-tag>开始时间: </el-tag><span>{{contentItemForm.resource.startTime}}</span>
                              <el-tag>结束时间: </el-tag><span>{{contentItemForm.resource.endTime}}</span>
                            </div>
                          </div>
                          <div v-else>
                            暂未选择任何资源
                          </div>
                        </div>
                      </el-form-item>
                      <!-- 图文 + 音频  （选择音频） -->
                      <el-form-item label="附加(音频)" v-if="contentItemForm.resourceType === 5">
                        <div>
                          <div>
                            <el-button @click="chooseAudio">选择附加(音频)</el-button>
                          </div>
                          <div v-if="contentItemForm.additionResource">
                            <div>{{contentItemForm.additionResource.title}}</div>
                          </div>
                          <div v-else>
                            暂未选择任何资源
                          </div>
                        </div>
                      </el-form-item>
                      <!-- 文件任何形式都可以有 只支持一个文件 （建议压缩包）TODO 缩略图 提供下载功能 -->
                      <el-form-item label="文件" prop="fileId">
                        <div>
                          <div>
                            <el-table :data="contentItemForm.files" border size="mini">
                              <el-table-column label="文件名" prop="name" show-overflow-tooltip>
                                <template slot="header">
                                  <div>
                                    <span style="margin-right: 20px;">文件名</span>
                                    <el-button size="mini" @click="chooseFile">添加文件</el-button>
                                  </div>
                                </template>
                              </el-table-column>
                              <el-table-column prop="size" label="大小" width="120" show-overflow-tooltip>
                                <template slot-scope="{row}">
                                  <span>{{row.size | fileSize}}</span>
                                </template>
                              </el-table-column>
                              <el-table-column label="操作" width="80">
                                <template slot-scope="{$index}">
                                  <el-button type="wraning" size="mini" @click="removeChooseFile($index)">移除</el-button>
                                </template>
                              </el-table-column>
                            </el-table>
                          </div>
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
          <el-form-item label="标题" prop="title">
            <el-input v-model="chapterForm.title" maxlength="50" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="顺序" prop="sort">
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
// 1课程（视频不能未空） 2专栏（必须有文章） 3 直播 4 公开课 5 训练营
// import SingleImageUpload from '@/components/common/SingleImageUpload'
import { mapState } from 'vuex'
import RemoveCurrentToTarget from '@/components/common/RemoveCurrentToTarget'
// import ArcusUploadVod from '@/components/form/ArcusUploadVod'
const initChapterForm = { id: '', courseId: '', title: '', remark: '', mediaId: '', sort: 0, status: 1, type: 'CHAPTER' }
// const initContentItemForm = {} ArcusUploadVod
const initPeridForm = { id: '', courseId: '', chapterId: '', title: '', subtitle: '', coverUrl: '', bgColor: '', shareTitle: '', summary: '', sort: 0, type: 'PERIOD', hasLive: false, resourceType: '', resource: '', resourceId: '', additionResourceId: '', additionResource: '', fileIds: [], files: [] }
export default {
  name: 'edit-course',
  components: { RemoveCurrentToTarget },
  computed: {
    ...mapState({
      courseTypeMap: state => state.common.courseTypeMap
    })
  },
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
      content: {
        coverUrl: ''
      },
      liveTime: '',
      chapterDialogVisible: false,
      chapterForm: Object.assign({}, initChapterForm),
      contentItemForm: '',
      contentItemFormRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        subtitle: [{ required: true, message: '请输入副标题', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入顺序', trigger: 'blur' }],
        resourceType: [{ required: true, message: '请选择资源' }]
      },
      chapterFormRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入顺序', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      },
      periodSaveLoading: false,
      resourceTypes: [{ value: 3, label: '视频' }, { value: 5, label: '图文+音频' }, { value: 6, label: '直播' }],
      resourceTypeMap: {}
    }
  },
  methods: {
    chooseResource () {
      if (!this.contentItemForm.resourceType) {
        this.$notify.warning('请先选择资源类型')
        return
      }
      this.$ossChooseDialog({
        title: '选择资源',
        type: this.contentItemForm.resourceType,
        confirm: (val) => {
          if (val) {
            this.contentItemForm.resourceId = val.id
            this.contentItemForm.resource = val
          }
        }
      })
    },
    handleInitChapterContentItem (contentId) {
      this.$get(`/cms/period/periods/${contentId}`).then(res => {
        this.chapterItemData = res.data || []
      })
    },
    backContentManage () {
      this.$alert('无效的课程ID，返回【课程管理】', '提示').then(() => {
        this.$store.dispatch('app/removeVisit', this.$route).then(() => {
          this.$router.replace({ name: 'course-manage' })
        })
      })
    },
    chooseAudio () {
      this.$ossChooseDialog({
        title: '选择音频',
        type: 2,
        confirm: (val) => {
          if (val) {
            this.contentItemForm.additionResourceId = val.id
            this.contentItemForm.additionResource = val
          }
        }
      })
    },
    chooseFile () {
      this.$ossChooseDialog({
        title: '选择文件',
        type: 4,
        confirm: (val) => {
          if (val) {
            if (!this.contentItemForm.files) {
              this.contentItemForm.files = [val.file]
            } else {
              if (this.contentItemForm.files.some(v => v.id === val.id)) {
                this.$notify.error('文件已在文件列表中')
                return
              }
              this.contentItemForm.files.push(val.file)
            }
          }
          this.$notify.success('添加文件成功')
        }
      })
    },
    removeChooseFile ($index) {
      this.contentItemForm.files.splice($index, 1)
      this.$notify.success('文件移除成功')
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
        // let update =
        return (<span class="custom-tree-node content-item-node">
          <span><el-tag>时</el-tag>{node.label}</span>
          <span class="tree-node-option">
            { data.status !== '2' ? <el-button size="mini" type="text" on-click={ (e) => this.handleUpdateContentItem(e, node, data) }>更新</el-button> : '' }
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
          const param = Object.assign({}, this.contentItemForm, { video: null, audio: null, file: null, article: null })
          if (param.hasLive) {
            if (!this.liveTime || this.liveTime.length !== 2) {
              this.$notify.error('请选择直播时间')
              return
            }
            param.liveStartTime = this.liveTime[0]
            param.liveEndTime = this.liveTime[1]
          }
          this.periodSaveLoading = true
          this.$store.dispatch('course/savePeriod', param).then(res => {
            if (res.code === 0) {
              const data = res.data
              this.$notify.success('保存成功')
              this.contentItemForm = data
              if (data.hasLive) {
                this.liveTime = [data.liveStartTime, data.liveEndTime]
              }
              this.handleInitChapterContentItem(this.content.id)
            }
            this.periodSaveLoading = false
          }).catch(() => {
            this.periodSaveLoading = false
          })
        } else {
          return false
        }
      })
    },
    handleNodeContextmenu () {
    },
    handleNodeClick (data) {
      if (data.type === 'CHAPTER') {
        // this.contentItemForm = ''
        return
      }
      if (this.contentItemForm) {
        if (!this.contentItemForm.id) {
          // this.$message.warning('有未完成的编辑，请编辑完')
          console.log(data.id)
          if (data.id) {
            this.$message.warning('有未完成的编辑，请先保存')
          }
          return
        }
      }
      if (!data.id) {
        this.contentItemForm = data
        return
      }
      // if ()
      if (this.contentItemForm.id === data.id) {
        return
      }
      this.$get(`/cms/period/getPeriodById/${data.id}`).then(res => {
        if (res.code === 0) {
          const data = res.data
          this.contentItemForm = data
          if (data.hasLive) {
            this.liveTime = [data.liveStartTime, data.liveEndTime]
          }
        } else {
          this.contentItemForm = ''
          this.liveTime = ''
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
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.contentItemForm = Object.assign({}, initPeridForm, { chapterId: data.id })
      data.children.push(this.contentItemForm)
    },
    handleAddParentContentItem () {
      if (this.content.type === 3 && this.chapterItemData.length > 0) {
        this.$notify.error('每日一课只能有一个课时')
        return
      }
      if (this.contentItemForm) {
        if (!this.contentItemForm.id) {
          this.$message.warning('有未完成的编辑，请编辑完')
          return
        }
      }
      this.contentItemForm = Object.assign({}, initPeridForm, { title: '新增小节' })
      this.chapterItemData.push(this.contentItemForm)
    },
    handleRemoveNode (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    handleUpdateContentItem (e, node, data) {
      this.stopPropagation(e)
      this.$put(`/cms/period/doUpdate/${data.id}`).then(res => {
        if (res.code === 0) {
          data.status = 2
          this.$notify.success('更新成功')
        } else {
          this.$notify.error(res.message)
        }
      })
    },
    handleDeleteContentItem (e, node, data) {
      this.stopPropagation(e)
      this.$confirm('是否删除', '确认删除').then(() => {
        console.log(data)
        if (data.id) {
          // 请求去删除
          this.$delete(`/cms/period/delete/${data.id}`).then(res => {
            if (res.code === 0) {
              this.$notify.success('删除成功')
              this.contentItemForm = ''
              this.handleRemoveNode(node, data)
              this.handleInitChapterContentItem(this.content.id)
            }
          })
          // this.$store.dispatch('course/deletePeriodById', data.id).then(res => {

          // }).catch(() => {})
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
    const resourceTypeMap = {}
    this.resourceTypes.forEach(v => {
      resourceTypeMap[v.value] = v.label
    })
    this.resourceTypeMap = resourceTypeMap
    const { id } = this.$route.query
    // if (!id) {
    //   this.backContentManage()
    //   return
    // }
    if (!id) {
      this.backContentManage()
      return
    }
    initPeridForm.courseId = id
    this.$store.dispatch('course/getCourseById', id).then(res => {
      if (res.code === 0) {
        this.content = res.data
        this.handleInitChapterContentItem(id)
      } else {
        this.backContentManage()
      }
    }).catch(() => {
      this.backContentManage()
    })
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
