<template>
 <div>
  <header>
    <h2 class="container">검색</h2>
  </header>
  <div class="container">
    <search-form v-bind:value="query" v-on:@submit="onSubmit"
     v-on:@reset="onReset"></search-form>
  </div>
  <div v-if="submitted">
    <search-result v-bind:data="searchResult" v-bind:query="query">
    </search-result>
  </div>
  <div v-else>
    <tabs v-bind:tabs="tabs" v-bind:selected-tab="selectedTab"
    v-on:@change="onClickTab"></tabs>
  </div>
  <div v-if="selectedTab === tabs[0]">
    <list v-if="!submitted" v-bind:data="keywords" type="keywords" v-on:@click="onClickKeyword"></list>
  </div>
  <div v-else>
    <list v-if="!submitted" v-bind:data="history" type="history"  v-on:@click="onClickKeyword"
      v-on:@remove="onClickRemoveHistory"></list>
  </div>
 </div>
</template>

<script>

import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'
import FormComponent from './components/FormComponent.vue'
import ResultComponent from './components/ResultComponent.vue'
import ListComponent from './components/ListComponent.vue'
import TabComponent from './components/TabComponent.vue'

export default {
  name: 'app',
  data () {
    return {
      query:'',
      submitted:false,
      searchResult:[],
      tabs:['추천 검색어','최근 검색어'],
      selectedTab:'',
      keywords:[],
      history:[],
    }
  },
  
  components:{
    'search-form':FormComponent,
    'search-result':ResultComponent,
    'list':ListComponent,
    'tabs':TabComponent
  },
  created() {
    this.selectedTab = this.tabs[0]
    this.fetchKeyword()
    this.fetchHistory()
  },
  methods: {
    
    onSubmit(inputValue) {
      this.query = inputValue
      this.search()
    },
    onReset(){
      this.resetForm()
    },
    

    search(){
      SearchModel.list().then(data => {
        this.submitted = true
        this.searchResult = data
      })
      HistoryModel.add(this.query)
      this.fetchHistory()
    },

    onClickKeyword(keyword){
      this.query = keyword
      this.search()
    },
    onClickHistory(keyword){
      this.query = keyword
      this.search()
    },
    fetchKeyword(){
      KeywordModel.list().then(data =>{
        this.keywords = data
      })
    },
    fetchHistory(){
      HistoryModel.list().then(data =>{
        this.history = data
      })
    },
    onClickRemoveHistory(keyword){
      HistoryModel.remove(keyword)
      this.fetchHistory()
    },
    resetForm(){
      this.query= ''
      this.submitted=false,
      this.searchResult=[]
    },
    onClickTab(tab){
      this.selectedTab = tab
      console.log(tab)

    }
  },
}
</script>

