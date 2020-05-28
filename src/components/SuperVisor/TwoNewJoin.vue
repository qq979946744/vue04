<template>
  <div id="First">
    <el-table @selection-change="handleSelectionChange"   class="elTable" :data="tableData" style="width: 100%" stripe= "true">
    <el-table-column
        type="selection"
      min-width="5%">
      
    </el-table-column>
    <el-table-column
      label="夹具编号"
      min-width="20%">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>状态: {{ scope.row.state}}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.BillNo }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="入库时间"  min-width="30%">
      <template slot-scope="scope">
          
          <span style="margin-left: 10px">{{ scope.row.RegDate }}</span>
      </template>
    </el-table-column>
    <el-table-column label="入库时间"  min-width="30%">
      <template slot-scope="scope">
          
          <span style="margin-left: 10px">{{ scope.row.Location }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作"  min-width="15%">
      <template slot-scope="scope">
        <p><el-button
          size="mini"
          type="danger"
          @click="join(scope.row,scope.row.ID)">同意入库</el-button></p>
          <p><el-button
          size="mini"
          type="danger"
          @click="disagree(scope.row,scope.row.ID)">不同意入库</el-button></p>
      </template>
    </el-table-column>
  </el-table>
  <el-row type="flex" class="row-bg" justify="center" style="margin:10px 0;">
        <el-button type="danger" @click="all">一起入库</el-button>
        <el-button type="danger" @click="allBroken">一起不入库</el-button>
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
        uid:"",
        workcell:7,
        index:1,
        totalCount:5,
        totalPage:1,
        curIndex:1,
        RecordMan:"demo"
      }
    },
    methods:{
         all(){
            console.log(this.multipleSelection.length==0)
            if(this.multipleSelection.length==0){
                alert('您还未选中需要报修的夹具')
            }else{
                this.multipleSelection.forEach(element => {
                    var indexElement=this.tableData.indexOf(element)

                    removeArray(this.tableData,element)
                    // Axios({
                    //     method:'get',
                    //     baseURL:'http://api.zjk-conson.com',
                    //     url:'/Update/AgreeFixturestateI?'+"IDs="+element.ID
                    //  }).then(res=>{
                        
                    //      console.log(this.tableData)
                    //     console.log('indexElement'+indexElement)
                    //     this.tableData.splice(indexElement,1)
                    //     console.log(this.tableData)

                    // })  
                    
                });
            }
            
        },
        removeArray(arr, val) {

            for(var i = 0; i < arr.length; i++) {

                if(arr[i] == val) {

                arr.splice(i, 1);

                break;

                }

            }

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
                        url:'/Update/DisagreeFixture?'+"IDs="+element.ID
                     }).then(res=>{
                        
                            console.log(this.tableData)
                            console.log('indexElement'+indexElement)
                            this.tableData.splice(indexElement,1)
                            console.log(this.tableData)
                        
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
         join(obj,id){
             var sure=confirm("确定入库吗")
             console.log(obj)
             console.log(this.tableData.indexOf(obj))
             if(sure==true){
                 Axios({
                    method:'get',
                    baseURL:'http://api.zjk-conson.com',
                    url:'/Update/AgreeFixturestateI?'+"IDs="+id
             }).then(res=>{
                    if(res.data.success==1){
                        this.tableData.splice(this.tableData.indexOf(obj),1)
                        alert("入库成功")
                    }
                })  
             }
           
         },
         disagree(obj,id){
             var sure=confirm("确定不同意入库吗")
             console.log(obj)
             console.log(this.tableData.indexOf(obj))
             if(sure==true){
                 Axios({
                    method:'get',
                    baseURL:'http://api.zjk-conson.com',
                    url:'/Update/DisagreeFixture?'+"IDs="+id
             }).then(res=>{
                    if(res.data.success==1){
                        this.tableData.splice(this.tableData.indexOf(obj),1)
                        alert("已不同意此夹具入库")
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
                url:'/query/queryInstruction?'+"Workcell="+this.workcell+"&EntityState=4&pageIndex=1"
            }).then(res=>{
                this.$data.totalCount=res.data.totalCount
                this.$data.totalPage=res.data.totalPage
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
