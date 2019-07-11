<template>
    <div v-show='show'>
      <img class="logo" src="../assets/logo.png" alt="">
      <img class="bg" src="../assets/bg.jpg" alt="">

      <div @click="tishi = false" v-if="tishi" class="zzbox">
        <div @click.stop>
          <p style="margin-bottom: 0.2rem;">提示</p>
          <p style="margin-bottom: 0.2rem;">{{txmassage}}</p>
          <p style="text-align: right;">
            <span @click="tishi = false">确认</span>
          </p>
        </div>
      </div>

      <div class="sebox" style="padding-top: 2rem;">
        <img style="width: 5rem;margin: 0 auto 0.3rem;" src="../assets/font2.png" alt="">
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
            list: [],
            count : 0,
            show : false,
            txmassage: '',
            tishi: false
          }
        },
        mounted () {
          var _this = this
          let imgs = document.querySelectorAll('img')
          Array.from(imgs).forEach((item)=>{
            let img = new Image()
            img.onload = ()=>{
              this.count++
            }
            img.src=item.getAttribute('src')
          })
        },
        watch : {
          count (val,oldval) {
            if(val == 3){
              this.show = true
              document.getElementById('base').style.display = 'none'
            }
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
            this.$emit('setload', true)
            this.$http.post('vote/submit?id=' + id).then(res => {
              this.$emit('setload', false)
              if (res.data.code == 200) {
                this.getList()
                this.txmassage = '投票成功'
                this.tishi = true
              } else {
                this.txmassage = res.data.msg
                this.tishi = true
              }
            }).catch(err => {
              this.$emit('setload', false)
            })
          }
        }
    }
</script>

<style scoped>
  .zzbox{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .zzbox > div{
    padding: 0.2rem;
    background: #fff;
    width: 5rem;
    border-radius: 0.1rem;
    position: relative;
    overflow: hidden;
  }
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
  .se_btn {
    color: #fff;
    background: #460a0d;
  }
</style>
