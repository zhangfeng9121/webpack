// 抽离路由模块

// 导入vue-router模块
import VueRouter from 'vue-router'

// 导入组件对象
import account from './main/account.vue'
import goodlist from './main/goodList.vue'

// 导入子组件
import zLogin from './submain/login.vue'
import register from './submain/register.vue'
// 3. 创建路由对象
var router = new VueRouter({
    routes: [
        {
            path: '/account',
            component:account,
            children: [
                {path:'login', component:zLogin},
                {path:'register', component:register},
            ]
        },
        {path: '/goodlist', component:goodlist}
    ]
});

export default router