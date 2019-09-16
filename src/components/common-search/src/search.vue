<template>
  <div class="search-panel">
    <div class="search-panel__left">
      <slot />
    </div>
    <div class="search-panel__right">
      <slot name="right" :user="user"></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user:'wlf'
    }
  }
}
</script>>
<style lang="less" scoped>
.search-panel {
  display: flex;
  /*padding: 15px 20px;*/
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 24px;
  background: #fff;
  margin-bottom: 15px;
  .search-panel__left {
    display: flex;
    align-items: center;
    > * {
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .search-panel__right {
    display: flex;
    align-items: center;
    > * {
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .search-item {
    margin-right: 15px;
    > * {
      margin-left: 15px;
      &:last-child {
        margin-left: 0;
      }
    }
  }
}
</style>
