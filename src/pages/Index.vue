<template>
  <div>
    <div class="SuperAdministrator">
    <el-container id="container" style=" border: 1px solid #eee">

      <el-container>
        <el-header style="background-color: #b3c0d1; text-align: right; font-size: 12px">
          <div class="cen">
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span >{{userName}}</span>
          </div>
        </el-header>

        <el-main>
         <el-row type="flex" class="row-bg" justify="left">
            <p >所属的部门：</p>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6" v-for="Workcell in inWorkcell" :key="Workcell.Workcell">
              <el-button @click="say(Workcell.Workcell,Workcell.Role)">{{Workcell.WorkcellName}}</el-button>
            </el-col>
           
          </el-row>
          <el-row type="flex" class="row-bg" justify="left">
            <p >全部的部门：</p>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6" v-for="Workcell in allWorkcell" :key="Workcell.Workcell">
              <el-button >{{Workcell.workcellName}}</el-button>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="left">
            <p >夹具的定位/寿命检测：</p>
          </el-row>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6" >
              <el-button @click="postion">夹具的定位</el-button>
            </el-col>
            <el-col :span="6" >
            <el-button @click="life">夹具的寿命检测</el-button>
            </el-col>
            <el-col :span="6" >
            <el-button @click="test">获取参数</el-button>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
    <transition name="slide-fade">
    </transition>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: "Index",
  data() {
    return {
      userName:"admin",
      labelPosition: "right",
      formLabelAlign: {
        uid:'1',
      },
      inWorkcell:[],
      allWorkcell:[]
    }
  },
  methods:{
    test(){
        console.log(this.$route)
        alert(this.$route.params)
    },
    say:function(Workcell,role){
      console.log(Workcell+""+role)
      console.log(this.formLabelAlign.uid)
      switch(role){
        case 2:
          this.$router.push({
          name:'JuniorStaff',
          query:{role:role,uid:this.formLabelAlign.uid,workcell:Workcell}
          
          })
          break

        case 3:
          this.$router.push({
            name:'SeniorStaff',
            query:{role:role,uid:this.formLabelAlign.uid,workcell:Workcell}
          })
          break
        case 4:
          this.$router.push({
          name:'SuperVisor',
          query:{role:role,uid:this.formLabelAlign.uid,workcell:Workcell}
          })
          break
        case 5:
          this.$router.push({
          name:'Manager',
          query:{role:role,uid:this.formLabelAlign.uid,workcell:Workcell}
          })
          break
        case 6:
          this.$router.push({
          name:'SystemAdministrator',
          query:{role:role,uid:this.formLabelAlign.uid,workcell:Workcell}
          })
          break
      }
    },
    postion(){
        this.$router.push({
          name:'Postion',
          query:{uid:this.formLabelAlign.uid}
          })
    },
    life(){
        this.$router.push({
          name:'Life',
          query:{uid:this.formLabelAlign.uid}
          })
    }
      
  },
  created(){
     if(this.$cookies.isKey('uid')){
         this.formLabelAlign.uid=this.$cookies.get('uid')
         this.userName=this.$cookies.get('username')
        //设置cookie-用户名username 30分钟
        this.$cookies.set("username",this.userName,"30MIN");
        //设置cookie- uid
        this.$cookies.set("uid",this.formLabelAlign.uid,"30MIN");
        

        //==============
        Axios({
            method:'get',
            baseURL:'http://api.zjk-conson.com',
            url:'/Workcell/getWorkcellbyID?'+"uid="+this.formLabelAlign.uid
        }).then(res=>{
            this.$data.inWorkcell=res.data
            console.log(this.inWorkcell)
        })
        Axios({
            method:'get',
            baseURL:'http://api.zjk-conson.com',
            url:'/Workcell/getAllWorkcell'
        }).then(res=>{
            this.$data.allWorkcell=res.data
            console.log(this.allWorkcell)        
        })

     }else{
         alert("请重新登入")
         this.$router.push({
                 name:'Login',
            })
     }

  }
  
}
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
#container {
  height: 100vh;
}
.cen {
  height: 60px;
  line-height: 60px;
}

/* === */
 .el-row {
    margin-bottom: 20px;
    
  }
  .el-row:last-child {
      margin-bottom: 0;
    }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
    width: 100%;
  }
</style>
