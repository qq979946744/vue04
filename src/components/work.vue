<template>
  <div class="box">
        <div id="one">
            <button type="button"  class="dropbtn">1号机器</button>
            <div class="box1"><span>123</span></div>
        </div>
        <div id="two">
            <button type="button"  class="dropbtn">2号机器</button>
            <div class="box1"><span>123</span></div>
        </div>
        <div id="three">
            <button type="button"  class="dropbtn">3号机器</button>
            <div class="box1"><span>123</span></div>
        </div>
        <div id="four">
            <button type="button"  class="dropbtn">4号机器</button>
            <div class="box1"><span>123</span></div>
        </div>
        <div id="five">
            <button type="button"  class="dropbtn">5号机器</button>
            <div class="box1"><span>123</span></div>
        </div>
        <div id="six">
            <button type="button"  class="dropbtn">6号机器</button>
            <div class="box1"><span>123</span></div>
        </div>
        <div id="seven">
            <button type="button"  class="dropbtn">7号机器</button>
            <div class="box1"><span>123</span></div>
        </div>
        <div id="eight">
            <button type="button"  class="dropbtn">8号机器</button>
            <div class="box1"><span>123</span></div>
        </div>
        <div id="nine">
            <button type="button"  class="dropbtn">9号机器</button>
            <div class="box1"><span>123</span></div>
        </div>
        <div id="ten">
            <button type="button"  class="dropbtn">10号机器</button>
            <div class="box1"><span>123</span></div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
export default {
    name:'v-work',
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
        workcell:7,
        index:1,
        totalCount:5,
        totalPage:5,
        curIndex:1,
        RecordMan:"demo",

      }
    },
    methods:{
        
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
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
    margin: 0;
    padding: 0;
}    
    
    .box{
        background: url("../assets/line.jpg");
        width: 1000px;
        height: 381px;
        margin: 0 auto;
        position: relative;
    }
        #one{
            position: absolute;
            left: 500px;
            top: 38px;
        }
        #two{
            position: absolute;
            top: 58px;
            left: 750px;
        }
        #three{
            position: absolute;
            top: 65px;
            left: 880px;
        }
        #four{
            position: absolute;
            top: 95px;
            left: 945px;
        }
        #five{
            position: absolute;
            top: 290px;
            left: 940px;
        }
        #six{
            position: absolute;
            top: 350px;
            left: 700px;
        }
        #seven{
            position: absolute;
            top: 350px;
            left: 440px;
        }
        #eight{
            position: absolute;
            top: 350px;
            left: 240px;
        }
        #nine{
            position: absolute;
            top: 325px;
            left: 50px;
        }
        #ten{
            position: absolute;
            top: 200px;
            left: 90px;
        }
            .box1{
                display: none;
                float: right;
                width: 100px;
                height: 100px;
                background-color: pink;
            }
</style>
