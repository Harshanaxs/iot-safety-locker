<template>
    <div>
        <layout>
            <div slot="main">
                     <v-row   slot="main" no-gutters>
            <v-col cols="12">
                        <div>
              <v-data-table
    :headers="headers"
    :items="branches"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Branches</v-toolbar-title>
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
            >New Branch</v-btn>
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
      type="text"
      name="location"
      label="Location"
v-model="editedItem.location"     />
                  </v-col>
                        <v-col cols="12" sm="6" md="6">
                      <FormulateInput
      type="text"
      name="address"
      label="Address"
v-model="editedItem.address"     />
                  </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <FormulateInput
      type="text"
      name="phone"
      label="Phone"
v-model="editedItem.phone"     />
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
import {db} from '@/firebase.js';
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
          text: 'Location',
          align: 'start',
          sortable: false,
          value: 'location',
        },
        {
            text:'Address',
            value:'address'
        },
         {
            text:'Phone',
            value:'phone'
        },
      { text: 'Actions', value: 'actions', sortable: false },
      ],
      branches: [],
      editedIndex: -1,
      editedItem: {
        
        location:'',
        address:'',
        phone:'',
        
      },
      defaultItem: {
       location:'',
        address:'',
        phone:'',
        
      },
    }
    },

    computed: {
       

      formTitle () {
        return this.editedIndex === -1 ? 'New Branch' : 'Edit Branch'
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
        this.editedIndex = this.branches.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      fbDelete:function(item){
        db.collection('branches').doc(item).delete();
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
          db.collection('branches').doc(this.branches[this.editedIndex].id).set(Object.assign({value:this.editedItem.location,label:this.editedItem.location},this.editedItem));
        } else {
         db.collection('branches').add(Object.assign({value:this.editedItem.location,label:this.editedItem.location},this.editedItem));
        }
        this.close()
      },
    },
    firestore:{
      branches : db.collection('branches')
    },
  }
</script>