<template>
  <div class="SuperAdministrator">
    <el-container id="container" style=" border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router >
             <el-menu-item @click="find">查找用户</el-menu-item>
             <el-menu-item @click="motify">修改用户信息</el-menu-item>
             <el-menu-item @click="add">新添成员</el-menu-item>
            
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="background-color: #b3c0d1; text-align: right; font-size: 12px">
            
          <div class="cen">
            <el-button style="float:left;margin-top:10px" type="primary" icon="el-icon-s-home" @click="index" circle></el-button>
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="exit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>{{this.username}}</span>
          </div>
        </el-header>

        <el-main>
             <transition name="slide-fade" mode="out-in">
                 <router-view></router-view>
             </transition>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  data(){
    return{
       username:'',
       workcell:''
    }
  },
  created(){

      if(this.$cookies.isKey('uid')){
            this.workcell=this.$route.query.workcell
            this.role=this.$route.query.role
            this.username=this.$cookies.get('username')
             //设置cookie-用户名username 30分钟
            this.$cookies.set("username",this.$cookies.get('username'),"30MIN");
            //设置cookie- uid
            this.$cookies.set("uid",this.$cookies.get("uid"),"30MIN");
       }else{
           alert("您未登入，或者登入过期；请重新登入")
         this.$router.push({
                 name:'Login',
            })
       }
  },
  methods:{
      index(){
        this.$router.push({
            name:'Index'
        })
      },
      exit(){
        if(this.$cookies.remove('uid')){
            if(this.$cookies.remove('username')){
                alert('退出成功')
                this.$router.push({
                name:'Login'
                })
            }else{
                alert('退出失败 ')
            }
        }
    },
    motify(){
      this.$router.push({
        path:'/SystemAdministrator/modifyInfo',
        query:{workcell:this.workcell}
      })
    },
    find(){
      this.$router.push({
        path:'/SystemAdministrator/findStaff',
        query:{workcell:this.workcell}
      })
    },
    add(){
      this.$router.push({
        path:'/SystemAdministrator/addMember',
        query:{workcell:this.workcell}
      })
    }
  }
};
</script>


<style scoped>
#container {
  height: 100vh;
}
.cen {
  height: 60px;
  line-height: 60px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
