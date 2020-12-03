<template>
    <div>
        <userLayout>
           <div slot="main">
                <v-flex row wrap>
                           <v-card class="mx-2" max-width="344px" v-for="(customer,i) in customers" :key="i">
                        <v-card-text>
                            <table>
                                    <tr>
                                        <td>Locker ID</td>
                                        <td>{{customer.lockerId}}</td>
                                        <td><v-chip color="success" outlined>Assigned</v-chip></td>
                                    </tr>
                                     <tr>
                                        <td>Owner</td>
                                        <td>{{customer.accountName}}</td>
                                    </tr> <tr>
                                        <td>Locker Size</td>
                                        <td class="pl-2"><v-chip>{{customer.lockerSize}}</v-chip></td>
                                          <td class="pl-2">Monthly Fee</td>
                                        <td >{{customer.monthlyFee}}</td>
                                    </tr>
                                    <tr>
                                        <td>State</td>
                                        <td class="pl-2"><v-chip color="primary">LOCKED</v-chip></td>
                                    </tr> 
                                    <tr>
                                        <td>Last Checked at</td>
                                        <td colspan="3">{{date}}</td>
                                    </tr>
                            </table>
                        </v-card-text>
                        <v-card-actions>
                             <v-btn
      class="ma-2"
      outlined
      color="indigo"
    >
      Details
    </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <customerDetails></customerDetails>
           </div>
        </userLayout>
    </div>
</template>

<script>
import userLayout from '@/components/userLayout.vue'
import customerDetails from '@/components/customerDetails.vue'
import {db} from '@/firebase.js'
export default {
    components:{
        userLayout,customerDetails
    },
    data(){
        return {
            date:new Date,
            customers:[],
        }
    },
    firestore:{
        customers:db.collection('customers')
    }
    
}
</script>