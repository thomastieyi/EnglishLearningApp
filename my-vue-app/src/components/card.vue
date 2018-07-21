<template>
    <Card style="width:320px">
        <div style="text-align:center">
            <img :src="src">
            <h3>{{content}}</h3>
        </div>
    </Card>
</template>
<script>
    export default {
        name:'card',
        props:{
            content:{type:String},
            src:{type:String}
        },
        data:function(){
       
        }
        
    }
</script>