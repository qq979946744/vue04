import Vue from 'vue'
import Router from 'vue-router'
// 登陆
import Login from '../pages/Login'
// 主页
import Index from '../pages/Index'

// SeniorStaff
import SeniorStaff from '../components/admin/SeniorStaff'
import Manager from '../components/admin/Manager'
import SuperVisor from '../components/admin/SuperVisor'
import SystemAdministrator from '../components/admin/SystemAdministrator'
import JuniorStaff from '../components/admin/JuniorStaff'
import JoinRepair from '../components/SeniorStaffCom/JoinRepair'
import JoinBroken from '../components/JuniorStaffCom/JoinBroken'
import queryRecordRP from '../components/JuniorStaffCom/queryRecordRP'

Vue.use(Router)

export default new Router({
    linkExactActiveClass: "act",
    mode: "history",
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/Index',
            name: 'Index',
            component: Index,
        },
        {

            path: '/JuniorStaff',
            name: 'JuniorStaff',
            component: JuniorStaff,
            children: [{
                path: '/JuniorStaff/JoinRepair',
                name: 'JoinRepair',
                component: JoinRepair
            }]
        },
        {
            path: '/Manager',
            name: 'Manager',
            component: Manager
        },
        {
            path: '/SuperVisor',
            name: 'SuperVisor',
            component: SuperVisor
        },
        {
            path: '/SystemAdministrator',
            name: 'SystemAdministrator',
            component: SystemAdministrator
        },
        {
            path: '/SeniorStaff',
            name: 'SeniorStaff',
            component: SeniorStaff,
            children: [{
                    path: '/SeniorStaff/JoinBroken',
                    name: 'JoinBroken',
                    component: JoinBroken
                },
                {
                    path: '/SeniorStaff/queryRecordRP',
                    name: 'queryRecordRP',
                    component: queryRecordRP
                }
            ]
        }
    ]
})