<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Add new project</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a new project</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
          <v-textarea label="Information" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea>

          <v-menu>
            <v-text-field :rules="inputRules" :value="formattedDate" slot="activator" label="Due date" prepend-icon="date_range"></v-text-field>
            <v-date-picker v-model="due"></v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Add project</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import db from '@/fbase' // import the firebase database

export default {
  data() {
    return {
      title: '',
      content: '',
      due: null,
      inputRules: [
        v => v.length >= 3 || 'Minimum length is 3 characters'
      ],
      loading: false,
      dialog: false
    }
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
      this.loading = true;
        const project = {
          title: this.title,
          content: this.content,
          due: format(this.due, 'do MMM YYYY'),
          person: 'Thom',
          status: 'ongoing'
        }
        db.collection('projects').add(project).then(() => {
          this.loading = false;
          this.dialog = false;
          this.$emit('projectAdded');
        }).then(() => {
          this.clearFields();
        })
      } 
    },
    clearFields() {
      this.title = '';
      this.content = '';
      this.due = null;
    }
  },
  computed: {
    formattedDate() {
      return this.due ? format(this.due, 'do MMM YYYY') : '';
    }
  }
}
</script>

