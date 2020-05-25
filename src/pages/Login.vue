<template>
  <div class="login">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="ligonForm()">立即登陆</el-button>
        <el-button >重置</el-button>
      </el-form-item>
    </el-form>
  </div>    
</template>

<script>
import Axios from 'axios'
export default {
  name: "Login",
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        username: "",
        password: "",
        uid:'1',
        workcell:'',
        roleid:''
        
      }
    };
  },
  methods: {
      ligonForm: function() {
         Axios({
            method:'get',
            baseURL:'http://api.zjk-conson.com',
            url:'/Login/ProcessLogin?username='+this.formLabelAlign.username+'&password='+this.formLabelAlign.password
        }).then(res=>{
            console.log(res.data)
            if(res.data=='ok'){
                this.$router.push({
                 name:'Index',
               query:{
                   alert:"页面跳转成功",
                   uid:"1"
               }
            })
            }else{
                alert("账号密码错误")
            }
        })     

        
      }
  },
  created(){

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
