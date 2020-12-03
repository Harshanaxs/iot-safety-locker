<template>
  <v-data-table
    :headers="headers"
    :items="clients"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Clients</v-toolbar-title>
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
            >New Client</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
             
                  
                 <stepper/>
                
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
</template>

<script>
import stepper from '@/components/stepper.vue'
import {db} from '@/firebase.js'
  export default {
    components:{
      stepper
    },
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'NIC', value: 'nic' },
        { text: 'Branch', value: 'branch' },
        { text: 'Account No', value: 'accountNo' },
        { text: 'Email', value: 'email' },
        { text: 'Mobile', value: 'mobile' },

        { text: 'Actions', value: 'actions', sortable: false },
      ],
      clients: [],
      editedIndex: -1,
      editedItem: {
        
        name: '',
        nic: '',
        branch: '',
        accountNo: '',
        email: '',
        mobile:''
      },
      defaultItem: {
        name: '',
        nic: '',
        branch: '',
        accountNo: '',
        email: '',
        mobile:''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Client' : 'Edit Client'
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
        this.editedIndex = this.clients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      fbDelete:function(item){
        db.collection('clients').doc(item).delete();
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
          Object.assign(this.clients[this.editedIndex], this.editedItem)
          db.collection('clients').doc(this.clients[this.editedIndex].id).set(this.editedItem);
        } else {
         db.collection('clients').add(this.editedItem);
        }
        this.close()
      },
    },
    firestore:{
      clients : db.collection('clients')
    },
  }
</script>