<template>
   <div class="modifyInfo">    
      <el-select v-model="value" placeholder="请选择" @input="getUser">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

   <el-table
    :data="getUser()"
    style="width: 100%">
  

    <el-table-column type="index" width="70" label="#"> </el-table-column>
    <el-table-column
      label="职工编号"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.userId }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column
      label="职位"
      width="180">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">
            <span style="margin-left: 10px">{{ scope.row.role }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope" >
     
        <el-button
          size="mini"
          type="danger"
           @click="edit(scope.$index)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
  <el-form >
    <el-form-item label="修改后职位:" :label-width="formLabelWidth">
      <el-select v-model="form.position" placeholder="请选择职位">
          <el-option label="游客" value="游客"></el-option>
        <el-option label="初级用户" value="初级用户"></el-option>
        <el-option label="高级用户" value="高级用户"></el-option>
          <el-option label="监管员" value="监管员"></el-option>
            <el-option label="经理" value="经理"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="ok">确 定</el-button>
  </div>
</el-dialog>


 <el-pagination
  v-show="isShow"
  :current-page="pageIndex"
  :page-size="pageSize"
  :total="totalCount"
  @current-change="goPage"
  layout="total,prev, pager, next,jumper">
</el-pagination>


   </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return{
      workcellName:[],
      value:'',
      user:[],
      flag:"",
      isShow:true,
      pageSize:10,
      pageIndex:1,
      totalCount:0,
      dialogFormVisible:false,
      form:{
        position:''
      },
       formLabelWidth: '120px',
        options: [{
          value: '游客',
          label: '游客'
        }, {
          value: '初级用户',
          label: '初级用户'
        }, {
          value: '高级用户',
          label: '高级用户'
        }, {
          value: '监管员',
          label: '监管员'
        }, {
          value: '经理',
          label: '经理'
        },{
          value: '系统管理员',
          label: '系统管理员'
        }],
        value: ''
    }
  },
   created(){
    if(this.$cookies.isKey('uid')){
            this.getData();
             //设置cookie-用户名username 30分钟
            this.$cookies.set("username",this.$cookies.get("username"),"30MIN");
            //设置cookie- uid
            this.$cookies.set("uid",this.$cookies.get("uid"),"30MIN");
            //==============
       }else{
           alert("您未登入，或者登入过期；请重新登入")
         this.$router.push({
                 name:'Login',
            })
       }
  },
  methods:{

    getData(){
      let baseURL='http://api.zjk-conson.com/Main/getAllUserFromWorkcell';
      
      let Workcell=this.$route.query.workcell
      axios.get(`${baseURL}?Workcell=${Workcell}&pageIndex=${this.pageIndex}`)
      .then(res=>{

       
        this.user=res.data.Content.filter((cv,i)=>cv.role!=6)
              
        this.totalCount=Number(this.user.length);
         this.user.forEach((val,index)=>{
        switch(val.role){
          case 1:val.role="游客" ; break;
          case 2: val.role="初级用户";break;
           case 3: val.role="高级用户";break;
            case 4: val.role="监管员";break;
             case 5: val.role="经理";break;
        }
      })
      })
      

     
    },
    edit(index){
      this.dialogFormVisible=true;
      this.flag=index;
    },
    ok(){
      this.dialogFormVisible = false;
      this.user.find((currentval,index,arr)=>{
        if(index===this.flag){
         currentval.role=this.form.position;
        }
      })
      console.log(this.user)
    },
    goPage(currentPage){
     
        this.pageIndex=currentPage
    },
     getUser(){
       let t=this.user.filter((v,i)=>v.role==this.value)
        let s=this.user.filter((v,i)=>v.role==this.value).slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize);
        this.totalCount=Number(t.length);
        return s;
    }
  }
}
</script>

<style>

</style>