<template>
    <div>
      <img class="logo" src="../../static/logo.png" alt="">
      <img class="bg" src="../../static/bg.jpg" alt="">
      
      <div class="sebox" style="padding-top: 2rem;">
        <img style="width: 5rem;margin: 0 auto 0.3rem;" src="../../static/font2.png" alt="">
        <p class="se_tishi">(每人每日可投十票)</p>

        <div class="se_listbox">
          <div class="se_list" v-for="item in list">
            <div class="imgbox se_imgbox">
              <img :src="item.url" alt="">
            </div>
            <p>作者：{{item.name}}</p>
            <p>票数：{{item.voteCount}}</p>
            <div @click="vote(item.id)" class="se_btn">投票</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "sec",
        data () {
          return {
            list: []
          }
        },
        beforeMount() {
          this.getList()
        },
        methods: {
          getList () {
            this.$http.post('vote/pictures').then(res => {
              this.list = res.data.result.list
            })
          },
          vote (id) {
            this.$http.post('vote/pictures', {
              id: id
            }).then(res => {
              this.getList()
            })
          }
        }
    }
</script>

<style scoped>
.sebox{
  position: relative;
  z-index: 100;
}
  .se_tishi {
    text-align: center;
    font-size: 0.28rem;
    margin-bottom: 0.4rem;
  }
  .se_listbox{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 0.2rem;
  }
  .se_list{
    width: calc(33.33% - 0.2rem);
    margin-bottom: 0.2rem;
    margin-right: 0.2rem;
    background: rgba(255,255,255,0.64);
    box-shadow: 0.05rem 0.05rem 0.24rem rgba(0,0,0,0.3);
    text-align: center;
    font-size: 0.28rem;
    line-height: 0.5rem;
    color: #460a0d;
  }
  .se_imgbox{
    height: 2.2rem;
    background: #fff;
  }
  .se_btn{
      color: #fff;
    background: #460a0d;
  }
</style>
