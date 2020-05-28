<template>
  <div class="SeniorStaff">
    <el-container id="container" style=" border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router>
             <el-menu-item @click="out"> 出库申请</el-menu-item>
             <el-menu-item @click="join">入库申请</el-menu-item>            
             <el-menu-item @click="newJoin"> 新夹具入库申请</el-menu-item>
             <el-menu-item @click="selectRepair">报修申请处理</el-menu-item>
             <el-menu-item @click="selectBroken">报废申请</el-menu-item>
             
           
            
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="background-color: #b3c0d1; text-align: right; font-size: 12px">
          <div class="cen">
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>王小虎</span>
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
      workcell:"1",
      role:"2",
      index:1
    };
  },
  methods:{
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
