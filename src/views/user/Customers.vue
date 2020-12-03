<template>
    <div>
        <layout>
            <div slot="main">
                     <v-row   slot="main" no-gutters>
            <v-col cols="12">
                        <div>
              <v-data-table
    :headers="headers"
    :items="customers"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>customers</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
         <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >New Customer</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                    <v-col cols='12'>
                         <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
       Customer Details
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
       Account & Finger Print Details
      </v-stepper-step>


      <v-stepper-step step="3">
        Locker Details
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-12"
          color="grey lighten-4"
        >
        <v-card-title>
            <h3>Customer Details</h3>
        </v-card-title>
        <v-card-text>

<v-col cols="12" sm="12" md="12">
    <FormulateInput
      type="text"
      name="name"
      label="Name"
      v-model="editedItem.name" 
      validation="required"    />
 </v-col>
<v-col cols="12" sm="6" md="6">
    <FormulateInput
      type="text"
      name="nic"
      label="NIC"
      v-model="editedItem.nic" 
      validation="required"    />
 </v-col>
   <v-col cols="12" sm="6" md="6">
    <FormulateInput
      type="text"
      name="dob"
      label="Date Of Birth YYYY-MM-DD"
      v-model="editedItem.dob" 
      validation="required"    />
 </v-col>
  <v-col cols="12" sm="6" md="6">
    <FormulateInput
      type="text"
      name="email"
      label="Email"
      v-model="editedItem.email" 
      validation="required|email"    />
 </v-col>
 <v-col cols="12" sm="6" md="6">
    <FormulateInput
      type="text"
      name="address"
      label="Address"
      v-model="editedItem.address" 
      validation="required"    />
 </v-col>
 <v-col cols="12" sm="6" md="6">
    <FormulateInput
      type="number"
      name="mobile"
      label="Mobile"
      v-model="editedItem.mobile" 
      validation="required"    />
 </v-col>


             
                   
                 
              
        </v-card-text>
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12"
          color="grey lighten-4"
        >
        <v-card-title>
            <h3>Account Details</h3>
        </v-card-title>
        <v-card-text>
            <v-col cols="12" sm="12" md="12">
    <FormulateInput
      type="text"
      name="accountName"
      label="Account Name"
      v-model="editedItem.accountName" 
      validation="required"    />
 </v-col>
<v-col cols="12" sm="6" md="6">
    <FormulateInput
      type="text"
      name="accountNo"
      label="Account No"
      v-model="editedItem.accountNo" 
      validation="required"    />
 </v-col>
   <v-col cols="12" sm="6" md="6">
    <FormulateInput
      type="select"
      :options="branches"
      name="branch"
      label="Branch"
      v-model="editedItem.branch" 
      validation="required"    />
 </v-col>
            
        </v-card-text></v-card>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn @click="back(e1)" text>
          Back
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-4"
        >
        <v-card-title>
            <h3>Locker Details</h3>
        </v-card-title>
        <v-card-text>
          
  <v-col cols="12" sm="6" md="6">
                      <v-select
:items="devices"
v-model="editedItem.lockerId"
label="Locker No"
item-text="deviceId"
item-value="no"
bottom
autocomplete
chips
></v-select>
  </v-col>
   <v-col cols="12" sm="6" md="6">

    <FormulateInput
      type="select"
      name="size"
      label="Slot"
       :options="{24:'24',36:'36',48:'48'}"
v-model="editedItem.fingerprintId"     />
                  </v-col>  

   <v-col cols="12" sm="6" md="6">
   <v-btn @click="setDeviceToEnroll">Set Fingerprint</v-btn>
   </v-col>
      <v-col cols="12" sm="6" md="6">

    <FormulateInput
      type="select"
      name="size"
      label="Size"
       :options="{small:'Small',medium:'Medium',large:'Large'}"
v-model="editedItem.lockerSize"     />
                  </v-col>
 <v-col cols="12" sm="6" md="6">
    <FormulateInput
      type="number"
      name="chargers"
      label="Monthly Fee (Rs)"
      v-model="editedItem.monthlyFee" 
      validation="required"    />
 </v-col>
            
            
        </v-card-text>
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn @click="back(e1)" text>
          Back
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper> 
              
                    </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item   )"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item.id)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
        </div>
            </v-col>
        </v-row>
            </div>
        </layout>
    </div>
</template>

<script>
import {db,rtdb} from '@/firebase.js';
import layout from '@/components/userLayout.vue';
  export default {
      components:{
          layout
      },
    data(){
      return{
       e1: 1,
      dialog: false,
      branches:[],
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
            text:'Email',
            value:'email'
        },
         {
            text:'Branch',
            value:'branch'
        },
         {
            text:'Locker Id',
            value:'lockerId'
        },
      { text: 'Actions', value: 'actions', sortable: false },
      ],
      customers: [],
      devices:[],
      editedIndex: -1,
      editedItem: {
        
       name:'',
       nic:'',
       dob:'',
       email:'',
       address:'',
       mobile:'',
       accountName:'',
       accountNo:'',
       branch:'',
       lockerId:'',
       fingerprintId:'',
       lockerSize:'',
       monthlyFee:''

        
      },
      defaultItem: {
           name:'',
       nic:'',
       dob:'',
       email:'',
       address:'',
       mobile:'',
       accountName:'',
       accountNo:'',
       branch:'',
       lockerId:'',
       fingerprintId:'',
       lockerSize:'',
       monthlyFee:''

        
      },
    }
    },

    computed: {
     lockers(){
const usersByLikes = this.devices.map(item => {
    const container = {};

    container[item.key] = "'"+item.no+"'";

    return container;
})
  return usersByLikes;
},
  formTitle () {
        return this.editedIndex === -1 ? 'New Customer' : 'Edit Customer'
      },
    
     },  

    

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      console.log(this.devices);
      this.initialize()
    },

    methods: {

      setDeviceToEnroll:function(){
        var postData = true;
        var enrollId = parseInt(this.editedItem.fingerprintId) ;
        var updates = {};
  updates['/devices/' + this.editedItem.lockerId+'/mode'] = postData;
  updates['/devices/' + this.editedItem.lockerId+'/enrollID'] = enrollId;
 

  rtdb.ref().update(updates);

      },
             back:function(e1){
            if(e1>1){
                this.e1 = e1 - 1 ;
            }else {
                this.e1 = 1;
            }
        } ,
      
   
      initialize () {
       
      },

      editItem (item) {
        this.editedIndex = this.customers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      fbDelete:function(item){
        db.collection('customers').doc(item).delete();
      },

      deleteItem (item) {
       // const index = this.clients.indexOf(item)
       console.log(item);
        confirm('Are you sure you want to delete this item?') &&  this.fbDelete(item);
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      }, 

      save () {
        if (this.editedIndex > -1) {
          db.collection('customers').doc(this.customers[this.editedIndex].id).set(this.editedItem);
        } else {
         db.collection('customers').add(this.editedItem);
        }
        this.close()
      },
    },
    firestore:{
      customers : db.collection('customers'),
      branches:db.collection('branches')
    },
    firebase:{

      devices : rtdb.ref('devices'),

    },
  }
</script>