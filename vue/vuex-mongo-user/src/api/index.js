const _users = [ 
  {
    "address": {
      "city": "Los Angeles",
      "state": 'California',
      "pincode": "123"
    },
    "tags": [
      "music",
      "blogs",
      "cricket"
    ],
    "name": "Tom Benzamin"
  },
  {
    "address": {
      "city": "赣州",
      "state": '江西',
      "pincode": "331000"
    },
    "tags": [
      "coding",
      "blogs"
    ],
    "name": "明天"
  },
  {
    "address": {
      "city": "九江",
      "state": '江西',
      "pincode": "331000"
    },
    "tags": [
      "coding",
      "swim"
    ],
    "name": "襄阳"
  },
    {
    "address": {
      "city": "赣州",
      "state": '江西',
      "pincode": "331000"
    },
    "tags": [
      "coding",
      "games"
    ],
    "name": "颜如玉"
  }
]
//真数据已经有了，就不需要假数据了
export default {
    fetchUsers(cb) {
        setTimeout(()=>{
            cb(_users)
        },1000)
    }
}