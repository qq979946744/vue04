<template>
  <div>
   <el-table :data="tableData" style="width: 100%" stripe= "true">
    <el-table-column
      label="id"
      min-width="5%">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.ID }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="夹具编号"
      min-width="20%">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>入库时间: {{ scope.row.RegDate}}</p>
          <p>存放位置: {{ scope.row.Location }}</p>
          <p>状态: {{ scope.row.state}}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.BillNo }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="报废问题"  min-width="60%">
      <template slot-scope="scope">
          <el-input type="textarea" v-model="scope.row.requestion"></el-input>
      </template>
    </el-table-column>
    
    <el-table-column label="操作"  min-width="15%">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="JoinBroken(scope.row,scope.row.ID, scope.row.requestion)">申请报废</el-button>
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
        workcell:"",
        index:1,
        totalCount:"",
        totalPage:"",
        RecordMan:"demo",

      }
    },
    methods:{
        getWorkcell:function(pageIndex){
            Axios({
                method:'get',
                baseURL:'http://api.zjk-conson.com',
                url:'/query/ queryInstruction?'+"Workcell="+this.workcell+"&EntityState=0&"+"pageIndex="+pageIndex
            }).then(res=>{
                this.$data.totalCount=res.data.totalCount
                
                console.log(res.data.Content)
                this.tableData=res.data.Content
                console.log(this.inWorkcell)
            })
        },
        change (e) {
         this.$forceUpdate()
        },
         JoinBroken(obj,id,requestion){
             var sure=confirm("确定报废吗")
             console.log(obj)
             console.log(this.tableData.indexOf(obj))
             if(sure==true){
                 Axios({
                    method:'get',
                    baseURL:'http://api.zjk-conson.com',
                    url:'/Join/JoinBroken?'+"IDs="+id+"&Problem="+requestion+"&"+"RecordMan="+this.RecordMan
             }).then(res=>{
                    if(res.data.success==1){
                        this.tableData.splice(this.tableData.indexOf(obj),1)
                        alert("申请报废成功")
                    }
                })  
             }
         }


    },
    created(){
        this.uid=this.$route.query.uid
        this.workcell=this.$route.query.workcell
         Axios({
                method:'get',
                baseURL:'http://api.zjk-conson.com',
                url:'/query/queryInstruction?'+"Workcell="+this.workcell+"&EntityState=0&pageIndex=1"
            }).then(res=>{
                this.$data.totalCount=res.data.totalCount
                console.log(res.data.Content)
                this.tableData=res.data.Content
                this.tableData.forEach(element => {
                    element.question=""
                });
                console.log(this.inWorkcell)
            })
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
