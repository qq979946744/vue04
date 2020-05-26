<template>
  <div class="JuniorStaff">
    <el-container id="container" style=" border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router>
          <el-menu-item @click="out"> 出库申请</el-menu-item>
          <el-menu-item @click="join">入库申请</el-menu-item>
          <el-menu-item @click="repair">
            报修申请
          </el-menu-item>
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
  name: "JuniorStaff",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(10).fill(item),
      uid:"1",
      workcell:"1",
      role:"",
      index:1

    };
  },
  methods:{
      repair:function(){
          this.$router.push({
            name:'JoinRepair',
            query:{workcell:this.workcell,uid:this.uid}
          })
      },
      join:function(){
          this.$router.push({
            name:'JuniorStaffJoin',
            query:{workcell:this.workcell,uid:this.uid}
          })
      },
      out:function(){
          this.$router.push({
            name:'JuniorStaffOut',
            query:{workcell:this.workcell,uid:this.uid}
          })
      }
  },
  created(){
      this.uid=this.$route.query.uid
      this.workcell=this.$route.query.uid
      this.role=this.$route.query.uid
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
