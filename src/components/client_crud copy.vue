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
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.branch" label="Branch"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nic" label="NIC"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.accountNo" label="Account No"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                    <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.mobile" label="Mobile"></v-text-field>
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
        @click="editItem(item)"
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
</template>

<script>
  export default {
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
        nic: 0,
        branch: 0,
        accountNo: 0,
        email: 0,
        mobile:0
      },
      defaultItem: {
        name: '',
        nic: 0,
        branch: 0,
        accountNo: 0,
        email: 0,
        mobile:0
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
        this.clients = [
          {
            name: 'Don James',
            accountNo: 159666672,
            branch: 'Kandana',
            nic: '988989774v',
            email:'asd@mail.com',
            mobile:'0718181345',
            
          },

        ]
      },

      editItem (item) {
        this.editedIndex = this.clients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.clients.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.clients.splice(index, 1)
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
        } else {
          this.clients.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>