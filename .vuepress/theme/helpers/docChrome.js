const KEY_LEFT = 'docShowLeftNav'
const KEY_RIGHT = 'docShowRightOutline'

export function loadDocChromeState () {
  if (typeof sessionStorage === 'undefined') {
    return { left: true, right: true }
  }
  try {
    const l = sessionStorage.getItem(KEY_LEFT)
    const r = sessionStorage.getItem(KEY_RIGHT)
    return {
      left: l === null ? true : l === '1',
      right: r === null ? true : r === '1'
    }
  } catch (e) {
    return { left: true, right: true }
  }
}

export function saveDocChromeLeft (v) {
  try {
    sessionStorage.setItem(KEY_LEFT, v ? '1' : '0')
  } catch (e) {}
}

export function saveDocChromeRight (v) {
  try {
    sessionStorage.setItem(KEY_RIGHT, v ? '1' : '0')
  } catch (e) {}
}
