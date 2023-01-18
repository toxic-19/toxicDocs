const { createSideBarConfig } = require('./util')
const FRONTEND_PATH = '/toxicBlogs/frontEnd'
const MINIPROGRAM_PATH = '/toxicBlogs/miniProgram'
// const SOURCECODE_PATH = '/toxicBlogs/sourceCode'
const ALGORITHM_PATH = '/toxicBlogs/algorithm'
const TUTORIALS_PATH = '/toxicBlogs/tutorials'
const OTHER_PATH = '/toxicBlogs/other'


module.exports = {
  [FRONTEND_PATH]: [createSideBarConfig('前端', FRONTEND_PATH)],
  [MINIPROGRAM_PATH]: [createSideBarConfig('小程序', MINIPROGRAM_PATH)],
  // [SOURCECODE_PATH]: [createSideBarConfig('源码共读', SOURCECODE_PATH)],
  [ALGORITHM_PATH]: [createSideBarConfig('算法', ALGORITHM_PATH)],
  [TUTORIALS_PATH]: [createSideBarConfig('教程', TUTORIALS_PATH)],
  [OTHER_PATH]: [createSideBarConfig('其他', OTHER_PATH)],
}
