<template>
  <div class='login'>
    <div class="login-bg">
      <img :src="bgImg">
    </div>
    <div class="login-contariner">
      <h1>系统</h1>
      <Form action="" clsss="form">
        <label class="title">用户名称</label>
        <input type="text" class="login-input" v-model="loginName" placeholder="请输入用户名" />
        <label class="title">输入密码</label>
        <input type="password" class="login-input" v-model="password" placeholder="请输入密码" />
        <button type="button" class="login-btn" @click="loginSubmit()">登录</button>
      </Form>
    </div>
  </div>
</template>
<script>
import bgImg from '@/assets/login_bg.png'
import Cookies from 'js-cookie'
import axios from '@/api/http.js'
import { login } from '@/api/service.js'
export default {
  data() {
    return {
      bgImg:bgImg,
      loginName:'',
      password:''
    }
  },
  methods:{
    loginSubmit() {
      let params = {
        loginname:this.loginName,
        pwd:this.password
      }
      this.$router.push({name:'home'})      
      login(params).then(res => {
        if(res.code == 0) {
          this.loginSuccess(res.data)
        }
      })
    },
    loginSuccess(data) {
      const that = this
      let expires = Math.ceil(data.tokenVal.expires / 3600)
      Cookies.set('user_token',data.tokenVal.token,{ expires:expires })
      Cookies.set('user_id',data.id,{ expires:expires })
      Cookies.set('user_name',data.userName,{ expires:expires })
      Cookies.set('user_loginName',data.loginName,{ expires:expires })
      Cookies.set('user_companyId',data.companyId,{ expires:expires })

      axios.defaults.headers.common['token'] = Cookies.get('user_token')

      this.$Message.success('登录成功')
      this.$store.commit('setUserInfo',{
        'user_token':data.tokenVal.token,
        'user_id':data.id,
        'user_name':data.userName,
        'user_loginName':data.loginName,
        'user_companyId':data.companyId
        })
      setTimeout(function() {
        that.$router.push({name:'home'})
      },200)
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  overflow:hidden;
  width:100%;
  height:100%;
}
.login-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  img {
    width: 100% ;
    height: 100%;
  }
}
.login-contariner{
  position:absolute;
  top:18%;
  right:10%;
  width:400px;
  height:450px;
  background:#fff;
  z-index:5;
  &> h1 {
    background:linear-gradient(left, #004f71, #00192c);
    text-align:center;
    height:65px;
    line-height:65px;
    fomt-size:30px;
    color:#fff;
  }
  &> form{
    padding:35px 50px;
  }
  &> form .login-input {
    width: 100%;
    height: 42px;
    margin-bottom: 25px;
    padding: 0 15px;
    font-size: 14px;
    border: none;
    box-shadow: none;
    border-bottom: 1px solid #eee;
    outline: none;
    background-color: rgb(232, 240, 254)
  }
  &>form .title {
    font-size: 14px;
    line-height: 30px;
  }
  &>form .login-btn {
    margin-top:35px;
    width: 100%;
    height: 42px;
    border-radius: 20px;
    background: linear-gradient(#0083d1, #075384);
    color:#fff;
    font-size:16px;
    outline:none;
    transition: all 0.2s;
    font-family: PingFangSC-Regular;
  }
}

</style>