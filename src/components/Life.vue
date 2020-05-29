<template>
  <div id="First">
   <el-table @selection-change="handleSelectionChange" class="elTable" :data="tableData" style="width: 100%" stripe= "true">
    <el-table-column
        label="夹具编号"
        prop="Code"
      min-width="10%">
      
    </el-table-column>
    <el-table-column
      label="平均使用次数"
      min-width="10%">
      <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.AveC }}次</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="平均使用天数"  min-width="10%">
      <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.AveL }}天</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="LastTenC" label="此夹具编号-前10个夹具的使用次数"  min-width="20%">
      
    </el-table-column>
    <el-table-column prop="LastTenL" label="此夹具编号-前10个夹具的使用寿命"  min-width="20%">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
    data() {
      const item = {
        ID: '1',
        BillNo: '王小虎',
        question:""
      };
      return {
        tableData: Array(10).fill(item),
        multipleSelection: [],
        uid:"1",
        workcell:7,
        index:1,
        totalCount:5,
        totalPage:5,
        curIndex:1,
        RecordMan:"demo",

      }
    },
    methods:{
       
    },
    created(){
        this.uid=this.$route.query.uid
        
         Axios({
                method:'get',
                baseURL:'http://api.zjk-conson.com',
                url:'/query/getAveCodeData'
            }).then(res=>{
                this.tableData=res.data
            })
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#First{
    height: 100%;
}

.elTable{
    min-height: 90%;
}
</style>
