<template>
  <div v-if="value" class="zzbox" @click="$emit('input', false)">

    <img @click.stop class="showimg" :src="url" alt="">

    <img @click="$emit('input', false)" class="closebtn" src="../assets/remove.png" alt="">
  </div>
</template>

<script>
    export default {
      props: ['url', 'value'],
      data () {
        return {

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
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .showimg{
    max-width: 100%;
    max-height: 100%;
  }
  .closebtn{
    width: 0.3rem;
    top: 0.1rem;
    right: 0.1rem;
    position: absolute;
    z-index: 10;
  }
</style>
