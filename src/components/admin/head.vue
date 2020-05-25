<template>
  <div>
    <ul id="lis">
      <li>
        <router-link to="/Index/Manager">Manager</router-link>
      </li>
      <li>
        <router-link to="/Index/SeniorStaff">SeniorStaff</router-link>
      </li>
      <li>
        <router-link to="/Index/SuperVisor">SuperVisor</router-link>
      </li>
      <li>
        <router-link to="/Index/SystemAdministrator">SystemAdministrator</router-link>
      </li>
      <li>
        <router-link to="/Index/JuniorStaff">JuniorStaff</router-link>
      </li>
    </ul>
    <div class="SuperAdministrator">
    <el-container id="container" style=" border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu >
          
             <el-menu-item >修改用户</el-menu-item>
            
            
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="background-color: #b3c0d1; text-align: right; font-size: 12px">
          <div class="cen">
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出</el-dropdown-item>
                
              </el-dropdown-menu>
            </el-dropdown>
            <span >{{userName}}</span>
          </div>
        </el-header>

        <el-main>
         <el-row type="flex" class="row-bg" justify="left">
            <p >所属的部门：</p>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6" v-for="Workell in inWorkcell" :key="Workell.Workcell">
              <div class="grid-content bg-purple">{{Workell.WorkcellName}}</div>
            </el-col>
           
          </el-row>
          <el-row type="flex" class="row-bg" justify="left">
            <p >全部的部门：</p>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6" v-for="Workell in allWorkcell" :key="Workell.Workcell">
              <div class="grid-content bg-purple">{{Workell.WorkcellName}}</div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: "Index",
  data() {
    return {
      userName:"admin",
      labelPosition: "right",
      formLabelAlign: {
        uid:'1',
      },
      inWorkcell:[{"Workcell":1,"Role":5,"WorkcellName":"华为 "},{"Workcell":5,"Role":1,"WorkcellName":"索尼"},{"Workcell":1,"Role":3,"WorkcellName":"华为 "}],
      allWorkcell:[{"Workcell":1,"Role":5,"WorkcellName":"华为 "},{"Workcell":5,"Role":1,"WorkcellName":"索尼"},{"Workcell":1,"Role":3,"WorkcellName":"华为 "}]
    }
  },
  created(){
    // Axios({
    //     method:'get',
    //     baseURL:'http://api.zjk-conson.com',
    //     url:'Workcell/getWorkcellbyID?'+"uid="+this.formLabelAlign.uid
    //   }).then(res=>{
    //     this.$data.inWorkcell=res
    //   })
    //   Axios({
    //     method:'get',
    //     baseURL:'http://api.zjk-conson.com',
    //     url:'/getAllWorkcell'
    //   }).then(res=>{
    //     this.$data.allWorkcell=res
    //   })
        // console.log(this.$route.params.username)
  }
}
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
#container {
  height: 100vh;
}
.cen {
  height: 60px;
  line-height: 60px;
}

/* === */
 .el-row {
    margin-bottom: 20px;
    
  }
  .el-row:last-child {
      margin-bottom: 0;
    }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
    width: 100%;
  }
</style>
