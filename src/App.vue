<template>
  <div id="app">
    <v-fbox @setload="setload" v-if="action == 1"></v-fbox>
    <v-sec @setload="setload" v-if="action == 2"></v-sec>
    <v-the @setload="setload" v-if="action == 0"></v-the>

    <div v-if="loading" class="load">
        <div id="preloader_2">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
    </div>
  </div>
</template>

<script>
  import fbox from './components/first.vue'
  import sec from './components/sec.vue'
  import the from './components/the.vue'


export default {
  name: 'App',
  components: {
    'v-fbox': fbox,
    'v-sec': sec,
    'v-the': the
  },
  data () {
    return {
      action: 0,
      loading: false
    }
  },
  methods: {
    setload (data) {
      this.loading = data
    }
  },
  beforeMount() {
    // this.$http.post('common/check').then(res => {
    //   this.action = res.data.result.stage
    // })
  }
}
</script>

<style>
body{
  font:normal normal 16px/1 Microsoft YaHei,tahoma,arial,Hiragino Sans GB,\\5b8b\4f53,sans-serif;
  color: #000;
}
textarea,input{
  font:normal normal 16px/1.5 Microsoft YaHei,tahoma,arial,Hiragino Sans GB,\\5b8b\4f53,sans-serif;
}
.load{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  background: rgba(0,0,0,0.4);
}
img{
  display:block;
}
.clearfix:after {
  content:"";
  display: block;
  clear:both;
}
body,p,ol,ul,h1,h2,h3,h4,h5,h6{
  margin: 0;
  padding: 0;
  list-style: none;
}
a{
  color: inherit;
  text-decoration: none;
}
.nowrap{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.imgbox{
  overflow:hidden;
}
.imgbox>img{
  width: 100%;
}
.bg{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.logo{
  width: 90%;
  position: absolute;
  top: 0.2rem;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 100;
}
.qr{
  padding-top: 0.3rem;
  color: #831645;
  display: inline-block;
}
</style>
