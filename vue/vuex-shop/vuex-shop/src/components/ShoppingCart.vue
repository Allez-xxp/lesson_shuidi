<template>
    <div>
        <hr>
        <h3>你的购物车</h3>
        <!-- <div>{{this.$store.state.cart.items}}</div> -->
        <p v-show="!products.length"><i>给你的购物车添点东西吧！</i></p>
        <ul>
            <li 
            v-for="product in products" 
            :key="product.id">
            {{product.title}} - {{product.price}} x {{product.quantity}}
            </li>
        </ul>
        <p>总金额：{{total}}</p>
        <p>
        <button :disabled="!products.length" @click="checkout(products)">清空购物车</button>
        </p>
        <p v-show="checkoutStatus"> 清空{{ checkoutStatus }}</p>
    </div> 
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
    // 需要更详细的购物车商品信息
    created() {
        console.log(this.$store.state.cart, this.$store.state.products)
    },
    computed: {
        // 通过computed获取products
        ...mapState({
            checkoutStatus: state => state.cart.checkoutStatus
        }),
        ...mapGetters('cart',{
            products: 'cartProducts',
            total: 'cartTotalPrice'
        })
    },
    methods: {
        checkout(products) {
            console.log(products)
      //触发一个状态，派遣一个动作
            this.$store.dispatch('cart/checkout', products);
        }
    }
}
</script>