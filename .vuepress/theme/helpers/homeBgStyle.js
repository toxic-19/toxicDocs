/** 首页 README frontmatter 中的 bgImage / bgImageStyle，与 HomeBlog 原逻辑一致 */
export function getHomePageBgStyle (instance) {
  if (!instance || !instance.$frontmatter) return {}

  const url = instance.$frontmatter.bgImage
    ? instance.$withBase(instance.$frontmatter.bgImage)
    : require('../images/bg.svg')

  const base = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'transparent'
  }

  const custom = instance.$frontmatter.bgImageStyle
  return custom ? { ...base, ...custom } : base
}
