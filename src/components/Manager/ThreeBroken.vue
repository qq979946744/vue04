<template>
  <div>
    <el-table :data="tableData" style="width: 100%" stripe= "true">
        <el-table-column
        label="记录标识号"
        min-width="5%">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id}}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="夹具名字"
        min-width="10%">
        <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
            <p>夹具模组: {{ scope.row.Model}}</p>
            <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.CodeSeqId }}</el-tag>
            </div>
            </el-popover>
        </template>
        </el-table-column>
        <el-table-column label="报废问题"  min-width="25%">
            <template slot-scope="scope">
                <span>{{ scope.row.Problem }}</span>
            </template>
        </el-table-column>
        
        <el-table-column label="报废发起人"  min-width="10%">
            <template slot-scope="scope">
                <span>{{ scope.row.ReqMan }}</span>
            </template>
        </el-table-column>
        <el-table-column label="报废发起时间"  min-width="10%">
            <template slot-scope="scope">
                <span>{{ scope.row.ReqDate }}</span>
            </template>
        </el-table-column>
        <el-table-column label="报废申请状态"  min-width="10%">
            <template slot-scope="scope">
                <span>{{ scope.row.BrokenState}}</span>
            </template>
        </el-table-column>
        <el-table-column label="报废意见"  min-width="20%">
        <template slot-scope="scope">
            <el-input type="textarea" v-model="scope.row.Response"></el-input>
        </template>
        </el-table-column>
        
        <el-table-column label="操作"  min-width="10%" >
        <template slot-scope="scope">
            
            <p>
                <el-button
                size="mini"
                type="danger"
                @click="joinToBrokens(scope.row,scope.row.id,scope.row.Response)" >同意报废申请</el-button>
            </p>
            <p>
                <el-button
                size="mini"
                type="danger"
                @click="ignoreToBrokens(scope.row,scope.row.id,scope.row.Response)" >不同意报废申请</el-button>
            </p>
            <p>
                <el-button
                size="mini"
                type="danger"
                @click="ignoreToBrokens(scope.row,scope.row.id,scope.row.Response)" >不同意报废申请</el-button>
            </p>
        </template>
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
        uid:"1",
        workcell:"1",
        index:1,
        totalCount:"",
        totalPage:"",
        Man:"Senior"
      }
    },
    methods:{
         joinToBrokens(obj,id,response){
             var sure=confirm("确定报废此夹具吗")
             console.log(obj)
             console.log(this.tableData.indexOf(obj))
             console.log(id)
             if(sure==true){
                 Axios({
                    method:'get',
                    baseURL:'http://api.zjk-conson.com',
                    url:'/Update/ChangeBrokensAgreeII?'+"IDs="+id+"&"+"RecordMan="+this.Man+"&Response="+response
             }).then(res=>{
                    if(res.data.success==1){
                        this.tableData.splice(this.tableData.indexOf(obj),1)
                        alert("已经报废")
                    }
                })  
             }
         },
         ignoreToBrokens(obj,id,response){
             var sure=confirm("确定不报废此夹具吗")
             console.log(obj)
             console.log(this.tableData.indexOf(obj))
             console.log(id)
             if(sure==true){
                 Axios({
                    method:'get',
                    baseURL:'http://api.zjk-conson.com',
                    url:'/Update/ChangeBrokensDisAgree?'+"IDs="+id+"&"+"RecordMan="+this.Man+"&Response="+response
             }).then(res=>{
                    if(res.data.success==1){
                        this.tableData.splice(this.tableData.indexOf(obj),1)
                        alert("已经退回报废请求")
                    }
                })  
             }
         }
         

    },
    created(){
        // this.uid=this.$route.query.uid
        // this.workcell=this.$route.query.workcell
         Axios({
                method:'get',
                baseURL:'http://api.zjk-conson.com',
                url:'/query/queryRecordBK?'+"Workcell="+this.workcell+"&state=4&pageIndex=1"
            }).then(res=>{
                this.$data.totalCount=res.data.totalCount
                console.log(res.data.Content)
                this.tableData=res.data.Content
                console.log(this.inWorkcell)
            })
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
