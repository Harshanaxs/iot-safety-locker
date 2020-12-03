<template>
    <div>
        <layout>
            <div slot="main">
                     <v-row   slot="main" no-gutters>
            <v-col cols="12">
                        <div>
              <v-data-table
    :headers="headers"
    :items="devices"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Devices</v-toolbar-title>
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
            >New Device</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                     <v-col cols="12" sm="6" md="6">
                      <FormulateInput
      type="select"
      name="branch"
      label="Branch"
       :options="branches"
v-model="editedItem.branch"     />
                  </v-col>
                        <v-col cols="12" sm="6" md="6">
                      <FormulateInput
      type="number"
      name="no"
      label="No"
v-model="editedItem.no"     />
                  </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <FormulateInput
      type="text"
      name="deviceId"
      label="Device Id"
v-model="editedItem.deviceId"     />
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <FormulateInput
      type="select"
      name="size"
      label="Size"
       :options="{small:'Small',medium:'Medium',large:'Large'}"
v-model="editedItem.size"     />
                  </v-col>
                   <v-col cols="12" sm="6" md="6">
                      <FormulateInput
      type="number"
      name="price"
      label="Price"
v-model="editedItem.price"     />
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
        @click="deleteItem(item)"
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
import {rtdb,db} from '@/firebase.js';
import layout from '@/components/layout.vue';
  export default {
      components:{
          layout
      },
    data(){
      return{
      dialog: false,
      headers: [
        {
          text: 'Branch',
          align: 'start',
          sortable: false,
          value: 'branch',
        },
        {
            text:'No',
            value:'no'
        },
         {
            text:'Device Id',
            value:'deviceId'
        },
         
      { text: 'Actions', value: 'actions', sortable: false },
      ],
      devices: [],
      branches:[],
      editedIndex: -1,
      editedItem: {
        
     branch:'',
     no:0,
     deviceId:'',
     size:'',
     price:''
        
      },
      defaultItem: {
        branch:'',
        no:0,
        deviceId:'',
        size:'',
        price:''
      },
    }
    },

    computed: {
       

      formTitle () {
        return this.editedIndex === -1 ? 'New Device' : 'Edit Device'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      
   
      initialize () {
       
      },

      editItem (item) {
        this.editedIndex = this.devices.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      fbDelete:function(item){
                  console.log(item);

        rtdb.ref('devices/'+item.no).remove();
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
          rtdb.ref('devices/' + this.editedItem.no).set(this.editedItem);
        } else {
         rtdb.ref('devices/'+this.editedItem.no).set(this.editedItem);
        }
        this.close()
      },
    },firebase:{

      devices : rtdb.ref('devices'),

    },
    firestore:{
      branches:db.collection('branches')
    }
  
  }
</script>