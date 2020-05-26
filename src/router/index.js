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
import TwoBroken from '../components/SuperVisor/TwoBroken'
import ThreeBroken from '../components/Manager/ThreeBroken'
import Out from '../components/Out.vue'
import Join from '../components/Join.vue'

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
                },
                {
                    path: '/JuniorStaff/Out',
                    name: 'JuniorStaffOut',
                    component: Out
                },
                {
                    path: '/JuniorStaff/Join',
                    name: 'JuniorStaffJoin',
                    component: Join
                }


            ]
        },
        {
            path: '/Manager',
            name: 'Manager',
            component: Manager,
            children: [{
                    path: '/Manager/ThreeBroken',
                    name: 'ThreeBroken',
                    component: ThreeBroken
                },
                {
                    path: '/Manager/Out',
                    name: 'ManagerOut',
                    component: Out
                },
                {
                    path: '/Manager/Join',
                    name: 'ManagerJoin',
                    component: Join
                }
            ]


        },
        {
            path: '/SuperVisor',
            name: 'SuperVisor',
            component: SuperVisor,
            children: [{
                    path: '/SuperVisor/TwoBroken',
                    name: 'TwoBroken',
                    component: TwoBroken
                },
                {
                    path: '/SuperVisor/Out',
                    name: 'SuperVisorOut',
                    component: Out
                },
                {
                    path: '/SuperVisor/Join',
                    name: 'SuperVisorJoin',
                    component: Join
                }
            ]
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
                },
                {
                    path: '/SeniorStaff/Out',
                    name: 'SeniorStaffOut',
                    component: Out
                },
                {
                    path: '/SeniorStaff/Join',
                    name: 'SeniorStaffJoin',
                    component: Join
                }
            ]
        }
    ]
})