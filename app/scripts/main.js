var vm = new Vue({
    el: '#app',
    data: {
      title: '',
      name: '',
      needIt: true,
      sideBar: false,
      isSelected: false,
      selectedItem: {},
      startSearch: '',
      searchOutput: '',
      url: 'http://www.omdbapi.com/?s=',
      mvs: []
    }
    ,
    watch: {
      name: function() {
        this.searchOutput = '';
        if(this.name.length > 0) {
          this.getSome();
          this.needIt = false;
        }
      }

    },
    methods: {
      getSome: _.debounce(function () {
        axios.get('http://www.omdbapi.com/?s=' + this.name)
          .then(function (response) {
            if(response.data.Search !== undefined) {
              vm.mvs = response.data.Search;
              vm.searchOutput = vm.mvs.slice(0,7);
              vm.title = '';
              console.log(vm.searchOutput[2])
            }
            else if (vm.name.length > 1){ vm.title = 'Try a different word!' }
          })
          .catch(function (error) {
            console.log(error);
          });
      }, 500),
      onShowMovie: function (id) {
        this.selectedItem = id;
        this.isSelected = true;
        console.log(this.selectedItem)
      }
    }
  });