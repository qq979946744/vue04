<template>
 <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="IDs(需要入库的夹具id,多个id以,分隔)">
    <el-input v-model="formLabelAlign.IDs"></el-input>
  </el-form-item>
  <el-form-item label="产线名称">
    <el-input v-model="formLabelAlign.LineName"></el-input>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input v-model="formLabelAlign.type"></el-input>
  </el-form-item>
  <el-form-item label="记录人">
    <el-input v-model="formLabelAlign.RecordMan"></el-input>
  </el-form-item>
  <el-form-item label="经手人">
    <el-input v-model="formLabelAlign.HandMan"></el-input>
  </el-form-item>
  <el-form-item label="操作" >
    <template slot-scope="scope">  
        <el-button>出库申请</el-button>
    </template>
  </el-form-item>
</el-form>
</template>

<script>
import Axios from 'axios'
 export default {
    data() {
      return {
        labelPosition: 'top',
        formLabelAlign: {
          IDs: '',
          LineName: '',
          RecordMan: '记录人',
          HandMan:'经手人'
        }
      };
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
