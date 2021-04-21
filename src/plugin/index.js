import Vue from 'vue'

import 'default-passive-events'

import 'normalize.css/normalize.css'
// element
import Element from 'element-ui'
import '@/styles/element-variables.scss'
import '@/styles/base.scss'

import 'nprogress/nprogress.css'

import '@/assets/font-awesome-4.7.0/scss/font-awesome.scss'

import VCharts from 'v-charts'

import ElTreeSelect from 'el-tree-select'
// import GeminiScrollbar from 'vue-gemini-scrollbar'

// import waterfall from 'vue-waterfall2'
// Vue.use(waterfall)
import permission from '@/components/Permission'

import http from '@/utils/http'

import 'video.js/dist/video-js.css'

import waterfall from 'vue-waterfall2'

import CKEditor from 'ckeditor4-vue'

import Contextmenu from 'vue-contextmenujs'

import VueClipboard from 'vue-clipboard2'

import OssChooseDialog from './ossChooseDialog'

/**
 * self
 */
import MultipleSelect from '@/components/form/MultipleSelect'
import MutipleMediaUpload from '@/components/form/MutipleMediaUpload'
import WangEditor from '@/components/form/WangEditor'
import SingleImageUpload from '@/components/common/SingleImageUpload'
import ArcusTable from '@/components/table/ArcusTable'
import TinyBeeTable from '@/components/table/TinyBeeTable'
import ImageSelect from '@/components/form/ImageSelect'
import ImageChoose from '@/components/form/ImageChoose'
import NoData from '@/components/common/NoData'
import LecturerSelect from '@/components/form/LecturerSelect'
import BlockArea from '@/components/common/BlockArea'
Vue.use(Contextmenu)

Vue.component('multiple-select', MultipleSelect)
Vue.component(MutipleMediaUpload.name, MutipleMediaUpload)
Vue.component(WangEditor.name, WangEditor)
Vue.component(SingleImageUpload.name, SingleImageUpload)
Vue.component(ArcusTable.name, ArcusTable)
Vue.component(TinyBeeTable.name, TinyBeeTable)
Vue.component(ImageSelect.name, ImageSelect)
Vue.component(ImageChoose.name, ImageChoose)
Vue.component(NoData.name, NoData)
Vue.component(LecturerSelect.name, LecturerSelect)
Vue.component(BlockArea.name, BlockArea)

Vue.prototype.$http = http
Vue.prototype.$get = http.get
Vue.prototype.$post = http.post
Vue.prototype.$delete = http.delete
Vue.prototype.$put = http.put

Vue.prototype.$ossChooseDialog = OssChooseDialog

// Vue.use(GeminiScrollbar)
Vue.use(Element, { size: 'small' })
Vue.use(VCharts)
Vue.use(ElTreeSelect)

Vue.use(waterfall)

// var scrollbar = new Vue.$geminiScrollbar({
//   element: document.body
// }).create()

// console.log('scrollbar: ', scrollbar)
Vue.use(CKEditor)
Vue.use(permission)
// Vue.use(VideoPlayer)
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)
