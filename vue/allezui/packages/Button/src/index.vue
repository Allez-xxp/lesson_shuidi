<template>
    <!--动态类名绑定 :class="['x-button--' +  type]" 
        根据按钮class生成一个动态样式,--表示某个状态
    -->
    <div 
    :class="['x-button--' +  type]" 
    class="x-button">
        <!-- 类名动态生成;slot,button中的文字的占位符 -->
        <slot></slot> 
    </div>
</template>
<script>
export default {
    name: 'x-button',
    props: {
        type: String,
        default: 'default'
    }
}
</script>

<style scoped>
.x-button {
    display: inline-block;
    padding: 3px 6px;
    background: #000;
    color: #fff;
}
</style>