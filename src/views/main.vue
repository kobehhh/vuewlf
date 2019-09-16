<template>
  <div class="wrapper">
    <div class="layout">
      <Layout>
        <Common-header :user-name="userName"></Common-header>
        <Layout>
          <Sider
            ref="siderbar"
            hide-trigger
            collapsible
            :style="{background: '#fff'}"
            :class="{isCollapsed:!isCollapsed}"
            :collapsed-width="78"
            v-model="isCollapsed"
          >
            <!-- <Icon
              size="28"
              type="ios-arrow-forward"
              :class="collapsedIcon"
              @click.native="collapsedSider"
            /> -->
            <Menu
              theme="dark"
              class="side-menu"
              v-show="!isCollapsed"
              :class="menuitemClasses"
              width="auto"
              @on-select="jumpTo"
            >
              <!-- 一级菜单 -->
              <Submenu :key="d.id" :name="d.uri" :data-id="d.uri" v-for="(d,index) in menus">
                <template slot="title">
                  <Icon size="18" :type="iconFont(index)"/>
                  {{ d.name }}
                </template>
                <!-- 二级菜单 -->
                <Submenu
                  :key="li.id"
                  :name="li.uri"
                  :data-id="li.uri"
                  v-if="li.children && li.children.length > 0"
                  v-for="li in d.children"
                >
                  <template slot="title">{{ li.name }}</template>
                  <!-- 三级菜单 -->
                  <MenuItem
                    :key="item.id"
                    :name="item.uri"
                    :data-id="item.uri"
                    v-for="item in li.children"
                  >{{ item.name }}</MenuItem>
                </Submenu>
                <!-- 超级管理员二级菜单 -->
                <MenuItem
                  :key="li.id"
                  :name="li.uri"
                  :data-id="li.uri"
                  v-if="!li.children"
                  v-for="li in d.children"
                >{{ li.name }}</MenuItem>
              </Submenu>
            </Menu>
          </Sider>
          <layout :style="{padding: '0 24px 24px',background: 'rgb(241, 243, 250)'  }">
            <Breadcrumb :style="{margin: '10px 0'}">
              <BreadcrumbItem to="/home">Home</BreadcrumbItem>
              <BreadcrumbItem >Home</BreadcrumbItem>
            </Breadcrumb>
            <Content class="content" :style="{minHeight: '280px'}">
              <router-view />
            </Content>
          </layout>
        </Layout>
      </Layout>
    </div>
  </div>
</template>
<script>
import CommonHeader from "@/components/common-header/index.js";
import { getMenu } from "@/api/service.js";
import { mapState, mapMutations } from "vuex";
import Cookies from "js-cookie";
import axios from "@/api/http.js";
import { RouterMap } from "@/router/menu.js";
export default {
  data() {
    return {
      isCollapsed: false,
      menuList: [],
      menus: [],
      openNames: [],
      menuMap: RouterMap,
      currentPath:'/home',
      iconList: ['ios-cog', 'md-swap', 'logo-buffer', 'md-desktop', 'ios-create', 'md-bookmarks', 'ios-calendar', 'ios-chatboxes', 'md-chatbubbles', 'md-folder'],
      userName: Cookies.get("user_name"),
    };
  },
  components: {
    CommonHeader
  },
  provide: {
    // return {
    //   aaa:'aaa'
    // }
    aaa:'1121'
  },
  created() {
    axios.defaults.headers.common["token"] = Cookies.get("user_token");
    this.setUserInfo(Cookies.get());
  },
  computed: {
    ...mapState({
      companyId: "user_companyId",
      loginName: "user_loginName"
    })
  },
  computed: {
    collapsedIcon() {
      return ["collapsed-icon", !this.isCollapsed ? "is-icon-collapsed" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    // breadcrumbList() {
    //   const pathArr = this.currentPath.split('/').filter( e => e != '')
    //   // if(!path) {
    //   //   return []
    //   // }
      
    // }
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
    getmenuList() {
      let params = {
        systemFlag: "sys_config",
        permType: 0,
        loginName: 1000,
        companyId: "ALL"
      };
      console.log(params);
      getMenu(params).then(res => {
        if (res.code == 0) {
          let menus = [],
            tem = res.data[0].children;
          for (let i = 0, len = tem.length; i < len; i++) {
            menus.push(tem[i]);
          }
          this.menus = this.deleteFunc(menus);
          //手动展开菜单
          this.updataMenuActive();
        } else {
          this.$Message.error({
            content: res.msg,
            duration: 10,
            closable: true
          });
        }
      });
    },
    iconFont (inx) {
      return this.iconList[inx]
    },
    updataMenuActive() {},
    collapsedSider() {
      this.$refs.siderbar.toggleCollapse();
    },
    deleteFunc(menu) {
      let arr = JSON.parse(JSON.stringify(menu))
      const recur = (parent) => {
        for(let i = 0,len = parent.length;i < len;i++) {
          let e = parent[i]
          if(e.children && e.children[0].type == 'menu') {
            recur(e.children)
          } else {
            e.children = null
          }
        }
      }
      recur(arr)
      return arr
    },
    jumpTo(url) {
      console.log(url)
      this.currentPath = url
      this.$router.push({path:url})
    },
    
  },
  mounted() {
    this.getmenuList();
    // this.breadcrumbList()
  }
};
</script>
<style lang="less" scoped>
.collapsed-icon {
  display: block;
  top: 0px;
  right: 20px;
  z-index: 9999;
  text-align: center;
  cursor: pointer;
  color: #eee;
}
.is-icon-collapsed {
  text-align: right;
  line-height: 35px;
  padding-right: 20px;
}
.dropdown-wrap {
  width: 100px;
  height: 100px;
  background-color: red;
}
.layout {
  // border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  .side-menu {
    height: calc(100vh - 92px);
  }
  .content {
    // background: #fff;
    max-height: calc(100vh - 108px);
  }
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.ivu-layout.ivu-layout-has-sider > .ivu-layout {
  min-height: calc(100vh - 64px);
}

.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
.isCollapsed {
  width: 240px !important;
  min-width: 240px !important;
  max-width: 240px !important;
}
.bg {
  background-color: red;
}
</style>

