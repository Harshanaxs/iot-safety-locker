<template>
    <div>
       <v-app>
            <v-container>
            <v-row>
                <v-col>
                    <v-card class="mx-auto" width="400px">
                        <v-card-title>
                            <h3>IoT Based Safety Locker System</h3>
                        </v-card-title>
                        <v-card-text>
                            <v-text-field v-model="lockerId" label="Enter Your Locker ID"></v-text-field>

                        </v-card-text>
                        <v-card-actions>
                            <v-btn  class="ma-2"
      :loading="loading"
      :disabled="loading"
      color="secondary"
      @click="loader = 'loading'">Submit</v-btn>
                        </v-card-actions>
                    </v-card>
                     <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
                </v-col>
            </v-row>
        </v-container>
       </v-app>
    </div>
</template>

<script>
import {rtdb} from '@/firebase.js';
  export default {
    data () {
      return {
        lockerId:'',
        loader: null,
        loading: false,
        msg:false,
         snackbar: false,
      text: 'Please Wait for Fingerprint Validation',
      timeout: 2000,
    

      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        this.loader = null
        this.msg = true
        this.snackbar = true
        setTimeout(this.goRoute, 3000);

      },
    },
    methods:{
        goRoute:function(){
          rtdb.ref('requests/').push({
    fingerprintId: '12',
    lockerId: this.lockerId,
  })
            console.log("God Blessed You");
            this.$router.replace({ name: "verify" });

        }
    }
  }
</script>