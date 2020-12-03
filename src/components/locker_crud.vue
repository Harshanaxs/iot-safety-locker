<template>
  <v-data-table
    :headers="headers"
    :items="lockers"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lockers</v-toolbar-title>
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
            >New Locker</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                     <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.lockerNo" label="Locker No"></v-text-field>
                  </v-col>
              
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.branch" label="Branch"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.size" label="Size"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.deviceId" label="Device Id"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
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
</template>

<script>
import {db} from '@/firebase.js'
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Locker No',
          align: 'start',
          sortable: false,
          value: 'lockerNo',
        },
        { text: 'Branch', value: 'branch' },
        { text: 'Size', value: 'size' },
        { text: 'Device Id', value: 'deviceId' },
        { text: 'Price', value: 'price' },
        { text: "Owner's NIC", value: 'nic' },

        { text: 'Actions', value: 'actions', sortable: false },
      ],
      lockers: [],
      editedIndex: -1,
      editedItem: {
        
        lockerNo: null,
        branch: '',
        size: '',
        deviceId: '',
        price:0,
        nic:''
      },
      defaultItem: {
         lockerNo: null,
        branch: '',
        size: '',
        deviceId: '',
        price:0,
        nic:''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Locker' : 'Edit Locker'
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
        this.editedIndex = this.lockers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      fbDelete:function(item){
        db.collection('lockers').doc(item).delete();
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
          db.collection('lockers').doc(this.clients[this.editedIndex].id).set(this.editedItem);
        } else {
         db.collection('lockers').add(this.editedItem);
        }
        this.close()
      },
    },
    firestore:{
      lockers : db.collection('lockers')
    },
  }
</script>