<template>
  <Modal 
    v-model="isShowmodal" 
    :title="title" 
    :mask-closable="false"
    @on-ok="save"
    @on-cancel="cancel">
    <!-- <div slot="footer">
      <Button @click="cancel">取消</Button>
      <Button 
        type="primary" 
        @click="save">
        保存
      </Button>
    </div> -->
    <slot name="content" />
  </Modal>
</template>
<script>
import { constants } from 'crypto';
export default {
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "标题"
    }
  },
  data() {
    return {
      isShowmodal: this.showModal
    };
  },
  watch: {
    showModal(val) {
      this.isShowmodal = val;
    }
  },
  methods: {
    //保存
    save() {
      console.log(1)
      this.isShowmodal = true;
      this.$emit("confirm");
    },
    //取消
    cancel() {
      this.$emit("update:showModal", false);
    },
    //关闭
    close() {
      this.$emit("update:showModal", false);
    }
  }
};
</script>

