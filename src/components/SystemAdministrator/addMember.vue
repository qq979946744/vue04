<template>
  <div class="addMember">
    <el-form ref="ruleForm" :rules="rules" class="demo-ruleForm"  :model="ruleForm" label-width="auto" >


      <el-form-item label="名字" style="width:370px" prop="UserName">
        <el-input v-model="ruleForm.UserName" placeholder="请输入名字" ></el-input>
      </el-form-item>

      <el-form-item label="职位" prop="RoleID">
        <el-select v-model="ruleForm.RoleID" placeholder="请选择职位"  style="width:320px">
          <el-option label="游客" value="游客"></el-option>
          <el-option label="初级用户" value="初级用户"></el-option>
          <el-option label="高级用户" value="高级用户"></el-option>
          <el-option label="监管员" value="监管员"></el-option>
          <el-option label="经理" value="经理"></el-option>
          <el-option label="系统管理员" value="系统管理员"></el-option>
        </el-select>
      </el-form-item>

       <el-form-item label="编号" style="width:370px" prop="UserID">
        <el-input v-model="ruleForm.UserID" placeholder="请输入7位字符" ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" :plain="true">添加成员</el-button>
        <el-button @click="reset">清空</el-button>
      </el-form-item>
</el-form>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  created(){
      if(this.$cookies.isKey('uid')){
            this.ruleForm.Workcell=this.$route.query.workcell

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
 data() {
      return {
        ruleForm: {
          UserName: '',
          Workcell: '',
          RoleID: '',
          UserID: ''
        },

          rules:{
            UserName:[
               { required: true, message: '请输入名字', trigger: 'blur' }
            ],
            Workcell:[
              { required: true, message: '请选择所属部门', trigger: 'blur' }
            ],
             RoleID:[
              { required: true, message: '请选择职位', trigger: 'blur' }
            ],
            UserID:[
                { required: true, message: '请输入编号', trigger: 'blur' },
                { min: 7, max: 7, message: '编号为7位数', trigger: 'change' }
            ]
          }
        
      }
    },
    methods: {
      onSubmit() {
        let {UserName,Workcell,RoleID,UserID}=this.ruleForm;
        if(UserName!=""&&RoleID!=""&&UserID!=""&&UserID.length===7){
            let w;
            let ret=[];
            ret=this.transform(RoleID,Workcell);
            w=ret[1];
            RoleID=ret[0];
            console.log(ret,Workcell)
            console.log(UserName,Workcell,RoleID,UserID)
            let params=`UserName=${UserName}&Workcell=${Workcell}&RoleID=${RoleID}&UserID=${UserID}`;
            axios.get(`http://api.zjk-conson.com/Join/JoinUser?${params}`)
              .then(res=>{
                console.log(res.data)
                  if(res.data.includes('成功')){
                     this.$message({
                        message: `${UserName}加入${w}成功`,
                           type: 'success'
                     });
                  }else if(res.data.includes('存在')){
                     this.$message({
                        message: `${UserName}已加入${w}`,
                           type: 'warning'
                     });
                  }
                  this.ruleForm.UserName=this.ruleForm.UserID=this.ruleForm.RoleID=''
              })
        }else{
          this.$message({
          message: '请完整填写信息',
          type: 'warning'
        });
        }
      },
      transform(RoleID,Workcell){
        let ret=[];
        switch(RoleID){
          case "游客":ret.push(1);break;
          case "初级用户":ret.push(2);break;
          case "高级用户":ret.push(3);break;
          case "监管员":ret.push(4);break;
          case "经理":ret.push(5);break;
          case "系统管理员":ret.push(6);break;
        }

        switch(Workcell){
          case '1':ret.push("华为");break;
          case '2':ret.push("小米");break;
          case '3':ret.push("爱立信");break;
          case '4':ret.push("松下");break;
          case '5':ret.push("索尼");break;
        }
        return ret;
      },
      reset(){
          this.ruleForm.UserName=this.ruleForm.UserID=this.ruleForm.RoleID=''
      }
    }
}
</script>

<style>

</style>