const isNumber = target => typeof target === 'number'

const isUndefined = target => typeof target === 'undefined'

/**
 * 获取dom元素
 * @param {String} sel
 */
export const dom = sel => {
  const sign = sel.charAt(0)
  if (sign === '#') {
    return document.getElementById(sel.slice(1))
  } else {
    return document.querySelectorAll(sel)
  }
}

/**
 * 获取/设置元素单个css
 * @param {Object} el
 * @param {String} key
 * @param {String} value
 */
export const domCss = (el, key, value) => {
  const dfStyles = window.getComputedStyle(el)
  if (isUndefined(value)) {
    return dfStyles[key]
  } else {
    el.style[key] = isNumber(value) ? value + 'px' : value
    return value
  }
}

/**
 * 设置元素多个css属性
 * @param {Object} el
 * @param {Object} option
 */
export const domSetStyles = (el, option) => {
  if (!el || !option) return
  Object.entries(option).forEach(item => {
    el.style[item[0]] = isNumber(item[1]) ? item[1] + 'px' : item[1]
  })
  return true
}

/**
 * 移除元素
 * @param {Object} el
 */
export const domRemove = el => {
  if (!el) return
  const parentNode = el.parentNode
  if (parentNode) {
    parentNode.removeChild(el)
  }
  return true
}

/**
 * 元素事件监听
 * @param {String} eventName
 * @param {Object} el
 * @param {Function} handler
 */
export let eventListen = (el, eventName, handler) => {
  if (el.addEventListener) {
    eventListen = (el, eventName, handler) => {
      handler = handler.bind(el)
      el.addEventListener(eventName, handler, false)
    }
  } else {
    eventListen = (el, eventName, handler) => {
      handler = handler.bind(el)
      el.attachEvent('on' + eventName, handler)
    }
  }

  eventListen(el, eventName, handler)
}

/**
 * 元素事件移除
 * @param {String} eventName
 * @param {Object} el
 * @param {Function} handler
 */
export let eventRemove = (el, eventName, handler) => {
  if (el.addEventListener) {
    eventRemove = (el, eventName, handler) => {
      handler = handler.bind(el)
      el.addEventListener(eventName, handler, false)
    }
  } else {
    eventRemove = (el, eventName, handler) => {
      handler = handler.bind(el)
      el.attachEvent('on' + eventName, handler)
    }
  }
  eventRemove(el, eventName, handler)
}
