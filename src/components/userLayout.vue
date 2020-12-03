<template>
  <div id="app">
  <v-app id="inspire">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
      >
        <v-list dense>

          <v-list-item>
            <v-list-item-content>
             <p>{{xuser.data.email}}</p> 
             <p>{{xuser.data.branch}}</p>
            </v-list-item-content>
          </v-list-item>
          <template v-for="item in items">
         
            
            <v-list-item
              :key="item.text"
              link router :to="item.route"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
          </template>
                <v-list-item link @click="signOut">
            <v-list-item-action>
              <v-icon>mdi-sign-out</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        
      </v-navigation-drawer>
  
      <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="blue darken-3"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"><v-icon>mdi-menu</v-icon></v-app-bar-nav-icon>
        <v-toolbar-title
          style="width: 300px"
          class="ml-0 pl-4"
        >
          <span class="hidden-sm-and-down">Smart Lockers | User Portal</span>
        </v-toolbar-title>
     
        <v-spacer></v-spacer>
      
      </v-app-bar>
      <v-main>
        <v-container
          class=""
          
        >
          <slot name="main"></slot>
          
        </v-container>
      </v-main>


    </v-app>
  </v-app>
</div>
</template>

<script>
import firebase from 'firebase';
import {mapGetters} from 'vuex';
export default {
   props: {
    source: String,
  },
   data(){
     return {
    dialog: false,
    drawer: null,
    items: [
      { icon: 'mdi-view-dashboard', text: 'Dashboard',route:'/user/dashboard' },
      { icon: 'mdi-account', text: 'Lockers',route:'/user/customers' },
      { icon: 'mdi-shield-lock', text: 'Reports',route:'/user/reports' },


   
    ],
  } 
  },
  computed:{
    ...mapGetters(["user"]),
    xuser:function(){
      return this.user ;
    }
  },
  methods:{
             signOut: async function () {
     await firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("signOut");

          this.$router.replace({
            name: "Login",
          });
        });
    },
  }
}
</script>