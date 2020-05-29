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
                @click="joinToBrokens(scope.row,scope.row.id,scope.row.Response)" >报废申请</el-button>
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
    <el-row type="flex" class="row-bg" justify="center" style="margin:10px 0;">
        <el-button type="danger" @click="all">一起报废</el-button>
        <el-button type="danger" @click="all">一起不同意报废</el-button>
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
        workcell:"1",
        index:1,
        totalCount:5,
        totalPage:1,
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
                    console.log(this.tableData.indexOf(element))
                    const indexElement=this.tableData.indexOf(element)
                    Axios({
                        method:'get',
                        baseURL:'http://api.zjk-conson.com',
                        url:'/Update/ChangeBrokensAgreeI?'+"IDs="+element.id+"&"+"RecordMan="+this.Man+"&Response="+element.Response
                     }).then(res=>{
                        this.removeArray(this.tableData,element)

                        
                    })  
                });
            }
            alert('提交成功')
            
        },
         noAll(){
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
                        url:'/Update/ChangeBrokensDisAgree?'+"IDs="+element.id+"&"+"RecordMan="+this.Man+"&Response="+element.Response
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
            Axios({
                method:'get',
                baseURL:'http://api.zjk-conson.com',
                url:'/query/queryInstruction?'+"Workcell="+this.workcell+"&EntityState=4&pageIndex="+pageIndex
            }).then(res=>{
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
         joinToBrokens(obj,id,response){
             var sure=confirm("确定报废吗")
             console.log(obj)
             console.log(this.tableData.indexOf(obj))
             console.log(id)
             if(sure==true){
                 Axios({
                    method:'get',
                    baseURL:'http://api.zjk-conson.com',
                    url:'/Update/ChangeBrokensAgreeI?'+"IDs="+id+"&"+"RecordMan="+this.Man+"&Response="+response
             }).then(res=>{
                    if(res.data.success==1){
                        this.tableData.splice(this.tableData.indexOf(obj),1)
                        alert("成功同意报废")
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
        if(this.$cookies.isKey('uid')){
            this.uid=this.$route.query.uid
            this.workcell=this.$route.query.workcell
            this.Man=this.$cookies.get('username')
             //设置cookie-用户名username 30分钟
            this.$cookies.set("username",this.$cookies.get("username"),"30MIN");
            //设置cookie- uid
            this.$cookies.set("uid",this.$cookies.get("uid"),"30MIN");
            //==============
             Axios({
                method:'get',
                baseURL:'http://api.zjk-conson.com',
                url:'/query/queryRecordBK?'+"Workcell="+this.workcell+"&state=1&pageIndex=1"
            }).then(res=>{
                this.$data.totalCount=res.data.totalCount
                this.$data.totalPage=res.data.totalPage

                this.tableData=res.data.Content
            })
       }else{
           alert("您未登入，或者登入过期；请重新登入")
         this.$router.push({
                 name:'Login',
            })
       }
        // this.uid=this.$route.query.uid
        // this.workcell=this.$route.query.workcell
        
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
