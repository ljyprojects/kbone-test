<template>
  <div class="home">
    <div class="header">
      <div class="header-title">
        <div class="text">
          <span class="icon">
            <i class="el-icon-s-grid"></i>
          </span>
          <span>课程列表</span>
        </div>
      </div>
      <div class="add-btn">
        <router-link to="/add">添加课程</router-link>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item, index) in circles" :key="index">
        <div class="border">
          <div class="img">
            <img :src="item.images[0]" alt />
          </div>
          <div class="content">
            <div class="title">{{item.title}}</div>
            <div class="description">{{item.views}}个人参与</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import tcb from "tcb-js-sdk";

const app = tcb.init({
  env: "smjkfw-we8ry"
});

export default {
  name: "Home",
  data() {
    return {
      circles: []
    };
  },
  created() {
    app
      .auth({
        persistence: "session"
      })
      .signInAnonymously()
      .then(() => {
        // 登录成功
        console.log("成功");
        app
          .callFunction({
            name: "get_allCircles"
          })
          .then(res => {
            console.log("获取==》", res.result.data);
            res.result.data.forEach(elem => {
              app
                .getTempFileURL({
                  fileList: elem.images
                })
                .then(res => {
                  console.log("res==>", res);
                  res.fileList.forEach(el => {
                    if (el.code === "SUCCESS") {
                      console.log("获取连接==》", el.tempFileURL);
                      elem.images = [el.tempFileURL];
                    } else {
                      //获取下载链接失败
                    }
                  });
                });
            });
            this.$data.circles = res.result.data;
            console.log("this.data.circle==>", this.$data.circles);
          });
      })
      .catch(err => {
        // 登录失败
        console.log("失败", err);
      });
  },
  components: {}
};
</script>
<style lang="less" scoped>
.home {
  .header {
    padding: 10px 20px;
    display: flex;
    box-shadow: 0 3px 3px #ddd;
    .header-title {
      .text {
        cursor: pointer;
        display: inline;
      }
      flex: 1;
    }
    .add-btn {
      color: #007acc;
      cursor: pointer;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    margin: 0 auto;
    .item {
      width: 20%;
      box-sizing: border-box;
      padding: 10px;
      .border {
        padding: 10px;
        box-shadow: 0 0 8px #ddd;
        border-radius: 3px;

        .img {
          img {
            width: 100%;
            display: block;
          }
        }
        .content {
          padding: 10px 4px;

          .title {
            color: #333;
            word-wrap: break-word;
            white-space: pre-wrap;
            word-break: break-all;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            word-wrap: break-word;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .description {
            color: #999;
            font-size: 12px;
            line-height: 24px;
          }
        }
      }
    }
  }
}
</style>
