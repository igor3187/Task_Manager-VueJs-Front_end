import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
       if (new Date(task.date) < new Date()) {
         task.status = 'outdated'
       }
       return task
     })
  },
  getters: {
    tasks: state => state.tasks,
    taskId: state => id => state.tasks.find(task => task.id === id)
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, { id, description, date }) {
      const tasks = state.tasks.concat()

      const taskIndex = tasks.findIndex(task => task.id === id)
      let task = tasks[taskIndex]

      const status = new Date(date) > new Date() ? 'active': 'outdated'

      tasks[taskIndex] = {...task, date, description, status}

      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    completeTask(state, id) {
      const index = state.tasks.findIndex(task => task.id === id)
      state.tasks[index].status = 'completed'
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
    createTask({commit}, task) {
      commit('createTask', task)
    },
    updateTask({commit}, task) {
      commit('updateTask', task)
    },
    completeTask({commit}, id) {
      commit('completeTask', id)
    }
  },
  modules: {
  }
})
