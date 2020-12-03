<template>  
       <v-container>
         <v-row >
           <v-col cols="12" >
              <div  >
            <v-card class="ma-auto">
           <v-card-title>
                     <h3>User Enroll Form</h3> 

                    </v-card-title>
                    <v-card-text>
<FormulateForm class="mx-auto"
    @submit="enroll"
  >

    
    <FormulateInput
      type="text"
      name="name"
      label="Name"
      v-model="name"
     validation="required"

    />
     <FormulateInput
      type="email"
      name="email"
      label="Email"
      v-model="email"
        validation="required|email"

    />
     <FormulateInput
      type="password"
      name="password"
      label="Password"
        validation="required"

      v-model="password"
    />
     <FormulateInput
      type="password"
      name="password_confirm"
      label="Confirm Password"
    validation="required|confirm"
      validation-name="Password confirmation"
    />


   
    <FormulateInput
      type="submit"
      label="Save profile"
    />
  </FormulateForm>
                    </v-card-text>
                </v-card>
                   
        </div>
           </v-col>
         </v-row>
       </v-container>
</template>
<script>
import {db,fb} from '@/firebase.js'
export default {
  data(){
    return {
      name:'',
      email:'',
      password:''
    }
  },
  methods:{
    enroll:function(){
                  fb.auth().createUserWithEmailAndPassword(this.email, this.password).then(res => {
                console.log(res.user.uid);
                res.user.updateProfile({
                displayName: this.name,
  });
                db.collection("users").doc(res.user.uid).set({
            name:this.name,
            email:this.email,
            branch:null
      
                }).then(() => {
                              this.$router.replace({ name: "Home" });

                })

            }).catch(function(error) {
  // Handle Errors here.
  
  console.log(error);
  // ...
});
    }
  }
}
</script>