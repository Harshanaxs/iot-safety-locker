<template>
             <v-card max-width="344px">
                        <v-card-text>
                            <table>
                                    <tr>
                                        <td>Locker ID</td>
                                        <td>15560</td>
                                        <td><v-chip color="success" outlined>Assigned</v-chip></td>
                                    </tr>
                                     <tr>
                                        <td>Owner</td>
                                        <td>S Susantha</td>
                                    </tr> <tr>
                                        <td>Locker Size</td>
                                        <td class="pl-2"><v-chip>Medium</v-chip></td>
                                          <td class="pl-2">Monthly Fee</td>
                                        <td >1200</td>
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
</template>

<script>
export default {
  props:{
    
  }
}
</script>