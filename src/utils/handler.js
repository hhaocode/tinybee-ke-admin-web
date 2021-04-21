/**
 * list转为马匹
 * @param {*} lis
 * @param {*} key 最终的map的key字段
 */
export function listToMapHandler (lis, key) {
  const convertListToMap = (idMap, resMap, lis) => {
    lis.forEach(row => {
      resMap[row[key]] = row
      idMap[row.id] = row
      if (row.children && row.children.length) {
        convertListToMap(idMap, resMap, row.children)
      }
    })
  }
  const resMap = {}
  const idMap = {}
  convertListToMap(idMap, resMap, lis)
  for (const name in resMap) {
    resMap[name].parent = idMap[resMap[name].pid]
  }
  return resMap
}

// 将树形中的节点 从本身到最顶元素遍历成数组
export function treeNodeToArrForChildToParent (treeNode) {
  const res = []
  const appendTreeNodeToArr = treeNode => {
    if (treeNode) {
      res.push(treeNode)
      appendTreeNodeToArr(treeNode.parent)
    }
  }
  appendTreeNodeToArr(treeNode)
  return res
}

// 将树形中的节点 从本身到最顶元素遍历成数组反转
export function treeNodeToArrForChildToParentReverse (treeNode) {
  return reverseForArr(treeNodeToArrForChildToParent(treeNode))
}

export function reverseForArr (arr) {
  if (!arr) {
    return []
  }
  return arr.reverse()
}
