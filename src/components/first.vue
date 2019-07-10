<template>
    <div v-show='show' class="f_box">
      <div class="fbox" :style="{'transform': 'translateX(-' + pos + 'rem)'}">

        <div>
          <div class="gzbox">
            <p class="f1_title">投稿要求：</p>
            <p>1、 不限设备（无论是专业相机还是手机或航拍，只要作品原创，欢迎投稿！）</p>
            <p>2、 不限风格（滤镜后期随意加，只要图片高清、视觉效果优秀，欢迎投稿！）</p>
            <p>3、 参赛作品以你身边的中国或俄罗斯元素为题材（中国网友需拍摄俄罗斯元素照片，俄罗斯网友需拍摄中国元素照片。内容不限，风景、人物、静物等均可。）</p>
            <p></p>
            <p class="f1_title">奖项设置：</p>
            <p>活动将设一等奖2名，二等奖3名，三等奖5名，优胜奖若干。</p>
            <p>主办方将从所有参与活动的图片中，选取50幅优秀作品进入复赛，并由两国网友和专家投票选出获奖作品。获奖作品将于10月在北京展出，作者也将获得丰厚奖品。</p>
          </div>
        </div>

        <div>
          <div class="f_1_box">
            <img class="animated zoomIn" style="width: 6rem;" src="../assets/img1.png" alt="">
            <img class="animated zoomIn font1" style="animation-delay: 0.4s;" src="../assets/font1.png" alt="">
          </div>

          <div class="f_1_text animated fadeInUp" style="animation-delay: 0.8s;">
            由北京外国语大学与中俄头条客户端共同发起的“美丽中国”&“美丽俄罗斯”摄影大赛正式启动,欢迎广大中俄网友踊跃参与
          </div>
        </div>

        <div>
          <div class="filebox">
            <div v-for="(item, index) in list">
              <img :src="item.b64url" class="fileimg" alt="">
              <img @click="remove(index)" class="remove" src="../assets/remove.png" alt="">
            </div>
          </div>

          <div class="btn">
            选择图片
            <input accept="image/*" @change="getFile($event)" type="file" class="file_input"></div>
          <div @click="submitboxshow = true" class="btn">确认提交</div>
        </div>

        <div class="r_l rbox animated fadeInLeft" style="animation-delay: 0.8s;">
          <div @click="move_r">
            <p>返回<br/>首页</p>
            <img src="../assets/arrow2.png" alt="">
          </div>
          <div @click="move_f">
            <p>查看<br/>规则</p>
            <img src="../assets/arrow1.png" alt="">
          </div>
        </div>

        <div class="r_r rbox animated fadeInRight" style="animation-delay: 0.8s;">
          <div @click="move_r">
            <p>上传<br/>作品</p>
            <img src="../assets/arrow2.png" alt="">
          </div>
          <div @click="move_f">
            <p>返回<br/>首页</p>
            <img src="../assets/arrow1.png" alt="">
          </div>
        </div>

      </div>

      <img class="logo" src="../assets/logo.png" alt="">
      <img class="bg" src="../assets/bg.jpg" alt="">

      <div @click="tishi = false" v-if="tishi" class="zzbox">
        <div @click.stop>
          <p style="margin-bottom: 0.2rem;">提示</p>
          <p style="margin-bottom: 0.2rem;">{{txmassage}}</p>
          <p style="text-align: right;">
            <span class="qr" @click="tishi = false">确认</span>
          </p>
        </div>
      </div>

      <div v-if="valueDeterminateshow" style="z-index: 100;" class="zzbox">
        <div style="background: #fff;width: 3rem;height: 1rem;line-height: 0.5rem;text-align: center;font-size: 0.28rem;">
          <p>上传进度</p>
          <p>{{valueDeterminate ? valueDeterminate : ''}}</p>
        </div>
      </div>

      <div style="z-index: 100;" @click="submitboxshow = false" v-if="submitboxshow" class="zzbox">
        <div @click.stop>
          <img src="../assets/bg2.jpg" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0.5;" alt="">

          <div style="position: relative;z-index: 10;">
            <p style="margin-bottom: 0.4rem;font-size: 0.36rem;text-align: center;">填写信息</p>
            <div class="inputbox">
              <input v-model="submitData.name" type="text" placeholder="作者姓名">
            </div>

            <div class="inputbox">
              <input v-model="submitData.mobile" type="number" placeholder="手机号">
            </div>

            <div class="inputbox">
              <input v-model="submitData.organization" type="text" placeholder="所属单位">
            </div>

            <p style="text-align: right;">
              <span class="qr" @click="submit">确认</span>
            </p>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
              count : 0,
              show : false,
              tishi: false,
              pos: 7.5,
              list: [],
              txmassage: '',
              submitboxshow: false,
              submitData: {
                name: '',
                mobile: '',
                organization: '',
                files: []
              },
              valueDeterminate: null,
              valueDeterminateshow: false
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
          if(val == 8){
            this.show = true
            document.getElementById('base').style.display = 'none'
          }
        }
      },
      beforeMount () {
          if (localStorage.getItem('phone')) {
            this.$http.post('member/get', {
              mobile: localStorage.getItem('phone')
            }).then(res => {
              this.submitData = {
                  name: res.data.result.name,
                  mobile: res.data.result.mobile,
                  organization: res.data.result.organization,
                  files: []
              }
            })
          }
      },
      methods: {
          submit () {
            if (this.submitData.name == '') {
              this.txmassage = '请填写作者姓名'
              this.tishi = true
              return
            }
            if (!(/^1[3465789]\d{9}$/.test(this.submitData.mobile))) {
              this.txmassage = '请填写正确的手机号'
              this.tishi = true
              return
            }
            if (this.submitData.organization == '') {
              this.txmassage = '请填写所属单位'
              this.tishi = true
              return
            }
            if (this.list.length <= 0) {
              this.txmassage = '请选择作品'
              this.tishi = true
              return
            }

            localStorage.setItem('phone', this.submitData.mobile)

            let formData = new window.FormData();
            formData.append('name', this.submitData.name);
            formData.append('mobile', this.submitData.mobile);
            formData.append('organization', this.submitData.organization);

            this.list.forEach(item => {
              formData.append('files', item.data);
            })

            var options = {
              url: 'member/join',
              data: formData,
              method: 'post',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              onUploadProgress: progressEvent => {  //获取上传进度
                this.valueDeterminate = parseInt(progressEvent.loaded / progressEvent.total * this.list.length | 0) + '/' + this.list.length
              }
            }

            this.submitboxshow = false
            this.valueDeterminateshow = true

            this.$http(options).then(res => {
              this.valueDeterminateshow = false
              this.txmassage = '提交成功'
              this.tishi = true
              this.list = []
            }).catch(err => {
              console.log(err)
            })
          },
          remove (index) {
            this.list.splice(index,1)
          },
          move_r () {
            this.pos += 7.5
          },
          move_f () {
            this.pos -= 7.5
          },
          getFile (event) {	//获取本地文件
            if (event.target.files[0].size > (1024 * 1024 * 10)) {
              this.txmassage = '请选择小于10M的图片'
              this.tishi = true
            } else {
              let that = this
              if (!event || !window.FileReader) return  // 看支持不支持FileReader
              let reader = new FileReader()
              reader.readAsDataURL(event.target.files[0]) // 这里是最关键的一步，转换就在这里
              reader.onloadend = function () {
                let obj ={
                  b64url: this.result,
                  data: event.target.files[0]
                }
                that.list.push(obj)
              }
            }
          },
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
    box-shadow: 0.05rem 0.05rem 0.2rem rgba(0,0,0,0.3);
    border-radius: 0.1rem;
    position: relative;
    overflow: hidden;
  }
  .f_box{
    position: fixed;
    overflow: auto;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .fbox{
    width: 22.5rem;
    transition: 0.6s;
    display: flex;
    position: relative;
    z-index: 50;
  }
  .fbox > div{
    width: 7.5rem;
    padding-top: 2rem;
    overflow: hidden;
  }
  .f_1_box{
    position: relative;
    margin-bottom: 0.66rem;
  }
  .f_1_box img{
    margin: 0 auto;
  }
  .font1{
    width: 6.8rem;
    position: absolute;
    left: 0;
    right: 0;
    top: 0.9rem;
  }
  .f_1_text{
    width: 5.6rem;
    height: 3rem;
    background: rgba(255,255,255,0.64);
    box-shadow: 0.05rem 0.05rem 0.24rem rgba(0,0,0,0.3);
    margin: 0 auto;
    text-align: justify;
    font-size: 0.3rem;
    box-sizing: border-box;
    padding: 0.36rem 0.26rem;
    line-height: 0.5rem;
    text-indent: 0.6rem;
  }
  .fbox .rbox{
    position: absolute;
    top: 6.8rem;
    width: 2.3rem;
    height: 2.3rem;
    font-size: 0.3rem;
    line-height: 0.5rem;
    padding-top: 0;
    display: flex;
    align-items: center;
    background: rgba(255,255,255,0.64);
    box-shadow: 0.05rem 0.05rem 0.24rem rgba(0,0,0,0.3);
    border-radius: 50%;
  }
  .rbox > div{
    width: 50%;
  }
  .rbox > div:nth-child(1){
    padding-left: 0.4rem;
    box-sizing: border-box;
  }
  .rbox > div:nth-child(2){
    padding-left: 0.2rem;
    box-sizing: border-box;
  }
  .rbox img{
    width: 0.6rem;
  }
  .r_l{
    left: calc(33.33% - 1.15rem);
  }
  .r_r{
    right: calc(33.33% - 1.15rem);
  }
  .gzbox{
    width: 5.8rem;
    box-sizing: border-box;
    background: rgba(255,255,255,0.64);
    box-shadow: 0.05rem 0.05rem 0.24rem rgba(0,0,0,0.3);
    text-align: justify;
    font-size: 0.28rem;
    line-height: 0.5rem;
    padding: 0.2rem;
    margin-left: 0.3rem;
  }
  .gzbox p{
    margin-bottom: 0.1rem;
  }
  .f1_title{
    font-weight: bold;
  }
  .filebox{
    margin-left: 0.5rem;
    height: 3.8rem;
    padding: 0.2rem 0.3rem;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;
    background: rgba(255,255,255,0.64);
    box-shadow: 0.05rem 0.05rem 0.24rem rgba(0,0,0,0.3);
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 1rem;
  }
  .filebox div{
    display: inline-block;
    width: 4.7rem;
    height: 3.4rem;
    overflow: hidden;
    position: relative;
    margin-right: 0.3rem;
  }
  .filebox .fileimg{
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .btn{
    width: 4.3rem;
    height: 1.1rem;
    margin: 0 auto 0.8rem;
    border-radius: 0.55rem;
    color: #fff;
    background: #831645;
    text-align: center;
    line-height: 1.1rem;
    box-shadow: 0.13rem 0.13rem 0.13rem rgba(63,2,8,0.73);
    position: relative;
  }
  .file_input{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .remove {
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
    width: 0.5rem;
    z-index: 50;
  }
  .inputbox{
    border: 1px solid #ddd;
    overflow: hidden;
    border-radius: 0.1rem;
    margin-bottom: 0.3rem;
  }
  .inputbox input{
    width: 100%;
    height: 0.5rem;
    outline: none;
    padding: 0.1rem;
    border: 0;
  }
</style>
