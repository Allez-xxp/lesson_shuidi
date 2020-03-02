<template>
    <div>
        <h1>View
        </h1>
    </div>
</template>
<script>
export default {
    created () {  //生命周期函数，当组件被加载时触发函数
        // console.log('创建成功');
        let province = this.$route.path;
        console.log(province);
    }
}
</script>
<style lang="stylus">

</style>