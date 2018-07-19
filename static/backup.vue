<template>
  <div id="app">
    
  <div v-show="ifLogin">
  <helloworld
          :word_0="word_0"
          :anounce_0="anounce_0"
          :tans_0="tans_0"
          :en_tans_0="en_tans_0"
         :word_1="word_1"
          :anounce_1="anounce_1"
          :tans_1="tans_1"
          :en_tans_1="en_tans_1"
  
  ></helloworld>
   <helloworld
          :word_0="word_2"
          :anounce_0="anounce_2"
          :tans_0="tans_2"
          :en_tans_0="en_tans_2"
         :word_1="word_3"
          :anounce_1="anounce_3"
          :tans_1="tans_3"
          :en_tans_1="en_tans_3"
  
  ></helloworld>
  <Slider v-model="i" show-input></Slider> 
 <Button type="success" long @click="change">换一批</Button></div>
 
  <div v-show="!ifLogin" id="login">
       <input id="sodo" v-model="uesr"  placeholder="请输入用户名">
       <Button type="success" long @click="login">登陆</Button>
       

  </div>
     
  </div>
</template>


<script>
let utf=0;
export default {
  name: 'App',
  methods:{
  change:function(){
      //this.ifLogin=false;
      //console.log(data);
      this.word_1=data[(this.i+1)%4][0];
      this.anounce_1=data[(this.i+1)%4][1];
      this.tans_1=data[(this.i+1)%4][2];
      this.en_tans_1=data[(this.i+1)%4][2];
      
     this.word_0=data[(this.i+2)%4][0];
      this.anounce_0=data[(this.i+2)%4][1];
      this.tans_0=data[(this.i+2)%4][2];
      this.en_tans_0=data[(this.i+2)%4][2];
      
       this.word_2=data[(this.i+3)%4][0];
      this.anounce_2=data[(this.i+3)%4][1];
      this.tans_2=data[(this.i+3)%4][2];
      this.en_tans_2=data[(this.i+3)%4][2];
      
     this.word_3=data[(this.i+4)%4][0];
      this.anounce_3=data[(this.i+4)%4][1];
      this.tans_3=data[(this.i+4)%4][2];
      this.en_tans_3=data[(this.i+4)%4][2];
      this.i=this.i+1;
  },
  login:function () {
      this.ifLogin=true;
      
       //alert("上次学习到第 "+this.i+"页！");
      //this.val=this.user
              $(function(){
                  let user=$("#sodo").val()
                  $.ajax({
                 url: "http://localhost:8081/search?name="+user,
                 dataType: "jsonp",
                 type:"Post",
                 jsonpCallback: 'callback',
                success: function (data) {
					//var ret = jQuery.parseJSON(data);
					//$('#lblResponse').html(ret.position[0]+','+ret.position[1]);
					console.log('Success: ')
					//buf[0]=ret.position[0];
					//buf[1]=ret.position[1];
                    //alet1(data);
                    console.log(JSON.stringify(data));
                    
                    
                    this.i=data[1]
                    
                    
                    
                         }
                       
                     }); utf=3;
              })

           
           console.log(utf)

     
  } 
  },
  data:function(){
      
      return{
          
           i:0,
           ifLogin:false,
           user:"",
           word_0:data[0][0],
           anounce_0:data[0][1],
           tans_0:data[0][2],
           en_tans_0:data[0][2],
           word_1:data[1][0],
           anounce_1:data[1][1],
           tans_1:data[1][2],
           en_tans_1:data[1][2],

            word_2:data[2][0],
           anounce_2:data[2][1],
           tans_2:data[2][2],
           en_tans_2:data[2][2],
           word_3:data[3][0],
           anounce_3:data[3][1],
           tans_3:data[3][2],
           en_tans_3:data[3][2]
      }
  }
}
let data=[
    ["a","ei, 2","art.一(个)；每一(个)"],
    ["abandon","2'b9nd2n","vt.丢弃；放弃，抛弃"],
    ["ability","2'biliti","n.能力；能耐，本领"],
    ["able","'eibl","a.有能力的；出色的"],
    ["a","ei, 2","art.一(个)；每一(个)"],
    ["abandon","2'b9nd2n","vt.丢弃；放弃，抛弃"],
    ["ability","2'biliti","n.能力；能耐，本领"],
    ["able","'eibl","a.有能力的；出色的"]
    
    
    ]
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
 .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    #login {
        margin-top: 40%;
    }
</style>
