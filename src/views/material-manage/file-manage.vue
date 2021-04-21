<template>
  <div class="page">
    <div class="">
      <div>
        <el-button @click="openOssChooseDialog">选择图片</el-button>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 图片 -->
        <el-tab-pane label="图片" name="image">
          <div class="wrapper">
            <div class="flex space-between ">
              <div>
                <span>图片（共{{imageData.cnt}}条）</span>
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
                    <span class="el-button file-upload-btn el-button--primary el-button--small">
                      <form ref="imageUploadForm">
                        选择文件<input type="file" name="file" @change="handleImageChange" accept="image/x-png, image/bmp, image/png, image/jpeg, image/jpg, image/gif" multiple>
                      </form>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="group-toolbar flex">
              <!-- <div>分组</div> -->
              <el-radio-group v-model="imageQueryParam.groupId" size="small">
                <el-radio-button v-for="(item, index) in imageData.groupCnt" :label="item.id" :key="index">{{item.name}}({{item.cnt}})</el-radio-button>
              </el-radio-group>
            </div>
            <div>
              <el-checkbox-group v-model="imageDataSelection" @change="handleImageDataSelection">
                <el-row :gutter="20" style="margin-bottom: 20px;">
                  <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="item in imageData.page.records" :key="item.id">
                    <div>
                      <div style="overflow: hidden;">
                         <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
                      </div>
                      <el-image
                        style="width: 100%; height: 140px"
                        :src="item.url"
                        :preview-src-list="imageData.page.records.map(v => v.url)">
                      </el-image>
                    </div>
                  </el-col>
                </el-row>
              </el-checkbox-group>
              <div style="padding-top: 30px;" class="flex row space-between">
                <div class="flex row a-center">
                  <div style="margin-right: 10px;">
                    <el-checkbox v-model="allImageChecked" @change="handleAllImageChecked" >全选</el-checkbox>
                  </div>
                  <div>
                    <el-button type="danger" @click="handleDeleteImageBySelection">删除</el-button>
                    <el-button type="warning">移动组</el-button>
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
        <!-- 视频 -->
        <el-tab-pane label="视频" name="video">
          <div class="wrapper">
            <div class="flex space-between ">
              <div>
                <span>视频（共{{videoPage.total}}条）</span>
                <!-- <i class="el-icon-menu"></i> -->
                <span>
                  <el-button icon="el-icon-refresh" class="refresh-btn" circle @click="handleQueryVideo"></el-button>
                </span>
              </div>
              <div>
                <el-button type="primary" @click="handleUploadVideo('')">添加视频</el-button>
              </div>
            </div>
            <div>
              <div style="padding-top: 20px;">
                <el-table ref="videoTable" :data="videoPage.records">
                  <el-table-column prop="title" label="标题"></el-table-column>
                  <el-table-column prop="name" label="名称">
                    <template slot-scope="{row}">
                      <el-link @click="handleGoPlayVideo(row.id)">{{row.name}}</el-link>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="状态"></el-table-column> -->
                  <el-table-column prop="modifyTime" label="更新时间"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="{row}">
                      <el-button type="warning" size="mini">删除</el-button>
                      <el-button type="primary" size="mini" @click="handleUploadVideo(row)">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div style="padding-top: 20px; text-align: right;">
                <el-pagination
                  @size-change="size => { this.videoQueryParam.size = size; this.handleQueryVideo() }"
                  @current-change="page => { this.videoQueryParam.size = page; this.handleQueryVideo() }"
                  :current-page="videoQueryParam.page"
                  :page-sizes="[1, 2, 5, 10]"
                  :page-size="videoQueryParam.size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="videoPage.total">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <!-- 音频 -->
        <el-tab-pane label="音频" name="audio">
          <div class="wrapper">
            <div class="flex space-between ">
              <div>
                <span>音频（共{{audioPage.total}}条）</span>
                <i class="el-icon-menu"></i>
                <span>
                  <el-button icon="el-icon-refresh" class="refresh-btn" circle @click="handleQueryAudio"></el-button>
                </span>
              </div>
              <div>
                <el-button type="primary" @click="handleUploadAudio('')">添加音频</el-button>
              </div>
            </div>
            <div>
              <div style="padding-top: 20px;">
                <el-table ref="videoTable" :data="audioPage.records">
                  <el-table-column prop="title" label="标题"></el-table-column>
                  <el-table-column prop="name" label="名称">
                    <template slot-scope="{row}">
                      <el-link @click="handleGoPlayAudio(row.id)">{{row.name}}</el-link>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="状态"></el-table-column> -->
                  <el-table-column prop="modifyTime" label="更新时间"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="{row}">
                      <el-button type="warning" size="mini">删除</el-button>
                      <el-button type="primary" size="mini" @click="handleUploadAudio(row)">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div style="padding-top: 20px; text-align: right;">
                <el-pagination
                  @size-change="size => { this.audioQueryParam.size = size; this.handleQueryAudio() }"
                  @current-change="page => { this.audioQueryParam.size = page; this.handleQueryAudio() }"
                  :current-page="audioQueryParam.page"
                  :page-sizes="[1, 2, 5, 10]"
                  :page-size="audioQueryParam.size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="audioPage.total">
                </el-pagination>
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
                    <span class="el-button file-upload-btn el-button--primary el-button--small">
                      <form ref="fileUploadForm">
                        选择文件<input type="file" name="file" @change="handleFileChange" multiple>
                      </form>
                    </span>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="group-toolbar flex space-between">
              <div class="flex">
                <span>分组</span>
                <ul>
                  <li v-for="groupCnt in fileData.groupCnt" :key="groupCnt.id" @click="() => { this.fileQueryParam.groupId = groupCnt.id; this.handleQueryFile() }">
                    {{groupCnt.name}}({{groupCnt.cnt}})
                  </li>
                </ul>
              </div>
              <div>
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

<!-- 添加视频 -->
    <el-dialog
      title="添加视频"
      :visible.sync="videoDialogVisible"
      width="1100px"
      >
      <div>
        <el-form label-width="80px" ref="videoForm" :model="videoForm" :rules="videoFormRules">
          <el-form-item label="上传视频" prop="vodUploadId">
            <div>
                <el-link :underline="false" type="info">请上传时长小于2.5小时的视频，支持主流的 视频格式</el-link>
            </div>
            <div class="file-upload-btn">
              <el-button class="file-upload-btn"  :disabled="videoForm.review" type="primary">
                  <form ref="videoUploadForm">
                    选择文件<input type="file" name="file" @change="handleVideoChange" id="" accept="video/mpeg4,video/mp4,video/x-matroska,video/x-flv" :disabled="videoForm.review">
                  </form>
                </el-button>
                <div v-if="videoForm.name">
                  <span @click="handleGoPlayVideo(videoForm.id)">{{videoForm.name}}</span>
                </div>
            </div>
          </el-form-item>
          <el-form-item label="封面" prop="coverUrl">
            <div>
              <el-image
                  style="width: 200px; height: 200px"
                  :src="videoForm.coverUrl"
                  fit="contain">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
            </div>

          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="videoForm.title" :show-word-limit="true" maxlength="30"></el-input>
            <el-link type="info" :underline="false">标题将展示在相关播放页面，建议填写清晰、准确、生动的标题。</el-link>
          </el-form-item>
          <el-form-item label="分类" prop="classifyId">
            <el-cascader
              v-model="videoForm.classifyId" :options="videoClassify" clearable></el-cascader>
            <el-link type="info" :underline="false">填写准确的视频分类，可以让视频有更多被发现的机会。</el-link>
          </el-form-item>
          <el-form-item label="视频介绍(选填)" prop="intro">
            <el-input type="textarea" v-model="videoForm.intro" :show-word-limit="true" maxlength="300"></el-input>
            <el-link type="info" :underline="false">介绍语将展示在相关播放页面，建议填写简洁明确、有信息量的内容</el-link>
          </el-form-item>
          <el-form-item label="标签(选填)">

          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="videoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="hanleSaveVideoInfo">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加音频"
      :visible.sync="audioDialogVisible"
      width="900px">
      <div>
        <el-form label-width="80px" ref="audioForm" :model="audioForm" :rules="audioFormRules">
          <el-form-item label="标题" prop="title">
            <el-input :show-word-limit="true" maxlength="30" v-model="audioForm.title"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="classifyId">
            <el-radio-group v-model="audioForm.classifyId">
              <el-radio v-for="classify in audioClassify" :label="classify.value" :key="classify.value">{{classify.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
           <el-form-item label="音频内容" prop="vodUploadId">
             <div>
                <el-link type="info" :underline="false" >格式支持mp3、wma、wav、amr、m4a，文件大小不超过200M，音频时长不超过2小时</el-link>
             </div>
              <div class="file-upload-btn">
              <el-button class="file-upload-btn" type="primary" :disabled="audioForm.review">
                  <form ref="audioUploadForm">
                    选择文件<input type="file" name="file" @change="handleAudioChange" id="" accept="audio/mp4,audio/mp3,audio/mpeg,audio/mpegurl,audio/wav,audio/x-ms-wma,audio/x-ms-wax" :disabled="audioForm.review">
                  </form>
                </el-button>
                <div v-if="audioForm.name">
                  <span @click="handleGoPlayAudio(audioForm.id)">{{audioForm.name}}</span>
                </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="audioDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="hanleSaveAudioInfo">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog  title="添加音频" :visible.sync="videoPlayDialogVisible" width="900px">
       <div v-if="videoPlayDialogVisible" class="prism-player" id="J_prismPlayer"></div>
    </el-dialog>
  </div>
</template>

<script>
const initVideoForm = {
  id: '',
  vodUploadId: '',
  title: '',
  coverUrl: '',
  coverType: 1,
  type: 'video',
  review: false,
  data: {},
  classifyId: []
}

const initAudioForm = {
  id: '',
  vodUploadId: '',
  title: '',
  coverUrl: '',
  coverType: 1,
  type: 'audio',
  review: false,
  data: {},
  classifyId: ''
}
export default {
  data () {
    return {
      activeName: 'image',
      fileQueryParam: {
        name: '', page: 1, size: 10, groupId: '', type: 'file'
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
      videoDialogVisible: false,
      videoForm: Object.assign({}, initVideoForm),
      audioDialogVisible: false,
      audioForm: Object.assign({}, initAudioForm),
      // imageData: {
      //   records: [],
      //   total: 0
      // },
      imageQueryParam: {
        name: '', page: 1, size: 10, groupId: null, type: 'image'
      },
      imageData: {
        cnt: 0,
        groupCnt: [],
        page: {
          records: [],
          total: 0
        }
      },
      imageDataSelection: [],
      videoPage: {
        records: [],
        total: 0
      },
      videoQueryParam: {
        page: 1, size: 10, type: 'video', name: ''
      },
      audioPage: {
        records: [],
        total: 0
      },
      audioQueryParam: {
        page: 1, size: 10, type: 'audio', name: ''
      },
      videoDataSelection: [],
      videoPlayDialogVisible: false,
      player: null,
      videoClassify: [],
      videoClassifyMap: {},
      audioClassify: [],
      videoFormRules: {
        vodUploadId: [{ required: true, message: '请先上传视频文件' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        classifyId: [{ required: true, message: '请选择分类', trigger: 'change' }]
      },
      audioFormRules: {
        vodUploadId: [{ required: true, message: '请先上传音频文件' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      },
      allImageChecked: false,
      imageAllIsIndeterminate: true
    }
  },
  mounted () {
    // this.handleQueryImage()
    // this.handleQueryVideo()
    this.handleInitVodClassify()
    // this.handleQueryFile()
    // this.handleQueryVideo()
    this.handleQueryImage()
  },
  methods: {
    handleDeleteImageBySelection () {
      if (!this.imageDataSelection || !this.imageDataSelection.length) {
        this.$notify.error('未选择任何图片')
        return
      }
      this.$confirm('是否删除所选图片').then(() => {
        this.$delete('')
      })
    },
    handleAllImageChecked (val) {
      console.log(this.imageData.page.records.map(v => v.id))
      this.imageDataSelection = val ? this.imageData.page.records.map(v => v.id) : []
      // this.imageAllIsIndeterminate = false
    },
    handleImageDataSelection (val) {
      const checkedLength = val.length
      this.allImageChecked = checkedLength === this.imageData.page.records.length
      this.imageAllIsIndeterminate = checkedLength > 0 && checkedLength < this.imageData.page.records.length
    },
    handleInitVodClassify () {
      this.$get('/material-vod-classify/tree', { params: { type: 'video' } }).then(res => {
        this.videoClassify = res.data || []
        this.videoClassifyMap = {}
        this.videoClassify.forEach(v => {
          this.videoClassifyMap[v.value] = v
          if (v.children) {
            v.children.forEach(c => {
              c.parent = v
              this.videoClassifyMap[c.value] = c
            })
          }
        })
      })
      this.$get('/material-vod-classify/tree', { params: { type: 'audio' } }).then(res => {
        this.audioClassify = res.data || []
      })
    },
    handleUploadVideo (data) {
      if (data) {
        const form = Object.assign({}, data)
        //
        console.log(this.videoClassifyMap)
        if (form.classifyId && this.videoClassifyMap[form.classifyId]) {
          form.classifyId = [this.videoClassifyMap[form.classifyId].parent.value, form.classifyId]
        } else {
          form.classifyId = []
        }
        this.videoForm = form
        this.videoForm.review = true
      } else {
        this.videoForm = Object.assign({}, initVideoForm)
        this.videoForm.review = false
      }
      this.videoDialogVisible = true
    },
    handleUploadAudio (data) {
      if (data) {
        this.audioForm = Object.assign({}, data)
        this.audioForm.review = true
      } else {
        this.audioForm = Object.assign({}, initAudioForm)
        this.audioForm.review = false
      }
      this.audioDialogVisible = true
    },
    hanleSaveVideoInfo () {
      this.$refs.videoForm.validate(valid => {
        if (valid) {
          // console.log(this.videoForm)
          const param = Object.assign({}, this.videoForm, true)
          // console.log(param)
          param.classifyId = this.videoForm.classifyId && this.videoForm.classifyId.length ? this.videoForm.classifyId[1] : ''
          this.$put('/material-vod/save', param).then(res => {
            if (res.code === 0) {
              this.$notify.success('保存成功')
              this.handleQueryVideo()
              this.videoDialogVisible = false
            }
          })
        }
      })
    },
    hanleSaveAudioInfo () {
      this.$refs.audioForm.validate(valid => {
        if (valid) {
          this.$put('/material-vod/save', this.audioForm).then(res => {
            if (res.code === 0) {
              this.$notify.success('保存成功')
              this.handleQueryAudio()
              this.audioDialogVisible = false
            }
          })
        }
      })
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
      this.$get('/material-file/search', { params: this.imageQueryParam }).then(res => {
        if (res.code === 0) {
          this.imageData = res.data
        }
      })
    },
    handleQueryVideo () {
      this.$get('/material-vod/page', { params: this.videoQueryParam }).then(res => {
        this.videoPage = res.data || { records: [], total: 0 }
      })
    },
    handleQueryAudio () {
      this.$get('/material-vod/page', { params: this.audioQueryParam }).then(res => {
        this.audioPage = res.data || { records: [], total: 0 }
      })
    },
    handleTabClick (tab) {
      console.log(tab.name)
      switch (tab.name) {
        case 'file':
          this.handleQueryFile()
          break
        case 'image':
          this.handleQueryImage()
          break
        case 'video':
          this.handleQueryVideo()
          break
        case 'audio':
          this.handleQueryAudio()
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
      const formdata = new FormData()
      for (const file of e.target.files) {
        formdata.append('files', file)
      }
      formdata.append('type', 'file')
      // formdata.append('type', 'image')
      this.$refs.fileUploadForm.reset()
      this.$post('/material-file/upload', formdata, { 'Content-Type': 'multipart/form-data' }).then(res => {
        if (res.code === 0) {
          this.$notify.success('上传成功')
          this.handleQueryFile()
        }
      })
    },
    handleImageChange (e) {
      if (!e.target.files || !e.target.files.length) {
        return
      }
      const formdata = new FormData()
      for (const file of e.target.files) {
        formdata.append('files', file)
      }
      formdata.append('type', 'image')
      // formdata.append('type', 'image')
      this.$refs.fileUploadForm.reset()
      this.$post('/material-file/upload', formdata, { 'Content-Type': 'multipart/form-data' }).then(res => {
        if (res.code === 0) {
          this.$notify.success('上传成功')
          this.handleQueryImage()
        }
      })
    },
    handleVideoChange (e) {
      console.dir(e.target)
      if (!e.target.files || !e.target.files.length) {
        return
      }
      const formdata = new FormData()
      for (const file of e.target.files) {
        formdata.append('file', file)
      }
      formdata.append('type', 'video')
      this.$refs.videoUploadForm.reset()
      // formdata.append('type', 'image')
      this.$refs.fileUploadForm.reset()
      this.$post('/material/vod/upload', formdata, { 'Content-Type': 'multipart/form-data' }).then(res => {
        if (res.code === 0) {
          this.$notify.success('上传成功')
          // res.data.title = this.videoForm.title
          this.videoForm.vodUploadId = res.data.id
          this.videoForm.upload = res.data
          this.handleGetVodInfo(this.videoForm, res.data.id)
        }
      })
    },
    handleAudioChange (e) {
      if (!e.target.files || !e.target.files.length) {
        return
      }
      const formdata = new FormData()
      for (const file of e.target.files) {
        formdata.append('file', file)
      }
      formdata.append('type', 'audio')
      this.$refs.audioUploadForm.reset()
      this.$post('/material/vod/upload', formdata, { 'Content-Type': 'multipart/form-data' }).then(res => {
        if (res.code === 0) {
          this.$notify.success('上传成功')
          this.audioForm.vodUploadId = res.data.id
          this.audioForm.upload = res.data
          this.handleGetVodInfo(this.audioForm, res.data.id)
        }
      })
    },
    handleGetVodInfo (data, uploadId) {
      this.$get(`/material/vod/info/${uploadId}`).then(res => {
        const resData = res.data
        data.coverUrl = resData.coverUrl
        data.duration = resData.duration
        data.name = resData.title
        data.data = resData
      })
    },
    handleGoPlayAudio (id) {
      this.videoPlayDialogVisible = true
      this.$nextTick(() => {
        this.handlePlayVideo(id, 'audio')
      })
    },
    handleGoPlayVideo (id) {
      this.videoPlayDialogVisible = true
      this.$nextTick(() => {
        this.handlePlayVideo(id, 'video')
      })
    },
    handlePlayVideo (id, mediaType) {
      this.$get(`/material-vod/getVodPlayAuth/${id}`).then(res => {
        if (res.code === 0) {
          const data = res.data
          this.player = new window.Aliplayer({
            id: 'J_prismPlayer',
            width: '100%',
            autoplay: false,
            // 支持播放地址播放,此播放优先级最高
            // source: '播放url',
            // 播放方式二：点播用户推荐
            playsinline: true,
            vid: data.vid,
            playauth: data.playAuth,
            cover: data.metaInfo.coverURL,
            mediaType: mediaType
          }, function (player) {
            console.log('播放器创建好了。')
            console.log(player)
            console.dir(player)
            player.on('timeupdate', function () {
              console.log(arguments)
            })
          })
        }
      })
    },
    openOssChooseDialog () {
      this.$ossChooseDialog({
        title: '选择图片',
        type: 1
      })
    }
  },
  watch: {
    imageDataSelection (newVal, oldVal) {
      console.log(newVal, oldVal)
    },
    'imageQueryParam.groupId': (newVal) => {
      this.imageQueryParam.page = 1
      this.handleQueryImage()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 30px  10px;
  background: #ffffff;

}
.group-toolbar {
  padding: 20px 0;
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
