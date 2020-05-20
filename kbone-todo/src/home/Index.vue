<template>
  <div class="home">
    <h1>To-Do-List</h1>
    <div class="todo-header">
      <input type="text" v-model="todoMsg" placeholder="接下来想要做点什么呢？">
      <div @click="submit" class="btn">确定</div>
    </div>
    <div class="todos">
      <ul class="todo-list">
        <!-- eslint-disable-next-line max-len -->
        <li @click="clickHandle(index)" class="todo-item" v-for="(item, index) in todoArr" :key="index">
          <input type="checkbox" v-model="item.finished">
          <div class="todo-item-content" :class="{del:item.finished}">{{item.Msg}}</div>
          <div class="del">X</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import tcb from 'tcb-js-sdk'
import 'reduce-loader!./web'


export default Vue.extend({
  name: 'Home',
  data() {
    return {
      todoMsg: '',
      todoArr: [],
      checked: false
    }
  },
  components: {

  },
  created() {
    // const that = this
    window.addEventListener('wxload', (query) => {
      console.log('page1 wxload', query)
      // wx.getStorage({
      //   key: 'todoData',
      //   success(res) {
      //     console.log(res.data)
      //     that.$data.todoArr = JSON.parse(res.data)
      //   }
      // })
      wx.cloud.callFunction({
        name: 'login'
      }).then((res) => {
        console.log('小程序login==>', res)
      })
    })
    window.addEventListener('wxshow', () => console.log('page1 wxshow'))
    window.addEventListener('wxready', () => console.log('page1 wxready'))
    window.addEventListener('wxhide', () => console.log('page1 wxhide'))
    window.addEventListener('wxunload', () => console.log('page1 wxunload'))

    if (process.env.isMiniprogram) {
      console.log('I am in miniprogram')
    } else {
      console.log('I am in Web')
      const data = JSON.parse(localStorage.getItem('todoData'))
      this.$data.todoArr = data
      const app = tcb.init({
        env: 'cqj-04kwq'
      })
      app
        .auth({
          persistence: 'session'
        }).anonymousAuthProvider().signIn().then(() => {
          // 登录成功
          console.log('登陆成功')
          app.callFunction({
            name: 'login'
          }).then((res) => {
            console.log('web-login==>', res)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  methods: {
    submit() {
      if (process.env.isMiniprogram) {
        console.log('I am in miniprogram')
      } else {
        console.log('I am in Web')
        console.log(this.$data.todoMsg)
      }
      if (this.$data.todoMsg) {
        this.$data.todoArr.push({ Msg: this.$data.todoMsg, finished: false })
        this.$data.todoMsg = ''
        if (process.env.isMiniprogram) {
          wx.setStorage({
            key: 'todoData',
            data: JSON.stringify(this.$data.todoArr)
          })
          console.log('wx.setStorage')
        } else {
          localStorage.setItem('todoData', JSON.stringify(this.$data.todoArr))
        }
      }
    },
    clickHandle(index) {
      console.log(index)
      const arr = this.$data.todoArr
      arr[index].finished = !arr[index].finished
      console.log(arr)
      this.$data.todoArr = arr
      if (process.env.isMiniprogram) {
        wx.setStorage({
          key: 'todoData',
          data: JSON.stringify(this.$data.todoArr)
        })
        console.log('wx.setStorage')
      } else {
        localStorage.setItem('todoData', JSON.stringify(this.$data.todoArr))
      }
    }

  },
})
</script>

<style lang="less">
.home{
  padding: 10px;
  h1{
    font-size: 24px;
    color:#ec7a55;
    text-align: center;
  }
  .todo-header{
    display: flex;
    padding: 4px 0;
    input{
      flex: 1;
      padding: 10px;
      outline: none;
      border: 1px solid #ddd;
    }
   .btn{
      background-color: #ddd;
      outline: none;
      font-size: 20px;
      line-height: 39px;
      padding: 0 20px;
    }
  }
  .todos{
    .todo-list{
      .todo-item{
        border-bottom: 1px solid #ddd;
        padding: 6px 0;
        margin: 0 10px;
        font-size: 14px;
        color: #6b6b6b;
        display: flex;
        justify-items: center;
        justify-content: center;
        .todo-item-content{
          flex: 1;
          &.del{
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>
