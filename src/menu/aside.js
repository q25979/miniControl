// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '信息管理',
    icon: 'folder-o',
    children: [
      { path: '/list', title: '信息列表' },
      { path: '/add', title: '信息添加' },
      { path: '/img', title: '图片管理' }
    ]
  }
]
