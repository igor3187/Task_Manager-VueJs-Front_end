<template>
  <div class="row">
    <div v-if="task" class="col s6 offset-s3">
      <h1>{{task.title}}</h1>

      <form @submit.p.prevent="submitHandler">
        <div class="chips" ref="chips"></div>

        <div class="input-field">
          <textarea v-model="description" id="description" class="materialize-textarea" data-length="120"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{ description.length }}/2048</span>
        </div>

        <input type="text" ref="datepicker">

        <div v-if="task.status !== 'completed'">
          <button class="btn update" type="submit">Update</button>
          <button class="btn blue" type="submit" @click="completeTask">Complete task</button>
        </div>
      </form>
    </div>
    <div v-else>
      <p>Task not found...</p>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Task',
  data: () => ({
    description: '',
    chips: null,
    date: null,
  }),
  computed: {
    task() {
      console.log(this.$route.params.id);
      return this.$store.getters.taskId(Number(this.$route.params.id))
    }
  },
  mounted() {
    this.description = this.task.description;
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Task tags',
      data: this.task.tags
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mmm.yyyy',
      defaultDate: new Date(this.task.date),
      setDefaultDate: true
    });
  },
  updated() {
    return M.updateTextFields()
  },
  methods: {
    submitHandler() {
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        description: this.description,
        date: this.date.date,
      })
      this.$router.push('/list')
    },
    completeTask() {
      this.$store.dispatch('completeTask', this.task.id )
      this.$router.push('/list')
    }
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy()
    }
    if (this.chips && this.chips.destroy) {
      this.chips.destroy()
    }
  }
}
</script>

<style scoped>
textarea.materialize-textarea {
  min-height: 4rem;
}

.update {
  margin-right: 1rem;
}
</style>