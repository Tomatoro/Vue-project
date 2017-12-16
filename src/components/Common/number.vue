<template>
  <div class="number">
    <div class="left" @click="sub">-</div><div class="middle">{{ count }}</div><div class="right" @click="add">+</div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        count: 1,
        type:''
      }
    },
    props:['stock','num','id'],
    created(){
      console.log(this.num)
      this.count = this.num?this.num:1
    },
    methods:{
      add(){
        if(this.count >= this.stock){
            return
        }
        this.count++
        this.type = 'add'
        this.notify()
      },
      sub(){
        if(this.count === 1){
          return
        }
        this.count--
        this.type = 'sub'
        this.notify()
      },
      //建立一个事件触发器
      //每当count发生变化的时候,就会触发此事件
      //$emit
      //第一个参数是自定义的监听事件名称 eg numberChange
      //第二个参数以后就是传递给订阅者的所有参数
      notify(){
        // this.$emit('numberChange',this.count)
        this.$emit('numberChange',{id:this.id,count:this.count,type:this.type})
      }
    }
  }
</script>

<style scoped>
  .number{
    display: inline-block;
  }
  .number .left,
  .number .middle,
  .number .right{
    display: inline-block;
    width: 25px;
    height: 25px;
    border: 1px solid #333;
    text-align: center;
  }
  .number .middle{
    width: 40px;
    border-left: 0;
    border-right: 0;
  }
</style>

