
<template>
   
    <Row style="background:#eee;padding:20px">
        <i-col span="11">
            <Card :bordered="false">
                <p slot="title">first :ame1}}</p>
                <p >{{test_1}}+555</p>
                <p>卡片内容</p>
                <p>卡片内容</p>
            </Card>
        </i-col>
        <i-col span="11" offset="2">
            <Card shadow>
                <p slot="title">second:name2}}</p>
                <p>卡片内容</p>
                <p>卡片内容</p>
                <p>卡片内容</p>
            </Card>
        </i-col>
    </Row>
    
    
</template>
<script>
    export default {
        name: 'helloworld',
      
       
       data:function(){return     {test_1: 'as34dasd',
                 f:"asd"
        
        
        }
       }
    }
</script>