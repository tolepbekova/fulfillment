<template>
  <v-app>
    <component :is="layout">
      <router-view/>
    </component>
  </v-app>
</template>

<script>
import AuthLayout from '@/layouts/AuthLayout.vue'
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components:{
    AuthLayout
  },
  computed:{
    layout(){
      return (this.$route.meta.layout || 'auth') + '-layout'
    }
  }
};
</script>
