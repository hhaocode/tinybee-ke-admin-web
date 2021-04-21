export function hasClass (el, className) {
  if (!className.replace(/\s/g, '').length) return false
  return new RegExp(' ' + className + ' ').test(' ' + el.className + ' ')
}
export function getStyle (el) {
  return el.currentStyle ? el.currentStyle : window.getComputedStyle(el)
}
