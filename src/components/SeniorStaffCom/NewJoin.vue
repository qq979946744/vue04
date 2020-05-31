<template>
  <div>
      <div>
        <h1>新购夹具类型入库</h1>
        <el-upload drag
            :limit=limitNum
            :auto-upload="false"
            accept=".xlsx"
            :action="UploadUrl()"
            :before-upload="beforeUploadFile"
            :on-change="fileChange"
            :on-exceed="exceedFile"
            :on-success="handleSuccess"
            :on-error="handleError"
            :file-list="fileListIdentify">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xlsx文件，且不超过10M</div>
        </el-upload>
    <br/>
    <el-button size="small" type="primary" @click="uploadFileIdentify">立即上传</el-button>
    </div>
    
    <div>
        <h1>新购夹具实体入库</h1>
        <el-upload drag
            :limit=limitNum
            :auto-upload="false"
            accept=".xlsx"
            :action="UploadUrl()"
            :before-upload="beforeUploadFile"
            :on-change="fileChangeEntity"
            :on-exceed="exceedFile"
            :on-success="handleSuccess"
            :on-error="handleError"
            :file-list="fileListEntity">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xlsx文件，且不超过10M</div>
        </el-upload>
    <br/>
    <el-button size="small" type="primary" @click="uploadFileEntity">立即上传</el-button>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
  export default {
    data() {
      return {
        limitNum: 1,  // 上传excell时，同时允许上传的最大数
        fileListIdentify: [],   // 新夹具类型excel文件列表
        fileListEntity: []   // 新夹具实体excel文件列表
      }
    },
    methods:{
      // 文件超出个数限制时的钩子
      exceedFile(files, fileList) {
        this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`);
      },
      // 文件状态改变时的钩子
      fileChange(file, fileList) {
        console.log(file.raw);
        this.fileListIdentify.push(file.raw) ;
        console.log(this.fileListIdentify);
      },
      // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
      beforeUploadFile(file) {
        console.log('before upload');
        console.log(file);
        let extension = file.name.substring(file.name.lastIndexOf('.')+1);
        let size = file.size / 1024 / 1024;
        if(extension !== 'xlsx') {
          this.$message.warning('只能上传后缀是.xlsx的文件');
        }
        if(size > 10) {
          this.$message.warning('文件大小不得超过10M');
        }
      },
      
      // 文件上传成功时的钩子
      handleSuccess(res, file, fileList) {
        this.$message.success('文件上传成功');
        alert('上传成功')
      },
      // 文件上传失败时的钩子
      handleError(err, file, fileList) {
        this.$message.error('文件上传失败');
      },
      UploadUrl:function(){
       // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
        return ""
      },

      
      uploadFileIdentify() {
        if (this.fileListIdentify.length === 0){
          this.$message.warning('请上传文件');
        } else {
          let form = new FormData();
          form.append('excelupload', this.fileListIdentify[0]);
          Axios({
            method:"post",
             baseURL:'http://api.zjk-conson.com',
            url: "/ImportExcel/ExcelToIdentify",
            headers:{
              'Content-type': 'multipart/form-data'
            },
            data:form
          }).then(
            res=>{
                console.log('类型')
                console.log(res)
                alert('上传成功')
            },err =>{
            });
        }
      },

      // 文件状态改变时的钩子
      fileChangeEntity(file, fileList) {
        console.log(file.raw);
        this.fileListEntity.push(file.raw) ;
        console.log(this.fileListEntity);
      },
      uploadFileEntity() {
        if (this.fileListEntity.length === 0){
          this.$message.warning('请上传文件');
        } else {
          let form = new FormData();
          form.append('excelupload', this.fileListEntity[0]);
          Axios({
            method:"post",
             baseURL:'http://api.zjk-conson.com',
            url: "/ImportExcel/ExcelToIdentify",
            headers:{
              'Content-type': 'multipart/form-data'
            },
            data:form
          }).then(
            res=>{
                console.log('实体')
                console.log(res)
                alert('上传成功')
            },err =>{
            });
        }
      }

    },
    created(){
     if(this.$cookies.isKey('uid')){
        //设置cookie-用户名username 30分钟
        this.$cookies.set("username",this.userName,"30MIN");
        //设置cookie- uid
        this.$cookies.set("uid",this.formLabelAlign.uid,"30MIN");

     }else{
        alert("您未登入，或者登入过期；请重新登入")
         this.$router.push({
                 name:'Login',
            })
     }

    }
  }
</script>

<style scoped>

</style>
