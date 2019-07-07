<template>
    <div>
      <img class="logo" src="../../static/logo.png" alt="">
      <img class="bg" src="../../static/bg.jpg" alt="">

      <div class="sebox" style="padding-top: 2rem;">
        <img style="width: 5rem;margin: 0 auto 1.5rem;" src="../../static/font3.png" alt="">

        <div>
          <img class="t_title" src="../../static/t_font1.png" alt="">

          <div class="t_listbox">
            <div v-for="item in 2" class="t_list1">
              <div class="imgbox">
                <img src="" alt="">
              </div>
              <p>作者：</p>
            </div>
          </div>
        </div>

        <div>
          <img class="t_title" src="../../static/t_font2.png" alt="">

          <div class="t_listbox">
            <div v-for="item in 3" class="t_list2">
              <div class="imgbox">
                <img src="" alt="">
              </div>
              <p>作者：</p>
            </div>
          </div>
        </div>

        <div>
          <img class="t_title" src="../../static/t_font3.png" alt="">

          <div class="t_listbox">
            <div v-for="item in 5" class="t_list2">
              <div class="imgbox">
                <img src="" alt="">
              </div>
              <p>作者：</p>
            </div>
          </div>
        </div>

        <div>
          <img class="t_title" src="../../static/t_font4.png" alt="">

          <div class="t_listbox">
            <div v-for="item in 5" class="t_list2">
              <div class="imgbox">
                <img src="" alt="">
              </div>
              <p>作者：</p>
            </div>
          </div>
        </div>


      </div>
    </div>
</template>

<script>
    export default {
        name: "the"
    }
</script>

<style scoped>
  .sebox{
    position: relative;
    z-index: 100;
  }
  .t_title{
    height: 0.75rem;
    margin: 0 auto 0.5rem;
  }
  .t_listbox{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 0.28rem;
    margin-bottom: 1.5rem;
  }
  .t_list1{
    width: 3.1rem;
    margin: 0 0.15rem;
    background: rgba(255,255,255,0.64);
    box-shadow: 0.05rem 0.05rem 0.24rem rgba(0,0,0,0.3);
  }
  .t_list1 .imgbox{
    height: 2rem;
  }
  .t_list1 p{
    padding: 0.2rem;
    text-align: center;
  }
  .t_list2{
    width: 2.2rem;
    margin: 0 0.1rem 0.2rem;
    background: rgba(255,255,255,0.64);
    box-shadow: 0.05rem 0.05rem 0.24rem rgba(0,0,0,0.3);
  }
  .t_list2 .imgbox{
    height: 1.4rem;
  }
  .t_list2 p{
    padding: 0.2rem;
    text-align: center;
  }
</style>
