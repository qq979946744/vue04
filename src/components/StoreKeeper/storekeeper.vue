<template>
    <div class="storekeeper">
      <el-container id="container" style=" border: 1px solid #eee">
       <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router>
          <el-menu-item index="/"> 出库申请</el-menu-item>
          <el-menu-item>报库申请</el-menu-item>
          <el-menu-item index="/JuniorStaff/JoinRepair">
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

}
</script>

<style>

</style>