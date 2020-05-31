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
import TwoNewJoin from '../components/SuperVisor/TwoNewJoin'
import ThreeBroken from '../components/Manager/ThreeBroken'
import ThreeNewJoin from '../components/Manager/ThreeNewJoin'
import PM from '../components/JuniorStaffCom/PM'
import PMTwo from '../components/JuniorStaffCom/PMTwo'
import Out from '../components/Out.vue'
import Join from '../components/Join.vue'
import NewJoin from '../components/SeniorStaffCom/NewJoin'
import Postion from '../components/Postion'
import Work from '../components/work'
import Life from '../components/Life'

import storekeeper from '../components/StoreKeeper/storekeeper'
import findStaff from '../components/SystemAdministrator/findStaff'
import modifyInfo from '../components/SystemAdministrator/modifyInfo'
import addMember from '../components/SystemAdministrator/addMember'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

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

            path: '/Postion',
            name: 'Postion',
            component: Postion,
        },
        {

            path: '/Life',
            name: 'Life',
            component: Life,
        },
        {

            path: '/Work',
            name: 'Work',
            component: Work,
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
                    path: '/Manager/ThreeNewJoin',
                    name: 'ThreeNewJoin',
                    component: ThreeNewJoin
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
                    path: '/SuperVisor/TwoNewJoin',
                    name: 'TwoNewJoin',
                    component: TwoNewJoin
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
            component: SystemAdministrator,
            children: [{
                    path: '/SystemAdministrator/findStaff',
                    name: 'findStaff',
                    component: findStaff
                },
                {
                    path: '/SystemAdministrator/modifyInfo',
                    name: 'modifyInfo',
                    component: modifyInfo
                },
                {
                    path: '/SystemAdministrator/addMember',
                    name: 'addMember',
                    component: addMember
                }
            ]
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
                    path: '/SeniorStaff/NewJoin',
                    name: 'SeniorStaffNewJoin',
                    component: NewJoin
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
                },
                {
                    path: '/SeniorStaff/PM',
                    name: 'SeniorStaffPM',
                    component: PM
                },
                {
                    path: '/SeniorStaff/PMTwo',
                    name: 'SeniorStaffPMTwo',
                    component: PMTwo
                }
            ]
        }
    ]
})