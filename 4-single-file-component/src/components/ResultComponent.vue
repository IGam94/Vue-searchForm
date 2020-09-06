<template>
  <div>
    
    <div v-if="data.length">
      <ul>
        <li v-for="(item, index) in data" v-bind:key="index">
          <img v-bind:src="item.image">{{item.name}}
        </li>
      </ul>
    </div>

    <div v-else>
      {{query}} 검색어로 찾을 수 없습니다.
    </div>

  </div>
</template>

<script>
export default {
  props:['data','query']
}
</script>
