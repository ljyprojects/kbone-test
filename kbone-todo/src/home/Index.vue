<template>
  <div class="home">
    <KToast
    type="loading"
    v-model="loadingToast"
    >加载中提示</KToast>
    <h1>To-Do-List</h1>
    <div class="todo-header">
      <input type="text" v-model="todoMsg" placeholder="接下来想要做点什么呢？">
      <div @click="submit" class="btn">确定</div>
    </div>
    <div class="todos">
      <div class="todo-list">
        <!--eslint-disable-next-line max-len -->
        <div class="todo-item" v-for="(item, index) in todoArr" :key="index">
          <div class="checkbox">
            <!-- <KCheckbox value="" :checked="item.finished"></KCheckbox> -->
            <input type="checkbox" v-model="item.finished" disabled>
            </div>
         <!-- eslint-disable-next-line max-len -->
          <div class="todo-item-content" @click="changeStatus(index,$event)" :data-id="item._id"  :class="{del:item.finished}">{{item.Msg}}</div>
          <div class="icon"><img src="../asset/imgs/del.png" alt=""></div>
        </div>
      </div>
    </div>
    <div class="jump" @click="toDemo">跳转</div>
  </div>
</template>

<script>
import Vue from 'vue'
import tcb from 'tcb-js-sdk'
import 'reduce-loader!./web'
import { KCheckbox, KToast } from 'kbone-ui'


export default Vue.extend({
  name: 'Home',
  data() {
    return {
      loadingToast: false,
      todoMsg: '',
      todoArr: [],
      checked: false,
      isWeb: true
    }
  },
  components: {

  },
  created() {
    window.addEventListener('wxload', query => console.log('page1 wxload', query))
    window.addEventListener('wxshow', () => console.log('page1 wxshow'))
    window.addEventListener('wxready', () => console.log('page1 wxready'))
    window.addEventListener('wxhide', () => console.log('page1 wxhide'))
    window.addEventListener('wxunload', () => console.log('page1 wxunload'))
    if (process.env.isMiniprogram) {
      this.$data.isWeb = false
    }
    this.loadData()
  },
  methods: {
    toDemo() {
      if (process.env.isMiniprogram) {
        console.log('isMiniprogram')
        wx.navigateTo({
          url: '/pages/demo/index'
        })
      } else {
        this.$router.push('/demo')
      }
    },
    submit() {
      if (this.$data.todoMsg) {
        if (process.env.isMiniprogram) {
          wx.showLoading({
            title: '加载中'
          })
          wx.cloud.callFunction({
            name: 'set_todos',
            data: {
              type: 'add',
              Msg: this.$data.todoMsg,
              finished: false
            }
          }).then((res) => {
            console.log('添加成功==》', res)
            this.loadData()
          })
        } else {
          this.$data.loadingToast = true
          tcb.callFunction({
            name: 'set_todos',
            data: {
              type: 'add',
              Msg: this.$data.todoMsg,
              finished: false
            }
          }).then((res) => {
            console.log('添加成功==>', res)
            this.loadData()
          })
        }
        this.$data.todoMsg = ''
      }
    },
    changeStatus(index, e) {
      const that = this
      console.log('e==>', e.target.dataset.id)
      console.log(index)
      this.$data.todoArr[index].finished = !this.$data.todoArr[index].finished
      const finished = this.$data.todoArr[index].finished
      if (process.env.isMiniprogram) {
        wx.cloud.callFunction({
          name: 'set_todos',
          data: {
            type: 'changeStatus',
            id: e.target.dataset.id,
            finished
          }
        }).then((res) => {
          console.log('改变状态==>', res)
          that.loadData()
        })
      } else {
        tcb.callFunction({
          name: 'set_todos',
          data: {
            type: 'changeStatus',
            id: e.target.dataset.id,
            finished
          }
        }).then((res) => {
          console.log('改变状态==》', res)
          that.loadData()
        })
      }
    },
    loadData() {
      if (process.env.isMiniprogram) {
        console.log('I am in miniprogram')
        wx.cloud.init({
          env: 'cqj-04kwq'
        })
        wx.cloud.callFunction({
          name: 'set_todos',
          data: {
            type: 'get'
          }
        }).then((res) => {
          console.log('todos==>', res.result.data)
          const finishedArr = []
          const unfinishedArr = []
          res.result.data.forEach((elem) => {
            if (elem.finished) {
              finishedArr.push(elem)
            } else {
              unfinishedArr.push(elem)
            }
          })
          this.$data.todoArr = [...unfinishedArr, ...finishedArr]
          console.log('this.$data.todoArr==>', this.$data.todoArr)
          wx.hideLoading({
            complete: () => {},
          })
        })
        this.$data.todoMsg = ''
      } else {
        console.log('I am in Web')
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
              name: 'set_todos',
              data: {
                type: 'get'
              }
            }).then((res) => {
              console.log('todos==>', res.result.data)
              const finishedArr = []
              const unfinishedArr = []
              res.result.data.forEach((elem) => {
                if (elem.finished) {
                  finishedArr.push(elem)
                } else {
                  unfinishedArr.push(elem)
                }
              })
              this.$data.todoArr = [...unfinishedArr, ...finishedArr]
              console.log('this.$data.todoArr==>', this.$data.todoArr)
              this.$data.loadingToast = false
            })
            this.$data.todoMsg = ''
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }

  },
  comments: {
    KCheckbox,
    KToast
  }
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
        font-size: 14px;
        color: #6b6b6b;
        display: flex;
        .checkbox{
          display: flex;
          .weui-cell{
            padding: 0;
          }
          input{
            flex: 1;
            height: 100%;
          }
        }
        .todo-item-content{
          flex: 1;
          align-items: center;
          &.del{
            text-decoration: line-through;
          }
        }
        .icon {

          img{
            display: block;
            width: 6vw;
            height: 6vw;
          }
        }
      }
    }
  }
  .jump{
    width: 12vw;
    height: 12vw;
    border: 1px solid #ddd;
    font-size: 14px;
    text-align: center;
    line-height: 12vw;
    background: #fff;
    box-shadow: 0 0 3px #ddd;
    position: fixed;
    bottom: 10px;
    right: 10px;
    border-radius: 50%;
  }
}
</style>
