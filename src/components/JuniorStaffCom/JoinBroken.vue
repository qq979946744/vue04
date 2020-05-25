<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="夹具标识">
        <el-input v-model="form.IDs"></el-input>
      </el-form-item>
     <el-form-item label="记录人">
        <el-input v-model="form.IDs"></el-input>
      </el-form-item>
      
      
      
      <el-form-item label="报废问题">
        <el-input type="textarea" v-model="form.Problem"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">申请</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    data() {
      return {
        form: {
          IDs: '',
          RecordMan: '',
          Problem: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
