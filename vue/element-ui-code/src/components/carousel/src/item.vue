<template>
    <div>
        <!-- CarouselItem -->
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'CarouselItem',
    //告诉父组件，这是子组件
    // 尽快的 mounted挂载
    created(){
        // console.log(this.$parent)  //??怎么知道是谁的子？$开头的都是Vue的一些超级变量
        // 可以代替if(this.$parent){}
        // 调用父组件上的updateItem,这里没有使用emit
        this.$parent && this.$parent.updateItems()
    }
}
</script>