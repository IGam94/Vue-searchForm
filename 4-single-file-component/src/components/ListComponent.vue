<template>
  <div v-if = "data.length">
    <ul class="list">
      <li v-for="(item, index) in data"
          v-on:click="onClickList(item.keyword)" v-bind:key="index">
        <span v-if="keywordType" class="number">{{index + 1}}</span>
        {{item.keyword}}
        <span v-if="historyType" class="date">{{item.date}}</span>
        <button v-if="type === 'history'" v-on:click.stop="onRemoveList(item.keyword)" 
        class="btn-remove"></button>
      </li>
    </ul>
  </div>
  <div v-else>
    <span v-if="keywordType">추천 검색어가 없습니다.</span>
    <span v-if="historyType">최근 검색어가 없습니다.</span>
  </div>
</template>



<script>
export default{

  props:['data','type'],
  computed: {
    keywordType(){
      return this.type === 'keywords'
    },
    historyType(){
      return this.type === 'history'
    }
  },
  methods: {
    onClickList(keyword){
      this.$emit('@click',keyword)
    },
    onRemoveList(keyword){
      this.$emit('@remove',keyword)
    }
  },
}
</script>