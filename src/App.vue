<template>
  <v-app>
    <component :is="layout">
      <router-view/>
    </component>
  </v-app>
</template>

<script>
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components:{
    AuthLayout,
    MainLayout
  },
  computed:{
    layout(){
      return (this.$route.meta.layout || 'auth') + '-layout'
    }
  }
};
</script>
