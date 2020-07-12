<template>
<v-container>
  <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
<h1 class="display-2 font-weight-thin mb-2">
Dessert information request form
</h1>
      <v-row align="center" justify="center">
<v-col cols="6" md="6">
    <v-form>
<v-text-field
            v-model="id"
            label="Dessert ID"
            outlined
            required
          />
          </v-form>

</v-col>
<v-col cols="6" md="6">
<v-btn color="primary" :loading="loading" @click="find">
 <v-icon left>mdi-file-find</v-icon>
  Find
  </v-btn>
</v-col>
      </v-row>
      <v-btn color="primary" outlined @click="logout">
        <v-icon left>mdi-logout</v-icon>
        Sign-Out
        </v-btn>
<v-divider></v-divider>
<div>
  {{dessertObj}}
</div>
<div v-if="status">
The userID is : {{status}}
</div>
 </v-container>
</template>
<script>
export default {
  data () {
    return {
      id: null,
      dessertObj: null,
      status: null,
      userJwtToken: '',
      loading: null
    }
  },
  methods: {
    async find () {
      this.loading = true
      try {
        const response = await fetch(`https://desserts-api-4wh4kj2sza-uc.a.run.app/${this.id}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response) {
          const respObj = await response.json()
          const dessert = respObj.data
          this.loading = false
          console.log('Dessert data from SQL DB', dessert)
          this.dessertObj = dessert
        }
      } catch (ex) {
        console.log('Exception error :', ex.toString())
      }
    },
    onSignIn (googleUser) {
      var profile = googleUser.getBasicProfile()
      this.status = profile.getId()
      console.log('Profile Info', profile.getId())
      this.userJwtToken = googleUser.getAuthResponse().id_token
      console.log(this.userJwtToken)
    },
    logout () {
      /* eslint-disable */
      gapi.auth2.getAuthInstance().signOut()
      this.userJwtToken = ''
      /* eslint-enable */
    }
  }
}
</script>
