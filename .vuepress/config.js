const sidebar = require("./sidebar.js")
module.exports = {
  title: "toxicDocs",
  description: "  ",
  base: "/toxicDocs/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/awa.jpg"
      }
    ],
    [
      "meta",
      // {
      //   name: "viewport",
      //   content: "width=device-width,initial-scale=1,user-scalable=no",
      // },
      {
        name: "referrer",
        content: "no-referrer"
      }
    ]
  ],
  themeConfig: {
    subSideBar: "auto",
    mode: "light",
    logo: "/7.jpg",
    authorAvatar: "/awa.jpg",
    type: "blog",
    author: "toxic",
    nav: [
      { text: "首页", link: "/", icon: "reco-home" },
      {
        text: "时间线",
        link: "/timeline/",
        icon: "reco-date"
      }
    ],
    blogConfig: {
      category: {
        location: 2,
        text: "目录索引"
      },
      tag: {
        location: 3,
        text: "标签索引"
      }
    },
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    friendLink: [
      // {
      //   title: "Gitte",
      //   link: "https://gitee.com/zhizhu_wlz/toxic-docs"
      // },
      {
        title: "语雀",
        link: "https://www.yuque.com/toxic-19",
        icon: "/yuque.png"
      }
      // {
      //   title: "林嫄袁",
      //   link: "https://ggot.top/"
      // }
      // ...
    ],
    noFoundPageByTencent: false,
    sidebar
  },
  plugins: [
    [
      "vuepress-plugin-auto-sidebar",
      {
        // options
      }
    ],
    // 代码复制弹窗插件
    // ["vuepress-plugin-nuggets-style-copy", {
    //   copyText: "复制代码",
    //   tip: {
    //       content: "复制成功!"
    //   }
    // }],
    // 标签加强
    ["vuepress-plugin-boxx"]
  ],
  markdown: {
    lineNumbers: true
  }
}
