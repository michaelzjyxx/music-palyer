export function addClass (el, classname) {
  if (hasClass(el, classname)) {
    return
  }
  let newclass = el.className.split(' ')
  newclass.push(classname)
  el.className = newclass.join(' ')
}

export function hasClass (el, classname) {
  let reg = new RegExp('(^|\\s)' + classname + '(\\s|$)')
  return reg.test(el.className)
}

export function getData (el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}
