<template>
  <div id="First">
      <div class="work">
          <t-work></t-work>
      </div>
      <div class="find">
          <h3>通过夹具编号查询定位(可以模糊查询)</h3>
        <el-row type="flex" class="row-bg" justify="center" style="margin:10px 0;">
            <el-input v-model="input" placeholder="请输入需要查询夹具编号"></el-input>
            <el-button type="danger" @click="find">查询</el-button>
        </el-row>
        <el-row>
            <el-table @selection-change="handleSelectionChange" class="elTable" :data="tableData" style="width: 100%" stripe= "true">
            
            <el-table-column
            label="夹具所对应机器"
            min-width="100%">
                <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row }}</el-tag>
                </template>
            </el-table-column>
            </el-table>
        </el-row>
        <div class="findId">
          <h3>选着查询的机器:</h3>
        <el-row type="flex" class="row-bg" justify="center" style="margin:10px 0;">
            <el-select v-model="machineId" @change="machineChanged" clearable placeholder="请选择">
                <el-option
                    v-for="item in machine"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-row>
        </div>
        <el-row>
            
            <p v-if="machineId==''?false:true" >第{{machineId}}台机器旁的夹具有：</p>
                <el-row type="flex" justify="center" style="margin-top:10px" v-for="str in tableDataTwo" :key="str">
                        <el-tag size="medium">{{str}}</el-tag>
                </el-row>
            
        </el-row>
      </div>
  </div>
</template>

<script>
import Axios from 'axios'
import Work from '../components/work'
export default {
    data() {
        
      return {
        machine:[
            {
                label:"第1号机器",
                value:'1'
            },
            {
                label:"第2号机器",
                value:'2'
            },
            {
                label:"第3号机器",
                value:'3'
            },
            {
                label:"第4号机器",
                value:'4'
            },
            {
                label:"第5号机器",
                value:'5'
            },
            {
                label:"第6号机器",
                value:'6'
            },
            {
                label:"第7号机器",
                value:'7'
            },
            {
                label:"第8号机器",
                value:'8'
            },
            {
                label:"第9号机器",
                value:'9'
            },
            {
                label:"第10号机器",
                value:'10'
            }
        ],
        tableDataTwo:"",
        tableData:"",
        machineId:"",
        multipleSelection: [],
        uid:"1",
        workcell:7,
        input:"",
        curIndex:1,
        RecordMan:"demo",

      }
    },
    methods:{
        find(){
            Axios({
                method:'get',
                baseURL:'http://api.zjk-conson.com',
                url:'/Location/FindFixture?Code='+this.input
            }).then(res=>{
                this.tableData=res.data
                alert('查询成功')
            })
        },
        machineChanged(val){
            console.log(val)
            Axios({
                method:'get',
                baseURL:'http://api.zjk-conson.com',
                url:'/Location/FixtureInReader?id='+val
            }).then(res=>{
                this.tableDataTwo=res.data
                console.log(this.tableDataTwo)
                alert('查询成功')
            })
        }

    },
    created(){
        // this.uid=this.$route.query.uid
        // this.workcell=this.$route.query.workcell
        //  Axios({
        //         method:'get',
        //         baseURL:'http://api.zjk-conson.com',
        //         url:'/query/queryInstruction?'+"Workcell="+this.workcell+"&EntityState=0&pageIndex=1"
        //     }).then(res=>{
        //         this.$data.totalCount=res.data.totalCount
        //         this.$data.totalPage=res.data.totalPage

        //         res.data.Content.forEach(element => {
        //             element.question=""
        //         });
        //         this.tableData=res.data.Content
        //     })
    },
    components:{
        't-work':Work
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
