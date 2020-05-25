<template>
  <div>
    <el-table :data="tableData">
        <el-table-column prop="date" label="申请日期" width="140">
            
        </el-table-column>
        <el-table-column prop="name" label="申请人" width="120">
        </el-table-column>
        <el-table-column prop="address" label="维修问题">
        </el-table-column>
        <el-table-column width="150">
            <template slot-scope="scope">
                <p><el-button @click="TellMeId(scope.row.name)">处理</el-button></p> 
                <p><el-button @click="TellMeId(scope.row.name)">关闭</el-button></p> 
            </template>
        </el-table-column>

      </el-table>
  </div>
</template>

<script>
export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金事实是生生世世生生世世生生世世生生世世上海市普陀区金事实是生生世世生生世世生生世世生生世世上海市普陀区金事实是生生世世生生世世生生世世生生世世上海市普陀区金事实是生生世世生生世世生生世世生生世世上海市普陀区金事实是生生世世生生世世生生世世生生世世上海市普陀区金事实是生生世世生生世世生生世世生生世世上海市普陀区金事实是生生世世生生世世生生世世生生世世上海市普陀区金事实是生生世世生生世世生生世世生生世世上海市普陀区金事实是生生世世生生世世生生世世生生世世沙江路 1518 弄'
      };
      return {
        tableData: Array(5).fill(item)
      }
    },
    methods:{
        TellMeId(num){
            console.log(num)
        }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
