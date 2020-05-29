<template>
  <div id="First">
   <el-table @selection-change="handleSelectionChange" class="elTable" :data="tableData" style="width: 100%" stripe= "true">
    <el-table-column
        type="selection"
      min-width="5%">
    </el-table-column>
    <el-table-column
      label="夹具编号"
      min-width="20%">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.CodeSeqId }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="负责人"  min-width="60%">
      <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.dutyPeople }}</el-tag>
      </template>
    </el-table-column>
    
    <el-table-column label="操作"  min-width="15%">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="to(scope.row.Fid,scope.row.CodeSeqId)">进行定检</el-button>
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
        tableData: Array(),
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
        removeArray(arr, val) {
            for(var i = 0; i < arr.length; i++) {
                if(arr[i] == val) {
                arr.splice(i, 1);
                break;
                }
            }
        },
        to(Fid,CodeSeqId){
            this.$router.push({
            name:'SeniorStaffPMTwo',
            query:{Fid:Fid,CodeSeqId:CodeSeqId}
          })
        },
        getWorkcell:function(pageIndex){
            alert(pageIndex)
            Axios({
                method:'get',
                baseURL:'http://api.zjk-conson.com',
                url:'/query/queryInstruction?'+"Workcell="+this.workcell+"&EntityState=0&pageIndex="+pageIndex
            }).then(res=>{
                res.data.Content.forEach(element => {
                    element.question=""
                });
                this.tableData=res.data.Content
            })
        },
    },
    created(){
        if(this.$cookies.isKey('uid')){
            this.uid=this.$route.query.uid
            this.workcell=this.$route.query.workcell
            this.RecordMan=this.$cookies.get('username')
             //设置cookie-用户名username 30分钟
            this.$cookies.set("username",this.$cookies.get("username"),"30MIN");
            //设置cookie- uid
            this.$cookies.set("uid",this.$cookies.get("uid"),"30MIN");
            //==============
            Axios({
                    method:'get',
                    baseURL:'http://api.zjk-conson.com',
                    url:'/query/getPMFixture?'+"workcell="+this.workcell
                }).then(res=>{
                    console.log(res)
                    this.tableData=res.data
                })
       }else{
           alert("您未登入，或者登入过期；请重新登入")
         this.$router.push({
                 name:'Login',
            })
       }
        
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
