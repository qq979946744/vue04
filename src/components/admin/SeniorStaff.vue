<template>
  <div class="SeniorStaff">
    <el-container id="container" style=" border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router>
             <el-menu-item @click="out"> 出库申请</el-menu-item>
             <el-menu-item @click="join">入库申请</el-menu-item>            
             <el-menu-item @click="PM">PM定期检查</el-menu-item>
             <el-menu-item @click="newJoin"> 新夹具入库申请</el-menu-item>
             <el-menu-item @click="selectRepair">报修申请处理</el-menu-item>
             <el-menu-item @click="selectBroken">报废申请</el-menu-item>
             
           
            
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="background-color: #b3c0d1; text-align: right; font-size: 12px">
          <div class="cen">
            <el-button style="float:left;margin-top:10px" type="primary" icon="el-icon-s-home" @click="toIndex" circle></el-button>

            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="exit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>{{userName}}</span>
          </div>
        </el-header>

        <el-main>
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "SeniorStaff",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item),
      uid:"1",
      userName:"",
      workcell:"",
      role:"",
      index:1
    };
  },
  methods:{
      toIndex(){
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
      selectRepair:function(){
          this.$router.push({
            name:'queryRecordRP',
            query:{workcell:this.workcell,uid:this.uid}
          })
      },
      selectBroken:function(){
          this.$router.push({
            name:'JoinBroken',
            query:{workcell:this.workcell,uid:this.uid}
          })
      },
      join:function(){
          this.$router.push({
            name:'SeniorStaffJoin',
            query:{workcell:this.workcell,uid:this.uid}
          })
      },
      out:function(){
          this.$router.push({
            name:'SeniorStaffOut',
            query:{workcell:this.workcell,uid:this.uid}
          })
       },
        newJoin:function(){
          this.$router.push({
            name:'SeniorStaffNewJoin',
            query:{workcell:this.workcell,uid:this.uid}
          })
      },
       PM:function(){
          this.$router.push({
            name:'SeniorStaffPM',
            query:{workcell:this.workcell,uid:this.uid}
          })
      }
  },
  created(){
       if(this.$cookies.isKey('uid')){
            this.uid=this.$route.query.uid
            this.workcell=this.$route.query.workcell
            this.role=this.$route.query.role
            this.userName=this.$cookies.get('username')
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
