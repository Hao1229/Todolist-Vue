var app = new Vue({
    el: '#app',
    data: {
      newtoDo: "",
      toDos: JSON.parse(localStorage.getItem('list')) || [
        // {
        //   id: '123',
        //   title: 'abc',
        //   completed: false,
        // }
      ],
      visibility: 'all',
      cacheTodo: {},
      cacheTitle: '',
    },
    methods: {
      addTodo: function () {
        let value = this.newtoDo.trim();
        let timestamp = Math.random();
        if (!value) {
          return
        }
        this.toDos.push({
          id: timestamp,
          title: value,
          completed: false,
        });
        this.newtoDo = "";
      },
      remove: function (todo) {
        let newIndex = '';
        let vm = this;
        //  let newIndex = vm.toDos.findIndex(function(item, index){
        //   return todo.id === item.id;
        //  });
        vm.toDos.forEach(function (item, index) {
          if (todo.id === item.id) {
            newIndex = index;
          }
        });
        this.toDos.splice(newIndex, 1);
      },
      editTodo: function (item) {
        this.cacheTodo = item;
        this.cacheTitle = item.title;
      },
      cancelEdit: function () {
        this.cacheTodo = {};
      },
      doneEdit: function (item) {
        item.title = this.cacheTitle;
        this.cacheTitle = "";
        this.cacheTodo = {};
      },
      clearAll: function () {
        let vm = this;
        vm.toDos = [];
      }
    },
    computed: {
      filteredTodos: function () {
        if (this.visibility == 'all') {
          return this.toDos;
        } else if (this.visibility == 'ing') {
          let newTodos = [];
          this.toDos.forEach(function (item) {
            if (!item.completed) {
              newTodos.push(item);
            }
          })
          return newTodos;
        } else if (this.visibility == 'finish') {
          let newTodos = [];
          this.toDos.forEach(function (item) {
            if (item.completed == true) {
              newTodos.push(item);
            }
          })
          return newTodos;
        }
      },
      uncompleted: function () {
        let uncompletedAry = [];
        let vm = this;
        vm.toDos.forEach(function (item) {
          if (!item.completed) {
            uncompletedAry.push(item);
          }
        });
        let uncompletedLength = uncompletedAry.length;
        return `還有 ${uncompletedLength} 筆任務未完成`;

      }
    },
    watch: {
      toDos: {
        handler() {
          let storageName = "list";
          localStorage.setItem(storageName, JSON.stringify(this.toDos));
        },
        deep: true,
      }
    }

  });