<template>
  <div id="First" >
   <el-form :label-position="top" label-width="40%" style="width:100%" :model="tableData">
       <el-form-item label="螺丝是否松动" prop="type">
            <el-radio-group v-model="tableData.ScrewLoosening">
            <el-radio-button label="1" name="ScrewLoosening">是</el-radio-button>
            <el-radio-button label="0" name="ScrewLoosening">否</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="部件是否损坏" prop="type">
            <el-radio-group v-model="tableData.PartDamage">
            <el-radio-button label="1" name="PartDamage">是</el-radio-button>
            <el-radio-button label="0" name="PartDamage">否</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否有钢套损坏掉落等不良" prop="type">
            <el-radio-group v-model="tableData.SteelDamage">
            <el-radio-button label="1" name="SteelDamage">是</el-radio-button>
            <el-radio-button label="0" name="SteelDamage">否</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否有机械部件松动" prop="type">
            <el-radio-group v-model="tableData.MecLoosening">
            <el-radio-button label="1" name="MecLoosening">是</el-radio-button>
            <el-radio-button label="0" name="MecLoosening">否</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="电路是否正常工作" prop="type">
            <el-radio-group v-model="tableData.Circuit">
            <el-radio-button label="1" name="Circuit">是</el-radio-button>
            <el-radio-button label="0" name="Circuit">否</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否有不正常响声" prop="type">
            <el-radio-group v-model="tableData.Sound">
            <el-radio-button label="1" name="Sound">是</el-radio-button>
            <el-radio-button label="0" name="Sound">否</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否牢固的固定在对应位置" prop="type">
            <el-radio-group v-model="tableData.Fixed">
            <el-radio-button label="1" name="Fixed">是</el-radio-button>
            <el-radio-button label="0" name="Fixed">否</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否进行清洁了" prop="type">
            <el-radio-group v-model="tableData.Clean">
            <el-radio-button label="1" name="Clean">是</el-radio-button>
            <el-radio-button label="0" name="Clean">否</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-row type="flex" align="center">
            <el-button type="danger" @click="done">检查完成</el-button>
        </el-row>
    </el-form>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
    data() {
      const item = {
        Fid:"",
        ScrewLoosening: 0,
        PartDamage:0,
        MecLoosening:0,
        Circuit:0,
        Sound:0,
        Clean:0,
        Fixed:0,
        SteelDamage:0,
      };
      return {
        tableData: item,
        uid:"1",
        workcell:7,
        curIndex:1,
        Fid:"",
        CodeSeqId:"",
        FormName:[],
        RecordMan:"demo",

      }
    },
    methods:{
        done(){
            Axios({
                method:'post',
                baseURL:'http://api.zjk-conson.com',
                url:'/Join/JoinPM',
                data:this.tableData
            }).then(res=>{
                console.log(res)
                if(res.data=="ok"){
                    alert('提交成功')
                    this.$router.go(-1)
                }else{
                    alert('提交失败')
                }
                
            })
        }
    },
    created(){
        this.Fid=this.$route.query.Fid
        this.tableData.Fid=this.$route.query.Fid
        this.CodeSeqId=this.$route.query.CodeSeqId
            Axios({
                method:'get',
                baseURL:'http://api.zjk-conson.com',
                url:'/Main/PMcontent'
            }).then(res=>{
                console.log(res)
                this.FormName=res.data
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
