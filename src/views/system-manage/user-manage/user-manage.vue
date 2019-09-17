<template>
  <div class="content">
    <SearchPanel>
      <Input 
            clearable
            placeholder="请输入机构名称/编码"
            ref="groupName"
            class="search-input"/>
      <template v-slot:right>
        <Button
            type="primary"
            @click="showModal('add')">
            新增
          </Button>
      </template>
    </SearchPanel>
    <div class="table-content">
      <Table :columns="userColumns" :data="userList">
        <template slot-scope="{ row, index }" slot="action">
          <div class="slotStyle">
            <Button type="default" size="small" @click="editUser(row)" >修改</Button>
            <Button type="default" size="small" @click="editIndex = -1">删除</Button>
          </div>
        </template>
      </Table>
    </div>
    <ConmonModal :show-modal.sync="showModal" :title="modalTitle"></ConmonModal>
  </div>
</template>
<script>
import SearchPanel from '@/components/common-search/index.js'
import ConmonModal from '@/components/common-modal/index.js'
import { getUser } from '@/api/service.js'
import { userColumns } from '@/views/commom/const.js'
import CountTo from 'vue-count-to'
export default {
  data() {
    return {
      userColumns:userColumns,
      showModal:false,
      modalTitle:'',
      currentPage:1,
      pageSize:10,
      companyId:'ALL',
      userList:[],
    }
  },
  created() {
    this._getUser()
  },
  components:{
    SearchPanel,
    ConmonModal,
    CountTo
  },
  computed:{
  },
  methods:{
    _getUser() {
      let params = {
        page:this.currentPage,
        limit:this.pageSize,
        companyId:this.companyId
      }
      getUser(params).then(res => {
        if(res.code == 0) {
          this.userList = res.data.records
        }
      })
    },
    editUser(data) {
    
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.groupName.focus()
    })
  }
}
</script>
<style lang="less" scoped>
</style>