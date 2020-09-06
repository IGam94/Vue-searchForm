<template>
  <div>
    <ul class="tabs">
    <li v-for="(tab , index) in tabs" v-bind:class="{active: tab === selectedTab}"
    v-on:click="onClickTab(tab)" v-bind:key="index">
      {{tab}}
    </li>
  </ul>
  </div>
</template>


<script>
export default {
  props:['tabs','selected-tab'],
  methods: {
    onClickTab(tab){
      this.$emit('@change',tab)
    }
  }
}
</script>


