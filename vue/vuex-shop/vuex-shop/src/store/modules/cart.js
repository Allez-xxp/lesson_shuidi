// 四大家族
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
}
const actions = {
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
        
    }
}
const getters = {
    
}
export default {
    //模块中声明命名空间节点
    namespaced: true,
    state,
    mutations,
    actions,    
    getters
}