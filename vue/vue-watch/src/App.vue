<template>
  <div id="app">
    <p>{{ message }}</p>
    <!-- 把所有字母变成大写 filter中toUpperCase()方法 -->
    <p>大写：{{ message | capitalize }}</p>
    <!-- 把所有字母输出反过来 computed -->
    <p>逆序：{{reverseMessage }}</p>
    <div id="watch-example">
      <p>
        Ask a yes/no question:
        <input v-model="question" @input="askQuestion"/>
      </p>
      <p>{{ answer }}</p>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios';  //vue的请求库
import lodash from 'lodash';  //vue最常用的工具库（数组操作排序，深拷贝，浅拷贝）
export default {
  name: 'App',
  computed: {
    reverseMessage() {
      return this.message.split('').reverse().join('')
    }
  },
  filters: {
    capitalize(word) {
      return word.toUpperCase()
    }
  },
 
  methods: {
    
    askQuestion() {
      console.log(this.askQuestion);
      // 发送请求
      axios
        .get('https://yesno.wtf/api')
        .then(response => {
          // console.log(response,'+++++++')
          this.answer = response.data.answer;
        })
    },
    debouncedGetAnswer() {
      console.log('aaa');
    }, 
    getAnswer() {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      axios
        .get('https://yesno.wtf/api')
        .then(response => {
          this.answer = _.capitalize(response.data.answer) 
        })
        .catch(error => {
          this.answer = 'Error! Could not reach the API. ' + error
        })
    },
  
    // debouncedGetAnswer() {
    //   _.debounce(this.askQuestion.bind(this))
    // }
  }, 
   created: function() {
    // console.log(_.debounce);
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  // 订阅发布者模式
  watch: {
    question: function(newQuestion,oldQuestion) {
      // console.log(newQuestion,oldQuestion)
      // 为用户的输入提供反馈
      this.answer = 'Wait for you to stop typing...'
      // this.askQuestion();  //网络请求,不能直接请求（耗费流量，内存）
      this.debouncedGetAnswer();
    }
  },
  data() {
    return {
      message: 'hello',
      question: '',
      answer: 'I cannot give you an answer urtil you ask a question ! '
    }
  },
  components: {
     HelloWorld
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
