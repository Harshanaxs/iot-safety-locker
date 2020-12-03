<template>
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

      <v-divider></v-divider>

      <v-stepper-step step="3">
        Locker Details
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        >
        <v-card-title>
            <h3>Customer Details</h3>
        </v-card-title>
        <v-card-text>

         <v-col cols="12" sm="6" md="6">
                      <FormulateInput
      type="text"
      name="name"
      label="Name"
v-model="customer.basic.name"     />
                  </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <FormulateInput
      type="text"
      name="nic"
      label="NIC"
v-model="customer.basic.nic"     />
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <FormulateInput
      type="text"
      name="email"
      label="Email"
v-model="customer.basic.email" 
validation="email | required"
    />
                  </v-col>
                   <v-col cols="12" sm="6" md="6">
                      <FormulateInput
      type="number"
      name="price"
      label="Price"
v-model="editedItem.price"     />
                  </v-col>
              
        </v-card-text>
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn @click="back(e1)" text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        >
        <v-card-title>
            <h3>Customer Details</h3>
        </v-card-title>
        <v-card-text>
            
        </v-card-text></v-card>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn @click="back(e1)" text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        >
        <v-card-title>
            <h3>Customer Details</h3>
        </v-card-title>
        <v-card-text>
            
        </v-card-text></v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn @click="back(e1)" text>
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  export default {
      props:[],
    data () {
      return {
        e1: 1,
        customer:{
            basic:{

                name:'',
                dob:'',
                nic:'',
                email:'',
                mobile:'',
                address:''

            },
            account:{
                accountName:'',
                accountNo:'',
                branch:'',
                fingerPrintId:''
            },
            locker:{
                size:'',
                price:'',
                lockerNo:''
            }
        }
      }
    },
    methods:{
        back:function(e1){
            if(e1>1){
                this.e1 = e1 - 1 ;
            }else {
                this.e1 = 1;
            }
        } 
    }
  }
</script>