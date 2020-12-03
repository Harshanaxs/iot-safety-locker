<template>
<layout>
    <div slot="main">
      <v-flex row wrap 
                   xs12 md6 
                    class="ml-2 mr-2" >
        <lockerCard 
 v-for="locker in lockers" :key="locker.lockerNo" :lockerNo="locker.lockerNo" :size="locker.size" :nic="locker.nic" :status="locker.size" ></lockerCard>
      </v-flex>
    </div>
  
  </layout>  
</template>

<script>
import layout from '@/components/layout.vue';
import lockerCard from '@/components/lockerCard.vue';
import {db} from '@/firebase.js';

export default {
  components:{
    layout,lockerCard
  },
  data:() => ({
    lockers:[]
  }),
  firestore:{
lockers:db.collection('customers')
  }
}
</script>