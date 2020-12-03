<template>
  <v-stepper
    v-model="e13"
    vertical
  >
    <v-stepper-step
      step="1"
      complete
    >
      Customer Registration
    </v-stepper-step>

    <v-stepper-content step="1">
       <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="customer.types"
          label="Type"
        ></v-select>
      </v-col>
       <v-col
        cols="12"
        sm="12"
      >
        <v-text-field
          label="Name"
        ></v-text-field>
         <v-select
          :items="customer.branches"
          label="Branch"
        ></v-select>
        <v-text-field
          label="NIC"
        ></v-text-field>
         <v-text-field
          label="DOB"
        ></v-text-field>
      </v-col>
      <v-btn
        color="primary"
        @click="e13 = 2"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      step="2"
      complete
    >
      Fingerprint Registration
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="e13 = 3"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :rules="[() => false]"
      step="3"
    >
Account Setup    </v-stepper-step>

    <v-stepper-content step="3">
      <v-col
        cols="12"
        sm="12"
      >
        <v-text-field
          label="Account Name"
        ></v-text-field>
         <v-select
          :items="customer.branches"
          label="Branch"
        ></v-select>
        <v-text-field
          label="Account Number"
        ></v-text-field>
      </v-col>
      <v-btn
        color="primary"
        @click="e13 = 4"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">
Locker Selection    </v-stepper-step>


    <v-stepper-content step="4">
        <v-select
          :items="customer.size"
          label="Locker Size"
        ></v-select>
        <h3>Locker No : 33</h3>
<h3>Annual Fee Rs 3200/-</h3>
      
      <v-btn
        color="primary"
        @click="e13 = 1"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
  export default {
    data () {
      return {
          customer:{
              types:['Sole','Joint','Group'],
              branches:['Colombo','Wattala','Gampaha'],
              size:['Small','Medium','Large']
          },
        e13: 2,
      }
    },
  }
</script>