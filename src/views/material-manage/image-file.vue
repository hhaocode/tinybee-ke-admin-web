<template>
  <div class="page">
    <div class="page-panel">
      <div>
        <!-- <el-button @click="openOssChooseDialog">选择图片</el-button> -->
      </div>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 图片 -->
        <el-tab-pane label="图片" name="image">
          <div class="wrapper">
            <div class="flex space-between ">
              <div>
                <span>图片（共{{imageData.page.total}}条）</span>
                <i class="el-icon-menu"></i>
                <span>
                  <el-button icon="el-icon-refresh" class="refresh-btn" circle @click="handleQueryImage"></el-button>
                </span>
              </div>
              <div>
                <el-form :inline="true" size="mini">
                  <el-form-item><el-input v-model="fileQueryParam.name"></el-input></el-form-item>
                  <el-form-item> <el-button @click="handleQueryImage">查询</el-button></el-form-item>
                  <el-form-item>
                    <span class="el-button file-upload-btn el-button--primary el-button--small" v-loading="uploadingForImage">
                      <form ref="imageUploadForm">
                        选择文件<input type="file" name="file" @change="handleImageChange" accept="image/x-png, image/bmp, image/png, image/jpeg, image/jpg, image/gif" multiple>
                      </form>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="group-toolbar flex space-between">
              <!-- <div>分组</div> -->
              <div>
                <el-link type="info" :underline="false" class="group-label">分组</el-link>
                <el-radio-group v-model="imageQueryParam.groupId" size="mini" @change="handleImageGroupIdChange">
                  <el-radio border v-for="(item, index) in imageData.groupCnt" :label="item.id" :key="index">{{item.name}}({{item.cnt}})</el-radio>
                </el-radio-group>
              </div>
              <div>
                <el-popover
                  placement="bottom"
                  width="400"
                  v-model="imageGroupNameVisible"
                  trigger="click">
                  <el-form>
                    <el-form-item label="请输入分组名称">
                      <el-input v-model="imageGroupName" maxlength="15" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="handleSaveImageGroupName">确认</el-button>
                      <el-button @click="() => { this.imageGroupName = ''; this.imageGroupNameVisible = false;}">取消</el-button>
                    </el-form-item>
                  </el-form>
                  <el-button icon="el-icon-circle-plus-outline" size="mini" type="text" slot="reference">新建</el-button>
                </el-popover>
                <el-button icon="el-icon-setting" size="mini" type="text">管理</el-button>
              </div>
            </div>
            <div>
              <div v-if="imageData.page.records && imageData.page.records.length">
                <el-checkbox-group v-model="imageDataSelection" @change="handleImageDataSelection">
                  <el-row :gutter="20" style="margin-bottom: 20px;">
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="item in imageData.page.records" :key="item.id">
                      <div>
                        <div style="overflow: hidden;">
                          <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
                        </div>
                        <el-image
                          style="width: 100%; height: 140px"
                          :src="item.fileUrl"
                          :preview-src-list="imageData.page.records.map(v => v.fileUrl)">
                        </el-image>
                      </div>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </div>
              <div v-else>
                <no-data :no-data="true" text="此分类暂无图片"></no-data>
              </div>
              <div style="padding-top: 30px;" class="flex row space-between">
                <div class="flex row a-center">
                  <div style="margin-right: 10px;">
                    <el-checkbox v-model="allImageChecked" @change="handleAllImageChecked" >全选</el-checkbox>
                  </div>
                  <div>
                    <el-button type="danger" @click="handleDeleteImageBySelection" :disabled="imageBatchOptabled">删除</el-button>
                    <el-button type="warning" :disabled="imageBatchOptabled">移动组</el-button>
                  </div>
                </div>
                <div>
                  <el-pagination
                  @size-change="handleImageSizeChange"
                  @current-change="handleImageCurrentChange"
                  :current-page="imageQueryParam.page"
                  :page-sizes="[1, 2, 5, 10]"
                  :page-size="imageQueryParam.size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="imageData.page.total">
                </el-pagination>
                </div>
              </div>
            </div>
            <div class="flex">
              <div>
                <!-- :indeterminate="imageAllIsIndeterminate" -->
              </div>
            </div>
          </div>
        </el-tab-pane>
        <!-- 文件 -->
        <el-tab-pane label="文件" name="file">
          <div class="wrapper">
            <div class="flex space-between ">
              <div>
                <span>文件（共{{fileData.cnt}}条）</span>
                <i class="el-icon-menu"></i>
                <span>
                  <el-button icon="el-icon-refresh" class="refresh-btn" circle @click="handleQueryFile"></el-button>
                </span>
              </div>
              <div>
                <el-form :inline="true" size="mini">
                  <el-form-item><el-input v-model="fileQueryParam.name" :clearable="true"></el-input></el-form-item>
                  <el-form-item> <el-button @click="handleQueryFile">查询</el-button></el-form-item>
                  <el-form-item>
                    <span class="el-button file-upload-btn el-button--primary el-button--small" v-loading="uploadingForFile">
                      <form ref="fileUploadForm">
                        选择文件<input type="file" name="file" @change="handleFileChange" multiple>
                      </form>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="group-toolbar flex space-between">
              <div>
                <!-- <span>分组</span>
                <ul>
                  <li v-for="groupCnt in fileData.groupCnt" :key="groupCnt.id" @click="() => { this.fileQueryParam.groupId = groupCnt.id; this.handleQueryFile() }">
                    {{groupCnt.name}}({{groupCnt.cnt}})
                  </li>
                </ul> -->
                <el-link type="info" :underline="false" class="group-label">分组</el-link>
                <el-radio-group v-model="fileQueryParam.groupId" size="mini" @change="handleFileGroupIdChange">
                    <el-radio border v-for="(item, index) in fileData.groupCnt" :label="item.id" :key="index">{{item.name}}({{item.cnt}})</el-radio>
                  </el-radio-group>
              </div>
              <div>
                <el-popover
                  placement="bottom"
                  width="400"
                  v-model="fileGroupNameVisible"
                  trigger="click">
                  <el-form>
                    <el-form-item label="请输入分组名称">
                      <el-input v-model="fileGroupName" maxlength="15" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="handleSaveFileGroupName">确认</el-button>
                      <el-button @click="() => { this.fileGroupName = ''; this.fileGroupNameVisible = false;}">取消</el-button>
                    </el-form-item>
                  </el-form>
                  <el-button icon="el-icon-circle-plus-outline" size="mini" type="text" slot="reference">新建</el-button>
                </el-popover>
                <el-button icon="el-icon-setting" size="mini" type="text">管理</el-button>
              </div>
            </div>
            <div>
              <el-table :data="fileData.page.records">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column label="缩略图">
                  <template slot-scope="{row}">
                    <div style="max-height:90px;">
                      <el-image style=" height: 90px" :src="row.url" :key="row.id" v-if="/^image/.test(row.contentType)" :preview-src-list="fileData.page.records.filter( v => /^image/.test(v.contentType)).map(v => v.url)">
                        <div slot="placeholder" class="image-slot">
                          加载中<span class="dot">...</span>
                        </div>
                      </el-image>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="channel" label="存储渠道"></el-table-column>
                <el-table-column prop="ossId" label="对象存储唯一标识"></el-table-column>
                <el-table-column prop="contentType" label="内容类型"></el-table-column>
                <el-table-column prop="extension" label="扩展名"></el-table-column>
                <el-table-column label="操作">
                  <template>
                    <el-button>删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="flex space-between" style="padding-top: 20px;">
              <div>
                <el-button>批量删除</el-button>
                <el-button>批量修改渠道</el-button>
              </div>
              <div>
                <el-pagination
                  @size-change="(size) => { this.fileQueryParam.size = size; this.handleQueryFile() }"
                  @current-change="(page) => { this.fileQueryParam.page = page; this.handleQueryFile() }"
                  :current-page="fileQueryParam.page"
                  :page-sizes="[1, 2, 5, 10]"
                  :page-size="fileQueryParam.size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="fileData.page.total">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      activeName: 'image',
      fileQueryParam: {
        name: '', page: 1, size: 10, groupId: null, type: 4
      },
      fileData: {
        cnt: 0,
        groupCnt: [],
        page: {
          records: [],
          total: 0
        }
      },
      imageFile: '',
      imageQueryParam: {
        name: '', page: 1, size: 10, groupId: null, type: 1
      },
      imageData: {
        cnt: 0,
        groupCnt: [],
        page: {
          records: [],
          total: 0
        }
      },
      imageGroupName: '',
      imageGroupNameVisible: false,
      fileGroupName: '',
      fileGroupNameVisible: false,
      imageDataSelection: [],
      allImageChecked: false,
      imageAllIsIndeterminate: true,
      uploadingForImage: false,
      uploadingForFile: false
    }
  },
  computed: {
    imageBatchOptabled () {
      return (!this.imageDataSelection || !this.imageDataSelection.length)
    }
  },
  mounted () {
    this.handleQueryImage()
  },
  methods: {
    handleSaveImageGroupName () {
      if (!this.imageGroupName) {
        this.$notify.error('请输入分组名称')
        return
      }
      this.$post('/material/group/save', { name: this.imageGroupName, type: 1 }).then(res => {
        if (res.code === 0) {
          this.$notify.success('创建成功')
          this.handleQueryImage()
          this.imageGroupNameVisible = false
        }
      })
    },
    handleSaveFileGroupName () {
      if (!this.fileGroupName) {
        this.$notify.error('请输入分组名称')
        return
      }
      this.$post('/material/group/save', { name: this.imageGroupName, type: 4 }).then(res => {
        if (res.code === 0) {
          this.$notify.success('创建成功')
          this.handleQueryFile()
          this.fileGroupNameVisible = false
        }
      })
    },
    handleDeleteImageBySelection () {
      if (!this.imageDataSelection || !this.imageDataSelection.length) {
        this.$notify.error('未选择任何图片')
        return
      }
      this.$confirm('是否删除所选图片').then(() => {
        this.$delete('/material-file/deleteBatch', { params: { ids: this.imageDataSelection } }).then(res => {
          if (res.code === 0) {
            this.$notify.success('删除成功')
            this.handleQueryImage()
          }
        })
      })
    },
    // handle
    handleAllImageChecked (val) {
      this.imageDataSelection = val ? this.imageData.page.records.map(v => v.id) : []
      // this.imageAllIsIndeterminate = false
    },
    handleImageDataSelection (val) {
      const checkedLength = val.length
      this.allImageChecked = checkedLength === this.imageData.page.records.length
      this.imageAllIsIndeterminate = checkedLength > 0 && checkedLength < this.imageData.page.records.length
    },
    handleImageCurrentChange (current) {
      this.imageQueryParam.page = current
      this.handleQueryImage()
    },
    handleImageSizeChange (size) {
      this.imageQueryParam.size = size
      this.handleQueryImage()
    },
    handleQueryImage () {
      this.imageDataSelection = []
      this.allImageChecked = false
      this.$get('/material-file/search', { params: this.imageQueryParam }).then(res => {
        if (res.code === 0) {
          this.imageData = res.data
        }
      })
    },
    handleTabClick (tab) {
      switch (tab.name) {
        case 'file':
          this.fileQueryParam.page = 1
          this.handleQueryFile()
          break
        case 'image':
          this.imageQueryParam.page = 1
          this.handleQueryImage()
          break
        default:
          break
      }
    },
    handleQueryFile () {
      this.$get('/material-file/search', { params: this.fileQueryParam }).then(res => {
        this.fileData = res.data
      })
    },
    handleFileChange (e) {
      if (!e.target.files || !e.target.files.length) {
        return
      }
      this.uploadingForFile = true
      const formdata = new FormData()
      for (const file of e.target.files) {
        formdata.append('files', file)
      }
      formdata.append('type', 4)
      // formdata.append('type', 'image')
      this.$refs.fileUploadForm.reset()
      this.$post('/material-file/upload', formdata, { 'Content-Type': 'multipart/form-data' }).then(res => {
        if (res.code === 0) {
          this.$notify.success('上传成功')
          this.handleQueryFile()
        }
        this.uploadingForFile = false
      }).catch(() => {
        this.uploadingForFile = false
      })
    },
    handleImageChange (e) {
      if (!e.target.files || !e.target.files.length) {
        return
      }
      this.uploadingForImage = true
      const formdata = new FormData()
      for (const file of e.target.files) {
        formdata.append('files', file)
      }
      formdata.append('type', 1)
      // formdata.append('type', 'image')
      this.$refs.fileUploadForm.reset()
      this.$post('/material-file/upload', formdata, { 'Content-Type': 'multipart/form-data' }).then(res => {
        if (res.code === 0) {
          this.$notify.success('上传成功')
          this.handleQueryImage()
        }
        this.uploadingForImage = false
      }).catch(() => {
        this.uploadingForImage = false
      })
    },
    openOssChooseDialog () {
      this.$ossChooseDialog({
        title: '选择图片',
        type: 1
      })
    },
    handleImageGroupIdChange () {
      this.imageQueryParam.page = 1
      this.handleQueryImage()
    },
    handleFileGroupIdChange () {
      this.fileQueryParam.page = 1
      this.handleQueryFile()
    }
  }
}
</script>

<style lang="scss" scoped>
// .wrapper {
//   padding: 30px  10px;
//   background: #ffffff;

// }
.group-toolbar {
  // padding: 20px 0;
  padding-bottom: 30px;
  ::v-deep {
    .el-radio {
      margin-right: 0px;
      margin-bottom: 10px;
    }
  }
}
.group-label {
  margin-right: 10px;
}
.grid-wrapper {
  .grid-list {
    padding: 20px 20px 0;
    .grid-item {
      cursor: pointer;
      position: relative;
      display: inline-block;
      // float: left;
      width: 160px;
      margin: 0 20px 30px 0;
      text-align: center;
      .img-thumb {
        display: block;
        width: 100%;
        height: auto;
        -webkit-background-size: contain;
        background-size: contain;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        padding-bottom: 100%;
        border: 1px solid transparent;
        border-radius: 3px;
        overflow: hidden;
      }
      .img-title {
        display: block;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        font-weight: 400;
        padding: 10px 10px 0;
        line-height: 36px;
      }
    }
  }
}
.refresh-btn {
  // font-size: 14px;
  margin-left: 16px;
  cursor: pointer;
}
</style>
