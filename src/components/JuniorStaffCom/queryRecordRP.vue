<template>
  <div id="First">
    <el-table @selection-change="handleSelectionChange" class="elTable" :data="tableData" style="width: 100%" stripe= "true">
        <el-table-column
        type="selection"
        min-width="5%">
        
        </el-table-column>
        <el-table-column
        label="夹具名字"
        min-width="10%">
        <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
            <p>夹具模组: {{ scope.row.Model}}</p>
            <p>状态: {{ scope.row.repairState}}</p>
            <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.CodeSeqId }}</el-tag>
            </div>
            </el-popover>
        </template>
        </el-table-column>
        <el-table-column label="报修问题"  min-width="25%">
            <template slot-scope="scope">
                <span>{{ scope.row.Problem }}</span>
            </template>
        </el-table-column>
        
        <el-table-column label="维修发起人"  min-width="10%">
            <template slot-scope="scope">
                <span>{{ scope.row.RepMan }}</span>
            </template>
        </el-table-column>
        <el-table-column label="维修发起时间"  min-width="10%">
            <template slot-scope="scope">
                <span>{{ scope.row.ReqDate }}</span>
            </template>
        </el-table-column>
        <el-table-column label="维修状态"  min-width="10%">
        <template slot-scope="scope">
            <span >{{scope.row.repairState}}</span>
        </template>
        </el-table-column>
        <el-table-column label="维修处理时间"  min-width="10%">
        <template slot-scope="scope">
            <span >{{scope.row.RepDate}}</span>
        </template>
        </el-table-column>
        
        <el-table-column label="操作"  min-width="10%" >
        <template slot-scope="scope">
            
            <p><el-button
            size="mini"
            type="danger"
            @click="changeRepair(scope.row,scope.row.id)" v-if="scope.row.repairState=='申请中'">同意维修</el-button></p>
            <p>
                <el-button
                size="mini"
                type="danger"
                @click="changeRepairToBrokens(scope.row,scope.row.id)" v-if="scope.row.repairState=='申请中'">直接报废</el-button>
            </p>
        </template>
        </el-table-column>
    </el-table>
     <el-row type="flex" class="row-bg" justify="center" style="margin:10px 0;">
        <el-button type="danger" @click="all">一起同意维修</el-button>
        <el-button type="danger" @click="allBroken">一起报废</el-button>
    </el-row>
     <el-row type="flex" class="row-bg" justify="center" >
        <el-button  type="primary" plain :disabled="index==1?true:false" @click="getPre">上一页</el-button>
        <el-button :type="curIndex=index?'success':'primary'" plain v-for="zindex in totalPage" :key="zindex" @click="getWorkcell(zindex)">{{zindex}}</el-button>
        <el-button type="primary" plain :disabled="index==totalPage?true:false" @click="getNext">下一页</el-button>
    </el-row>
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
        Man:"Senior"
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
        all(){
            console.log(this.multipleSelection.length==0)
            if(this.multipleSelection.length==0){
                alert('您还未选中需要报修的夹具')
            }else{
                this.multipleSelection.forEach(element => {
                    var indexElement=this.tableData.indexOf(element)
                    Axios({
                        method:'get',
                        baseURL:'http://api.zjk-conson.com',
                        url:'/Update/ChangeRepairs?'+"IDs="+element.id+"&"+"RecordMan="+this.Man
                     }).then(res=>{
                        this.removeArray(this.tableData,element)
                    })  
                    
                });
            }
            
        },
        allBroken(){
            console.log(this.multipleSelection.length==0)
            if(this.multipleSelection.length==0){
                alert('您还未选中需要报修的夹具')
            }else{
                this.multipleSelection.forEach(element => {
                    console.log(this.tableData.indexOf(element))
                    const indexElement=this.tableData.indexOf(element)
                    Axios({
                        method:'get',
                        baseURL:'http://api.zjk-conson.com',
                        url:'/Update/ChangeRepairsToBrokens?'+"IDs="+element.id+"&"+"RecordMan="+this.Man
                     }).then(res=>{
                        
                         this.removeArray(this.tableData,element)
                            
                        
                    })  
                });
            }
            alert('提交成功')
            
        },
        handleSelectionChange(val) {
         this.multipleSelection = val;
        },
         getWorkcell:function(pageIndex){
            alert(pageIndex)
            Axios({
                method:'get',
                baseURL:'http://api.zjk-conson.com',
                url:'/query/queryRecordRP?'+"Workcell="+this.workcell+"&state=1&pageIndex="+pageIndex
            }).then(res=>{
                res.data.Content.forEach(element => {
                    element.question=" "
                });
                this.tableData=res.data.Content
            })
        },
        getNext(){
            index++
            curIndex++
            getWorkcell(index)
            
        },
        getPre(){
            index--
            curIndex--
            getWorkcell(index)
        }, 
         changeRepair(obj,id){
             var sure=confirm("确定维修吗")
             console.log(obj)
             console.log(this.tableData.indexOf(obj))
             console.log(id)
             if(sure==true){
                 Axios({
                    method:'get',
                    baseURL:'http://api.zjk-conson.com',
                    url:'/Update/ChangeRepairs?'+"IDs="+id+"&"+"RecordMan="+this.Man
             }).then(res=>{
                    if(res.data.success==1){
                        this.tableData.splice(this.tableData.indexOf(obj),1)
                        alert("成功同意维修")
                    }
                })  
             }
         },
         changeRepairToBrokens(obj,id){
             var sure=confirm("确定申请报废吗")
             console.log(obj)
             console.log(this.tableData.indexOf(obj))
             if(sure==true){
                 Axios({
                    method:'get',
                    baseURL:'http://api.zjk-conson.com',
                    url:'/Update/ChangeRepairsToBrokens?'+"IDs="+id+"&"+"RecordMan="+this.Man
             }).then(res=>{
                    if(res.data.success==1){
                        this.tableData.splice(this.tableData.indexOf(obj),1)
                        alert("已成功申请报废")
                    }
                })  
             }
         }

    },
    created(){
        this.uid=this.$route.query.uid
        this.workcell=this.$route.query.uid
         Axios({
                method:'get',
                baseURL:'http://api.zjk-conson.com',
                url:'/query/queryRecordRP?'+"Workcell="+this.workcell+"&state=1&pageIndex=1"
            }).then(res=>{
                this.$data.totalCount=res.data.totalCount
                this.$data.totalPage=res.data.totalPage
                console.log(res.data)
                res.data.Content.forEach(element => {
                    element.question=" "
                });
                this.tableData=res.data.Content
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
