<template>
  <div class="login">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="ligonForm()">立即登陆</el-button>
        <el-button @click="show">重置</el-button>
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
      getCookie(cookie_name) {
        var allcookies = document.cookie;
		//索引长度，开始索引的位置
        var cookie_pos = allcookies.indexOf(cookie_name);

        // 如果找到了索引，就代表cookie存在,否则不存在
        if (cookie_pos != -1) {
            // 把cookie_pos放在值的开始，只要给值加1即可
            //计算取cookie值得开始索引，加的1为“=”
            cookie_pos = cookie_pos + cookie_name.length + 1; 
            //计算取cookie值得结束索引
            var cookie_end = allcookies.indexOf(";", cookie_pos);
            
            if (cookie_end == -1) {
                cookie_end = allcookies.length;

            }
            //得到想要的cookie的值
            var value = unescape(allcookies.substring(cookie_pos, cookie_end)); 
        }
        return value;
        },
      show(){
          
          this.$cookies.set('role',6)

      },
      ligonForm: function() {
         Axios({
            method:'get',
            baseURL:'http://api.zjk-conson.com',
            url:'/Login/ProcessLogin?username='+this.formLabelAlign.username+'&password='+this.formLabelAlign.password
        }).then(res=>{
            if(res.data.split(",")[0]=='ok'){
                //设置cookie-用户名username 30分钟
                this.$cookies.set("username",res.data.split(",")[1],"30MIN");
                //设置cookie- uid
                this.$cookies.set("uid",res.data.split(",")[2],"30MIN");
                this.$router.push({
                 name:'Index',
                params:{
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
      if(this.$cookies.isKey('uid')){
        //设置cookie-用户名username 30分钟
        this.$cookies.set("username",this.$cookies.get("username"),"30MIN");
        //设置cookie- uid
        this.$cookies.set("uid",this.$cookies.get("uid"),"30MIN");
          this.$router.push({
                 name:'Index',
                params:{
                    alert:"页面跳转成功",
                    uid:"1"
                }
            })
      }
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
