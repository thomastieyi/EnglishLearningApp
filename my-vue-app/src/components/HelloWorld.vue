
<template>
   
    <Row style="background:#eee;padding:20px">
        <i-col span="11">
            <Card :bordered="false">
                <p slot="title">{{word_0}}</p>
                <p >{{anounce_0}}</p>
                <p>{{en_tans_0}}</p>
                <p>{{tans_0}}</p>
            </Card>
        </i-col>
        <i-col span="11" offset="2">
            <Card shadow>
               <p slot="title">{{word_1}}</p>
                <p >{{anounce_1}}</p>
                <p>{{en_tans_1}}</p>
                <p>{{tans_1}}</p>
            </Card>
        </i-col>
    </Row>
    
</template>
<script>
    export default {
        name: 'helloworld',
      props:{
          
          word_0:{type:String},
          anounce_0:{type:String},
          tans_0:{type:String},
          en_tans_0:{type:String},
              word_1:{type:String},
          anounce_1:{type:String},
          tans_1:{type:String},
          en_tans_1:{type:String}
      },
       data:function(){
         return{
             word_0:"hello",
          anounce_0:"	英[hə'ləʊ] 美[həˈloʊ]",
          tans_0:"打招呼; 哈喽，喂; 你好，您好; 表示问候",
          en_tans_0:"打招呼; 哈喽，喂; 你好，您好; 表示问候",
        word_1:"hello",
          anounce_1:"	英[hə'ləʊ] 美[həˈloʊ]",
          tans_1:"打招呼; 哈喽，喂; 你好，您好; 表示问候",
          en_tans_1:"打招呼; 哈喽，喂; 你好，您好; 表示问候",
         }
       }
      
    }
</script>