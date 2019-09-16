<template>
  <header class="header">
    <div class="topbar-brand">
      <span>迅策开放平台</span>
    </div>
    <div class="topbar-nav">
      <ul >
        <li class="nav-li">
          <a @click="showModal = true">
            <Icon 
              type="md-lock"
              size="22" />
              <span>修改密码</span>
          </a>
        </li>
        <li class="nav-li">
          <a href="javascript:;">
            <Avatar 
              icon="ios-person"
              :style="{background: '#ffbf00'}" />
            <span class="user-name">
              {{ userName }}
            </span>
          </a>
        </li>
        <li class="nav-li">
          <a href="javascript:;" @click="_logOut">
            <Icon 
              class="cursor-p"
              type="ios-log-out"
              size="25" />
          </a>
        </li>
      </ul>
    </div>
    <Modal 
      v-model="showModal"
      title="修改密码"
      :mask-closable="false"
      @on-ok="changePwd"
      @on-cancel="cancel">
      <Form 
        ref="changePwdForm"
        :model="pwdForm"
        :rules="ruleValidate"
        :label-width="80">
        <Row
          type="flex"
          justify="center"
          align="middle">
          <Col span="12">
            <FormItem
              prop="old_pwd"
              label="原密码">
              <Input placeholder="请输入原密码" v-model="pwdForm.old_pwd"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          align="middle">
          <Col span="12">
            <FormItem
              prop="new_pwd"
              label="新密码">
              <Input placeholder="请输入新密码" v-model="pwdForm.new_pwd"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          align="middle">
          <Col span="12">
            <FormItem
              prop="confirm_pwd"
              label="确认密码">
              <Input placeholder="请确认密码" v-model="pwdForm.confirm_pwd"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </header>
</template>
<script>
import { logOut,modifyPassword } from '@/api/service.js'
import Cookies from 'js-cookie'
export default {
  data() {
    const validateIsSame = (rule, value, callback) => {
      if (this.pwdForm.new_pwd !== value) {
        callback(new Error('两次新密码输入不一致'))
        return
      }
      callback()
    }
    return {
      ruleValidate :{
        old_pwd: [{required: true, message: '请输入原密码', trigger: 'blur'}],
        new_pwd: [{required: true, message: '请输入新密码', trigger: 'blur'}],
        confirm_pwd: [{required: true, message: '请确认密码', trigger: 'blur'}, { validator: validateIsSame, trigger: 'blur' }]
      },
      showModal:false,
      pwdForm:{
        old_pwd:'',
        new_pwd:'',
        confirm_pwd:''
      }
    }
  },
  props: {
    userName:{
      type: String,
      default:''
    }
  },
  inject:['aaa'],
  mounted() {
    console.log(this.aaa)
  },
  methods:{
    changePwd() {
      modifyPassword({
        oldPwd:this.pwdForm.old_pwd,
        newPwd:this.pwdForm.new_pwd
      }).then(res => {
        if(res.code == 0) {
          this.showModal = false
          this.$Message.success('修改密码成功,请重新登录')
          this.afterModify()
        }else {
          this.$Message.error({content:res.msg})
        }
      })
      this.$refs.changePwdForm.resetFields()
    },
    _logOut() {
      this.$Modal.confirm({
        title: '提示',
        content: '此操作将退出系统, 是否继续?',
        onOk: () => {
          logOut({}).then(res => {
            if(res.code == 0) {
              this.afterModify()
            }else {
              this.$Message.error({content:res.msg})
            }
          })
        },
        onCancel: () => {}
      })
    },
    afterModify() {
      Cookies.remove('user_token');
      Cookies.remove('user_id');
      Cookies.remove('user_name');
      Cookies.remove('user_companyId');
      Cookies.remove('user_roleCode');
      Cookies.remove('user_isSuperAdmin');
      Cookies.remove('loginName');
      this.$store.commit('cleanUserInfo');
      this.$router.push({ path: '/login' })
    },
    cancel() {
      this.$refs.changePwdForm.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
header {
  background-color:#515a6e;
  color:#fff;
  min-height:60px;
  line-height:60px;
  display:flex;
  justify-content: space-between;
  .topbar-brand>span {
    font-weight: 650;
    font-style: normal;
    font-size: 20px; 
    padding-left: 20px;
  }
  .topbar-nav {
    ul {
      display: flex;
    } 
    .nav-li {
      padding: 0 16px;
    }
  }
}  
</style>