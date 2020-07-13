<template>
<v-container>
<v-btn color="red" v-if="isSignIn == false" @click="signIn">Google Sign-In</v-btn>
<v-btn color="red" outlined="" v-if="isSignIn == true" @click="signOut">Logout</v-btn>
<h1 class="display-2 font-weight-thin mb-2">
Dessert information request form
</h1>
      <v-row v-if="isSignIn == true" align="center" justify="center">
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
      loading: null,
      isInit: false,
      isSignIn: false
    }
  },
  created () {
    const that = this
    const checkGauthLoad = setInterval(function () {
      that.isInit = that.$gAuth.isInit
      that.isSignIn = that.$gAuth.isAuthorized
      if (that.isInit) clearInterval(checkGauthLoad)
    }, 1000)
  },
  methods: {
    async find () {
      this.loading = true
      try {
        const response = await fetch(`https://desserts-api-4wh4kj2sza-uc.a.run.app/${this.id}`, {
          method: 'GET',
          mode: 'cors',
          headers: { Authorization: 'Bearer ' + this.userJwtToken }

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
    signIn () {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          // on success do something
          // console.log('GoogleUser', GoogleUser)
          // console.log('getId', GoogleUser.getId())
          // console.log('getBasicProfile', GoogleUser.getBasicProfile())
          // console.log('getAuthResponse', GoogleUser.getAuthResponse())
          this.status = GoogleUser.getId()
          this.userJwtToken = GoogleUser.getAuthResponse().id_token
          // console.log(
          //   'getAuthResponse',
          //   this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse()
          // )
          console.log(this.userJwtToken)
          this.isSignIn = this.$gAuth.isAuthorized
        })
        .catch(error => {
          // on fail do something
          console.error(error)
        })
    },

    signOut () {
      this.$gAuth
        .signOut()
        .then(() => {
          // on success do something
          this.isSignIn = this.$gAuth.isAuthorized
          console.log('isSignIn', this.$gAuth.isAuthorized)
        })
        .catch(error => {
          // on fail do something
          console.error(error)
        })
    }

  }
}
</script>
