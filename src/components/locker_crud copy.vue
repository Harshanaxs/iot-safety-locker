<template>
    <div>
               <div slot="main" class="ma-0 pa-0">
                   <v-container>
                       <v-row>
                             <v-btn class="ma-0 pa-0">Add Locker</v-btn>
               
                       </v-row>
                       <v-row>
                    <lockerCard class="ml-2 mt-4" v-for="(locker,i) in lockers" :key="i" :name="locker.name" :status="locker.status" :nic='locker.nic' :lockerNo="locker.lockerNo"></lockerCard>

                       </v-row>
                   </v-container>
                 </div>
    </div>
</template>

<script>
import lockerCard from '@/components/lockerCard.vue';

export default {
    components:{
        lockerCard
    },
    data:() => ({
        lockers:[
            {
            name:'David Johns',
            nic:'977786223v',
            lockerNo:44,
            status:'Assigned',
            lastAccess:'12/05/20'
            }
        ]
    })
}
</script>