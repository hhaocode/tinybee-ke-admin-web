import Vue from 'vue'

import OssChooseDialog from './OssChooseDialog'

const OssChooseDialogConstructor = Vue.extend(OssChooseDialog)
let dom = null
export default (o) => {
  o = o || { title: '选择对象' }
  if (!dom) {
    dom = new OssChooseDialogConstructor({
      el: document.createElement('div')
    })
    document.body.appendChild(dom.$el)
  }
  dom.title = o.title
  dom.visible = true
  dom.param = {
    groupId: '',
    type: o.type || 1,
    size: 10,
    page: 1
  }
  dom.type = o.type || 1
  dom._confirm = o.confirm
  dom._cancel = o.cancel
  dom._close = o.close
  // dom._refreshData()
  console.log(dom)
}
