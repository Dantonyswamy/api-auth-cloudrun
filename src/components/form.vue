<template>
<v-container fill-height>
<h1 class="display-2 font-weight-thin mb-3">
Dessert information request form
</h1>
      <v-row align="center" justify="center">
<v-col cols="12" md="6">
    <v-form>
<v-text-field
            v-model="id"
            label="Dessert ID"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="name"
            label="Name of the dessert"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="calories"
            label="Calories value"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="rating"
            label="Dessert rating"
            outlined
            required
          ></v-text-field>
           <v-text-field
            v-model="status"
            label="Status"
            outlined
            required
          ></v-text-field>
          </v-form>
<v-btn color="primary" @click="find">Find</v-btn>
</v-col>
      </v-row>

 </v-container>
</template>
<script>
export default {
  data () {
    return {
      id: null,
      name: null,
      calories: null,
      rating: null,
      status: null
    }
  },
  methods: {
    find () {
    //   console.log('Entered Dessert ID is :', this.id)
    //   console.log('Entered Dessert name is :', this.name)
    //   console.log('Entered Calories value is :', this.calories)
    //   console.log('Entered Rating is :', this.rating)
    //   console.log('Entered Status is :', this.status)
      fetch(`https://desserts-api-4wh4kj2sza-uc.a.run.app/${this.id}`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(resObj => {
        const dessert = resObj.body
        console.log('Dessert data from SQL DB :', dessert)
      })
    }
  }
}
</script>
