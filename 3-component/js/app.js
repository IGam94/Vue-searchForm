import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'
import FormComponent from './componenets/FormComponent.js'
import ResultComponent from './componenets/ResultComponent.js'
import ListComponent from './componenets/ListComponent.js'
import TabComponent from './componenets/TabComponent.js'

new Vue({
  el:'#app',
  data:{
    query:'',
    submitted:false,
    searchResult:[],
    tabs:['추천 검색어','최근 검색어'],
    selectedTab:'',
    keywords:[],
    history:[],
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

})