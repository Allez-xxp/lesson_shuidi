// 四大家族
import shop from '../../api/shop'
const state = {
    items: [],
    checkoutStatus: null
}
const mutations = {
    pushProductToCart(state, { id }){
        state.items.push({  //添加购买信息
            id,
            quantity:1
        })
    },
    incrementItemQuantity(state, { id }) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.quantity++   //因为是一个对象，所以是一个引用式赋值，这里改变了，数组中的数据也会改
    },
    setCheckoutStatus(state, status) {
        state.checkoutStatus = status
    },
    setCartItems(state, { items }) {
        state.items = items
    }
}
const actions = {
    // 商品添加购物车操作 
    addProductToCart({commit},product) {
        // console.log(product);
        if(product.inventory > 0 ) {
            const cartItem = state.items.find(item =>item.id === product.id)
            if(!cartItem){
                commit('pushProductToCart',{id: product.id})
            } else {
                commit('incrementItemQuantity', cartItem)
            }
            // 向products模块提交一个mutation: decreateQuentity，要从cart模块-》products模块
            // {root: true}回到根节点上
            commit('products/decrementProductInventory',{id: product.id},{root: true})
        }
        
    },
    checkout({commit}, products) {
        // console.log(products);
        const savedCartItems = [...state.items];
        console.log(savedCartItems);
        commit('setCheckoutStatus', null);
        commit('setCartItems', {items: []}); //clean cart
        //调用api,将订单存一下
        shop.buyProducts(
            products, //真正下单
            // success的时候做什么
            () => commit('setCheckoutStatus', '成功'),
            () => {
                commit('setCheckoutStatus', '失败'),
                // 失败了就再来一次，之前清空了cart不过记录了cart,利用上它
                commit('setCartItems', {items: savedCartItems})
            }
        )
    }
}
const getters = { //可以将state重新计算的
    //四大家族的getters,可以获得其他的getters函数,
    cartProducts (state, getters,rootState){ //其他的getters
        //因为要从这里穿梭到products模块去取它的state.all,所以需要根节点rootState
        // [{id:1, quantity:1}] --> [{id:1,title:'ipad' price}]
        return state.items.map(({id, quantity}) => {
            const product = rootState.products.all.find(
                product => product.id === id)
            return {
                title: product.title,
                price: product.price,
                quantity
            }
        })
    },
    cartTotalPrice (state, getters) { //要去cartProducts拿数据，要用到getters参数
        //state.all里有id,quantity；但是没有价钱price。总金额需要计算 quantity*price
        // price在cartProducts里，用到getters参数去cartProducts拿数据price
        // reduce()就是将数组一项项消灭？消灭之前留下结果 之前的total 当前商品product
        //???
        return getters.cartProducts.reduce((total, product) =>{
            return total + product.price * product.quantity
        }, 0) //total开始是为0的
    }
}
export default {
    //模块中声明命名空间节点
    namespaced: true,
    state,
    mutations,
    actions,    
    getters
}