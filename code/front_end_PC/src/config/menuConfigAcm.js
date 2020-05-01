const menuListAcm = [
    {
        title:'首页',
        key:'/admin/home'
    },
    {
        title:'用户',
        key:'/admin/user',
        children:[
            {
                title:'用户分析',
                key:'/admin/user/analysis',
            },
            {
                title:'用户管理',
                key:'/admin/user/manage',
            }
        ]
    },
    {
        title:'新闻',
        key:'/admin/news',
        children:[
            {
                title:'类别',
                key:'/admin/news/category',
            },
            {
                title:'添加新闻',
                key:'/admin/news/add',
            },
            {
                title:'管理新闻',
                key:'/admin/news/manage',
            },
        ]
    },
    {
        title:'公告',
        key:'/admin/announcement',
        children:[
            {
                title:'类别',
                key:'/admin/announcement/category',
            },
            {
                title:'添加公告',
                key:'/admin/announcement/add',
            },
            {
                title:'管理公告',
                key:'/admin/announcement/manage',
            },
        ]
    },
    {
        title:'讨论区管理',
        key:'/admin/forum',
        children:[
            {
                title:'标签管理',
                key:'/admin/forum/label',
            },
            {
                title:'管理帖子',
                key:'/admin/forum/manage',
            },
            {
                title:'添加帖子',
                key:'/admin/forum/add',
            },
        ]
    },
    {
        title:'友情链接',
        key:'/admin/friendurl',
    },
    {
        title:'值日管理',
        key:'/admin/onduty',
    },
    {
        title:'关于我们',
        key:'/admin/about',
    },
    {
        title:'系统反馈',
        key:'/admin/feedback',
    },
    {
        title:'举报管理',
        key:'/admin/report',
    },
    {
        title:'测试组件',
        key:'/admin/test',
    },
];
export default menuListAcm;