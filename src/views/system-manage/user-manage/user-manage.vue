<template>
  <div @click="set">{{a}}</div>
</template>
<script>
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  computed:{
    ...mapState(['a'])
  },
  methods:{
    set() {
      this.$store.commit('setA',"b")
    }
  },
  mounted() {
    console.log(this)
  }
}
</script>