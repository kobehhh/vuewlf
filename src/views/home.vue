<template>
  <div class="home">
    <!-- <Table  
      height="400" :columns="columns1" :data="data1" id="tab"></Table> -->
      <SearchPanel>
        <template v-slot:default><Input 
            placeholder="角色名称"  /></template>
        <template v-slot:right>
          <Button 
            type="primary" >
            新增
          </Button>
        </template>
      </SearchPanel>
  </div>
</template>

<script>
import { getUser } from '@/api/service.js'
import SearchPanel from '@/components/common-search/index.js'
export default {
  name: 'Home',
  data() {
    return {
      currentPage :1,
      pageSize:10,
      columns1: [
  {
    title: "ID",
    key: "id",
    width: 80,
    align:"center"
  },
  {
    title: "登录账号",
    key: "loginName",
    minWidth: 120,
    sortable: true,
    align:"center"
  },
  {
    title: "姓名",
    key: "userName",
    minWidth: 160,
    sortable: true,
    align:"center"
  },
  {
    title: "手机号",
    key: "mobile",
    width: 120,
    align:"center"
  },
  {
    title: "邮箱",
    key: "email",
    minWidth: 160,
    sortable: true,
    align:"center"
  },
  {
    title: "角色",
    key: "roleName",
    minWidth: 130,
    align:"center",
  },
  {
    title: "状态",
    key: "status",
    minWidth: 80,
    align:"center",
    render: (h, params) => {
      return h("span", ["启用", "禁用"][params.row.status]);
    }
  },
  {
    title: "机构",
    key: "groupName",
    minWidth: 140,
    align:"center"
  },
  {
    title: "创建时间",
    key: "createDate",
    width: 160,
    align:"center"
  },
  {
    title: "操作",
    slot: "action",
    fixed: "right",
    width: 200,
    align:"center",
  }
],
data1:[],
dom:''
    }
  },
  created() {
  },
  components: {
    SearchPanel
  },
  computed: {

  },
  mounted() {
    // this.getMore()
    this._getUser()
  },
  methods: {
    _getUser() {
      let params = {
        page:this.currentPage,
        limit:this.pageSize,
        companyId:"ALL"
      }
      getUser(params).then(res => {
        if(res.code == 0) {
        this.data1 = res.data.records
        }
      })
    },
    // getMore() {
    //   this.dom = document.querySelector("#tab")
    //   this.dom.addEventListener("scroll", function() {
    //     const scrollDistance =dom.scrollHeight - dom.scrollTop - dom.clientHeight;
    //     console.log(scrollDistance)
    //     if(scrollDistance <=0){//等于0证明已经到底，可以请求接口
    //         if(this.currentPage < $this.totalPage){//当前页数小于总页数就请求
    //             this.currentPage++;//当前页数自增
    //             //请求接口的代码
                           
    //         }
    //     }
    // })
    // }
  }
}

</script>
<style lang="less" scoped>
.home{
  position: relative;
  .home-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

</style>