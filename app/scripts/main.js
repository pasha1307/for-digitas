var vm = new Vue({
    el: '#app',
    data: {
      title: '',
      name: '',
      introShow: true,
      sideBar: false,
      isSelected: false,
      selectedItem: {},
      searchOutput: '',
      url: 'http://www.omdbapi.com/?s=',
      mvs: []
    }
    ,
    watch: {
      name: function() {
        this.searchOutput = '';
        if(this.name.length > 0) {
          this.getMovies();
          this.introShow = false;
        }
      }

    },
    methods: {
      getMovies: _.debounce(function () {
        axios.get(this.url + this.name)
          .then(function (response) {
            if(response.data.Search !== undefined) {
              vm.mvs = response.data.Search;
              vm.searchOutput = vm.mvs.slice(0,7);
              vm.title = '';
              console.log(vm.searchOutput[2])
            }
            else if (vm.name.length > 1){ vm.title = 'Try a different word!' }
            else if (vm.name.length <= 1) {
              vm.isSelected = false;
              vm.introShow = true;
            }
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