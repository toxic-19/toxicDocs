const sidebar = require("./sidebar.js");
module.exports = {
  title: "toxicDocs",
  description: "就像数1,2,3一样容易",
  base:'/toxicDocs/',
  // theme: "reco",
  themeConfig: {
    // subSideBar: "auto",
    mode: "light",
    logo: "/webLogo.png",
    authorAvatar: "/webLogo.png",
    type: "blog",
    author: "toxic",
    head: [
      [
        "link",
        {
          rel: "icon",
          href: "/webLogo.png",
        },
      ],
      [
        "meta",
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1,user-scalable=no",
        },
      ],
    ],
    nav: [{ text: "首页", link: "/", icon: "reco-home" }],
    sidebar,
    blogConfig: {
      category: {
        location: 2,
        text: "目录索引",
      },
      tag: {
        location: 3,
        text: "标签索引",
      },
    },
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    markdown: {
      lineNumbers: true,
    },
  },
};
