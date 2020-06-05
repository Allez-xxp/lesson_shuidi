const { mysql } = require('../../mysql');

// 接口的定义
// 获取收货地址列表
async function getListAction(ctx) {
    const openId = ctx.query.openId
    const addressList = await mysql('nideshop_address').where({
        'user_id': openId
    }).orderBy('is_default', 'desc').select()
    // 取地址的时候要注意,数据库中有一个默认地址字段，为是默认地址
    ctx.body = {
        data: addressList
    }
}

// 获取详细地址
async function detailAction(ctx) {
    const id = ctx.query.id
    const detailData = await mysql('nideshop_address').where({
        'id': id
    }).select()
    // console.log(detailData);
    // 往前端输出
    ctx.body = {
        data: detailData[0]  //这里拿到的是个数组但是一个id只对应一个数据，所以加上一个[0]
    }
}
//保存地址 添加或更新收货地址
async function saveAction(ctx) {
    const addressId = ctx.request.body.addressId; //前端传过来的
    const { userName, telNumber, address, detailaddress, checked, openId } = ctx.request.body;
    // 如果是默认选中，先在数据库中查询是否是默认地址，因为默认地址只能有一条，
    if(checked) {
        const isDefault = await mysql('nideshop_address').where({
            'user_id': openId, //是否是我们正在操作保存按钮的那个用户的id
            'is_default': 1 //找到当前是数据库中默认地址为1的那条数据
        }).select()
        if(isDefault.length > 0) {
            // 能找到,就说明这张表中已经存在了一条默认地址了，
            await mysql('nideshop_address').where({
                'user_id': openId, //是否是我们正在操作保存按钮的那个用户的id
                'is_default': 1 //找到当前是数据库中默认地址为1的那条数据
            }).update({
                'is_default': 0
            })
            // 我们传过来的checked为true的话就是我们希望将当前保存的这条数据保存为默认，所以先把原来数据库中是默认数据的数据更新为不是默认数据
        }
    }
    // 如果当前不是通过编辑按钮来到保存页面的，那就不会传id,就是新建地址，一键导入微信地址也是添加地址
    if(!addressId) {
        //添加地址
        const data = await mysql('nideshop_address').insert({
            name: userName, //name可以打引号可以不打
            mobile: telNumber,
            address: address,
            address_detail: detailaddress,
            user_id: openId,
            is_default: checked === 'true'? 1 : 0
        })
        if(data) {
            ctx.body = {
                data: true
            }
        } else {
            ctx.body = {
                data: false
            }
        }
    } else {
        // 点击编辑进来的话，是更新地址
        const data = await mysql('nideshop_address').where({
            'id': addressId  //有addressId 跟新这个地址
          }).update({
            name: userName,
            mobile: telNumber,
            address: address,
            address_detail: detailaddress,
            user_id: openId,
            is_default: checked == 'true' || checked ? 1 : 0
          })
          if (data) {
            ctx.body = {
              data: true
            }
          } else {
            ctx.body = {
              data: false
            }
          }        
    }
    // 勾选了checked，但是保存到数据库的时候is_Default是false 去前端看一下
}

//抛出这个方法，route那里才能拿得到
module.exports = {
    getListAction,
    detailAction,
    saveAction
}