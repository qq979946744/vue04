<template>
  <div class="SuperVisor">
    <el-container id="container" style=" border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu >
             <el-menu-item @click="out"> 出库申请</el-menu-item>
             <el-menu-item @click="join">入库申请</el-menu-item>
             <el-menu-item @click="newJoin">采购入库申请处理</el-menu-item>
             <el-menu-item @click="jionBrokenI">报废申请处理</el-menu-item>
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
  name: "SuperVisor",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(10).fill(item),
      uid:"1",
      userName:"",
      workcell:"1",
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
      jionBrokenI:function(){
          this.$router.push({
            name:'TwoBroken',
            query:{workcell:this.workcell,uid:this.uid}
          })
      },
      newJoin:function(){
          this.$router.push({
            name:'TwoNewJoin',
            query:{workcell:this.workcell,uid:this.uid}
          })
      },
      join:function(){
          this.$router.push({
            name:'SuperVisorJoin',
            query:{workcell:this.workcell,uid:this.uid}
          })
      },
      out:function(){
          this.$router.push({
            name:'SuperVisorOut',
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
            this.$cookies.set("username",this.$cookies.get("username"),"30MIN");
            //设置cookie- uid
            this.$cookies.set("uid",this.$cookies.get("uid"),"30MIN");
       }else{
           alert("请重新登入")
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
