<template>
   <layout>
     <div slot="main">
        <v-container>
        <v-alert
      outlined
      v-bind:type="mtype"
      text
      :value="alert"
    >
    {{message}}
    </v-alert>
    
        <h2>Users</h2>
        <v-dialog
        v-model="dialog"
            width="500px">
             <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
          class="ma-4"
        >
          Add New Admin
        </v-btn>
      </template>
            
            <v-card>
                <v-card-title>
                    Make an Admin
                </v-card-title>
                <v-card-text>
                    <v-select
                    v-model="email"
                    :hint="`${email.email}`"
                    :items="users"
                    item-text="name"
                    item-value="email.email"
                    label="User"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                      <p>{{select.email}}</p>
                    <v-select
                    v-model="select"
                    :hint="`${select.address}`"
                    :items="branches"
                    item-text="label"
                    item-value="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                  {{email}}
                    <v-btn @click.prevent="addAdminRole" @click.stop="dialog = false">Add</v-btn>
                    <v-btn @click.prevent="dialog = false">Close</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
         <v-data-table
                        :headers="headers"
                        :items="users"
                        :items-per-page="5"
                        class="elevation-1"
                    >
                    
                    </v-data-table>
    </v-container>
     </div>
   </layout>
</template>

<script>
import layout from '@/components/layout.vue'
import firebase from 'firebase';
import {db} from '@/firebase.js';
const functions = firebase.functions();
export default {

    components:{
      layout
    },
     data () {
        return {
            dialog:false,
            branches:[],
            mtype:null,
            message:'',
            alert:false,
            email:'',
            select:'',
            headers:[
                {text:'Name', value:'name' },
                 {text:'Branch', value:'branch' },
                {text:'Email', value:'email' },
               
                
            ],
            users:[]
        }
    },
    methods:{
            initData:function(){
            
        db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
        var x = {};  
         x = {
             id:doc.id,
             email:doc.data().email,
             name:doc.data().name,
             branch:doc.data().branch,
           };
            this.users.push(x) ;    
      })

    }).catch(err =>{
        console.log(err);
    });
            db.collection('branches').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  
                    this.branches.push(doc.data()) ;    
              })

            }).catch(err =>{
                console.log(err);
            });
    },
         
         addAdminRole: function(){
           const addAdminRole = functions.httpsCallable('addUserRole');
           addAdminRole({email : this.email.email,
           branch:this.select}).then( result => {
              db.collection("users").doc(this.email.id).update({branch:this.select.value})
               console.log(result);
               if(result.data.message){
                   this.message = result.data.message;
                    this.alert = true ;
                    this.mtype = 'success'
                    var self = this;
                    setTimeout(function(){ self.alert = false; }, 3000);
               }else{
                   var self1 = this;
                   this.message = result.data.errorInfo.message;
                    this.alert = true ;
                    this.mtype = 'warning'
                    
                    setTimeout(function(){ self1.alert = false; }, 3000);

                   
               }
           })
           
        }

    },
    created(){
        this.initData();
    }
}
</script>