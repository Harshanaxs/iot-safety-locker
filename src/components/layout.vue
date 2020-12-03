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
              <v-icon>mdi-log-out</v-icon>
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
        color="red darken-2"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"><v-icon>mdi-menu</v-icon></v-app-bar-nav-icon>
        <v-toolbar-title
          style="width: 300px"
          class="ml-0 pl-4"
        >
          <span class="hidden-sm-and-down">Smart Lockers</span>
        </v-toolbar-title>
        <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
          class="hidden-sm-and-down"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-apps</v-icon>
        </v-btn>

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
export default {
   props: {
    source: String,
  },
   data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: 'mdi-account', text: 'Users', route:'/admin/users' },
      { icon: 'mdi-locker-multiple', text: 'Lockers', route:'/admin/lockers' },
      { icon: 'mdi-face-agent', text: 'Branches', route:'/admin/branches' },
      { icon: 'mdi-shield-lock', text: 'Devices', route:'/admin/devices' },


   
    ],
  }),
    methods:{
             signOut: async function () {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("signOut");

          this.$router.replace({
            name: "Home",
          });
        });
    },
  }
}
</script>